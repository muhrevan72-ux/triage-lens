// Demo lokal tanpa Jira / tanpa akun: jalankan `npm run demo`.
const { computeTriage } = require('../src/triage.js');

const samples = [
  {
    name: 'PROD-123 — Payment crash',
    issue: {
      summary: 'Payment failed, production down',
      description: 'Checkout crash saat bayar, pelanggan tidak bisa checkout sama sekali.',
      priority: { name: 'Medium' }, status: { name: 'To Do' },
      assignee: null, duedate: null,
      created: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  },
  {
    name: 'DOC-45 — Typo halaman bantuan',
    issue: {
      summary: 'Perbaiki typo di halaman bantuan',
      description: 'Ada typo di paragraf kedua halaman bantuan, perlu diperbaiki.',
      priority: { name: 'Low' }, status: { name: 'To Do' },
      assignee: { displayName: 'Kyuuu' }, duedate: '2026-12-20',
      created: new Date().toISOString(),
    },
  },
  {
    name: 'BUG-78 — Login error, deskripsi kosong',
    issue: {
      summary: 'Bug login error',
      description: '',
      priority: { name: 'Medium' }, status: { name: 'Open' },
      assignee: { displayName: 'Kyuuu' }, duedate: '2026-12-20',
      created: new Date().toISOString(),
    },
  },
];

for (const s of samples) {
  const r = computeTriage(s.issue);
  console.log(`\n=== ${s.name} ===`);
  console.log(`Skor: ${r.score}/100 | Level: ${r.level} | Saran prioritas: ${r.suggestedPriority} (saat ini: ${r.currentPriority})`);
  console.log('Checklist:');
  for (const c of r.checks) console.log(`  ${c.ok ? '✅' : '⚠️'} ${c.label} — ${c.detail}`);
  console.log('Alasan:');
  for (const x of r.reasons) console.log(`  • ${x}`);
  console.log(`Langkah berikutnya: ${r.nextAction}`);
}
console.log('\nDemo selesai. Ini logika yang sama yang dipakai resolver Forge di src/resolvers/index.js.');
