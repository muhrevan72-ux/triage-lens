const test = require('node:test');
const assert = require('node:assert/strict');
const { computeTriage } = require('../src/triage.js');

test('issue produksi crash tanpa assignee -> Urgent', () => {
  const r = computeTriage({
    summary: 'Payment failed, production down',
    description: 'Checkout crash saat bayar, pelanggan tidak bisa checkout sama sekali.',
    priority: { name: 'Medium' },
    status: { name: 'To Do' },
    assignee: null,
    duedate: null,
    created: new Date(Date.now() - 2 * 86400000).toISOString(),
  });
  assert.equal(r.level, 'Urgent');
  assert.equal(r.suggestedPriority, 'Highest');
  assert.ok(r.score >= 70, `score ${r.score} should be >= 70`);
  assert.equal(r.checks.find((c) => c.label.startsWith('Assignee')).ok, false);
});

test('issue biasa lengkap -> Medium atau Low, bukan Urgent', () => {
  const r = computeTriage({
    summary: 'Perbaiki typo di halaman bantuan',
    description: 'Ada typo di paragraf kedua halaman bantuan, perlu diperbaiki.',
    priority: { name: 'Low' },
    status: { name: 'To Do' },
    assignee: { displayName: 'Kyuuu' },
    duedate: '2026-12-20',
    created: new Date().toISOString(),
  });
  assert.ok(['Low', 'Medium'].includes(r.level), `level was ${r.level}`);
  assert.ok(r.score < 50, `score ${r.score} should be < 50`);
  assert.equal(r.checks.every((c) => c.ok), true);
});

test('deskripsi kosong menurunkan skor dan checklist gagal', () => {
  const r = computeTriage({
    summary: 'Bug login',
    description: '',
    priority: { name: 'Medium' },
    status: { name: 'Open' },
    assignee: { displayName: 'Kyuuu' },
    duedate: '2026-12-20',
    created: new Date().toISOString(),
  });
  assert.equal(r.checks.find((c) => c.label.startsWith('Deskripsi')).ok, false);
  assert.ok(r.reasons.some((x) => x.includes('Deskripsi')));
});

test('skor selalu 0-100', () => {
  const r = computeTriage({ summary: 'x', description: 'crash down outage blocker security data loss' });
  assert.ok(r.score >= 0 && r.score <= 100);
});
