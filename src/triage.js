// TriageLens — pure triage logic, no Forge dependencies.
// This file is intentionally dependency-free so it can be unit-tested
// with plain Node (`npm test`) without an Atlassian account or Jira site.
//
// Input: a simplified Jira issue.
// Output: score 0-100, level, suggested priority, checks, reasons, next action.

const URGENT_KEYWORDS = [
  'crash', 'down', 'outage', 'blocker', 'blocked',
  'security', 'data loss', 'payment failed', 'production',
  'urgent', 'critical', 'cannot login', "can't login",
];

const BUG_KEYWORDS = [
  'bug', 'error', 'fail', 'failed', 'broken', 'slow',
  'timeout', 'incorrect', 'missing',
];

function textOf(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  // Jira ADF (Atlassian Document Format) description: walk text nodes.
  if (Array.isArray(value.content)) {
    return value.content.map(textOf).join(' ');
  }
  if (typeof value.text === 'string') return value.text;
  return '';
}

function containsKeyword(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.filter((k) => lower.includes(k));
}

function computeTriage(issue) {
  const input = issue || {};
  const summary = String(input.summary || '');
  const description = textOf(input.description);
  const combined = `${summary} ${description}`;
  const priorityName = String((input.priority && input.priority.name) || input.priority || '');
  const statusName = String((input.status && input.status.name) || input.status || '');
  const assignee = (input.assignee && (input.assignee.displayName || input.assignee.name)) || input.assignee || null;
  const dueDate = input.duedate || input.dueDate || null;
  const created = input.created ? new Date(input.created) : null;

  let score = 30;
  const reasons = [];
  const checks = [];

  const urgentHits = containsKeyword(combined, URGENT_KEYWORDS);
  if (urgentHits.length > 0) {
    score += 55;
    reasons.push(`Kata darurat terdeteksi: ${[...new Set(urgentHits)].join(', ')} (+55)`);
  } else {
    const bugHits = containsKeyword(combined, BUG_KEYWORDS);
    if (bugHits.length > 0) {
      score += 15;
      reasons.push(`Kata bug/error terdeteksi: ${[...new Set(bugHits)].join(', ')} (+15)`);
    }
  }

  if (priorityName === 'Highest' || priorityName === 'High') {
    score += 15;
    reasons.push(`Prioritas Jira sudah ${priorityName} (+15)`);
  } else if (priorityName === 'Low' || priorityName === 'Lowest') {
    score -= 10;
    reasons.push(`Prioritas Jira masih ${priorityName} (-10)`);
  }

  // Completeness checks — these are the triage value, not just a score.
  const hasDescription = description.trim().length >= 20;
  checks.push({
    label: 'Deskripsi terisi (min. 20 karakter)',
    ok: hasDescription,
    detail: hasDescription ? `${description.trim().length} karakter` : 'Deskripsi kosong / terlalu singkat',
  });
  if (!hasDescription) {
    score -= 5;
    reasons.push('Deskripsi kosong atau terlalu singkat (-5)');
  }

  const hasAssignee = Boolean(assignee);
  checks.push({
    label: 'Assignee sudah ditentukan',
    ok: hasAssignee,
    detail: hasAssignee ? String(assignee) : 'Belum ada assignee',
  });
  if (!hasAssignee) {
    score -= 5;
    reasons.push('Belum ada assignee (-5)');
  }

  const hasDueDate = Boolean(dueDate);
  checks.push({
    label: 'Due date sudah ditentukan',
    ok: hasDueDate,
    detail: hasDueDate ? String(dueDate) : 'Belum ada due date',
  });
  if (!hasDueDate) {
    score -= 5;
    reasons.push('Belum ada due date (-5)');
  }

  if (created && !Number.isNaN(created.getTime())) {
    const ageDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 7 && /to do|open|backlog/i.test(statusName)) {
      score += 5;
      reasons.push(`Issue sudah ${Math.floor(ageDays)} hari dan masih ${statusName || 'terbuka'} (+5)`);
    }
  }

  score = Math.max(0, Math.min(100, score));

  let level;
  let suggestedPriority;
  let nextAction;
  if (score >= 70) {
    level = 'Urgent';
    suggestedPriority = 'Highest';
    nextAction = 'Segera tugaskan ke seseorang hari ini, dan beri update ke reporter.';
  } else if (score >= 50) {
    level = 'High';
    suggestedPriority = 'High';
    nextAction = 'Tugaskan assignee dan lengkapi deskripsi / langkah reproduksi.';
  } else if (score >= 30) {
    level = 'Medium';
    suggestedPriority = 'Medium';
    nextAction = 'Lengkapi deskripsi dan due date, lalu masukkan ke sprint berikutnya.';
  } else {
    level = 'Low';
    suggestedPriority = 'Low';
    nextAction = 'Bisa dijadwalkan nanti; pastikan deskripsi cukup jelas saat dikerjakan.';
  }

  if (!hasAssignee) nextAction = 'Pertama: tentukan assignee. ' + nextAction;

  return {
    score,
    level,
    suggestedPriority,
    currentPriority: priorityName || '—',
    status: statusName || '—',
    assignee: assignee ? String(assignee) : null,
    dueDate: dueDate ? String(dueDate) : null,
    checks,
    reasons: reasons.length ? reasons : ['Tidak ada sinyal darurat; skor dari kelengkapan issue.'],
    nextAction,
  };
}

module.exports = { computeTriage };
