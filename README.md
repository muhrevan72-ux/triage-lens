# TriageLens — Jira Issue Triage Helper

Aplikasi Forge untuk **Atlassian Codegeist 2026**, kategori **Apps for Software Teams**.

Akun GitHub: **muhrevan72-ux**. Repo: https://github.com/muhrevan72-ux/triage-lens (publik, sudah di-push 19 Nov 2026).

Buka sebuah issue Jira, panel TriageLens langsung menunjukkan:
- skor triage 0–100 dan level (Urgent / High / Medium / Low),
- saran prioritas berdasarkan isi issue, bukan tebakan,
- checklist kelengkapan: deskripsi, assignee, due date,
- alasan skornya, dan langkah berikutnya yang konkret.

Logikanya **rule-based, tanpa API key / AI eksternal** — jadi bisa diuji
lokal tanpa akun dan tanpa biaya.

## Status prototipe (19 Nov 2026)

Sudah selesai, diuji lokal:
- ✅ `npm test` — 4 test logika triage
- ✅ `npm run demo` — 3 contoh issue, output skor/checklist/alasan
- ✅ `forge lint` — 0 error, 1 warning
- ✅ Deploy & install ke situs Jira developer (triage-lens-dev.atlassian.net), diuji di Jira asli: TT-1 75/100 Urgent, TT-2 10/100 Low
- ✅ Video demo publik di YouTube: https://youtu.be/NRd57uLSxik (65 detik)
- ⏳ Belum: submission di Devpost

Akun GitHub dan Atlassian sudah dibuat dan dipakai; yang tersisa hanya submission di Devpost.

## Cara kerja

- `manifest.yml` — modul `jira:issuePanel` (render native / UI Kit), scope `read:jira-work`.
- `src/frontend/index.jsx` — UI Kit (`@forge/react`): baca issue saat ini lewat `view.getContext()`, panggil resolver, tampilkan skor + checklist.
- `src/resolvers/index.js` — resolver `getTriage`: ambil issue lewat `requestJira` (`/rest/api/3/issue/{key}`), lalu hitung dengan logika di `src/triage.js`.
- `src/triage.js` — logika murni, tanpa dependensi Forge, jadi bisa di-test dengan Node biasa.

## Uji lokal (tanpa akun)

```bash
cd triage-lens
npm install --ignore-scripts
npm test
npm run demo
```

Catatan: `npm install` di lingkungan ini memakai `--ignore-scripts`
karena Forge CLI gagal build native `keytar` di Node 24. Itu tidak
memengaruhi kode aplikasi.

## Langkah berikutnya

1. ~~Buat akun GitHub~~ — selesai, repo publik di atas.
2. ~~Buat akun Atlassian + situs developer, deploy & install~~ — selesai, app ter-deploy dan terinstall, diuji di Jira asli.
3. ~~Rekam video demo publik di YouTube~~ — selesai: https://youtu.be/NRd57uLSxik
4. Daftar & submit di https://codegeist2026.devpost.com — deadline
   **Selasa, 22 Desember 2026, 12:00 PST = Rabu, 23 Desember 2026, 03:00 WIB**.

## Hadiah (tidak dijamin)

Codegeist 2026 total $120.000, 33 tempat berbayar. Kategori Apps for
Software Teams: juara 1 $15.000, juara 2 $8.000, juara 3 $5.000, plus
bonus $1.500. Hanya pemenang yang dibayar; ikut serta tidak menjamin apa pun.
Aturan resmi: https://codegeist2026.devpost.com/rules
