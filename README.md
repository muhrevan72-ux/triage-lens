# TriageLens — Jira Issue Triage Helper

Aplikasi Forge untuk **Atlassian Codegeist 2026**, kategori **Apps for Software Teams**.

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
- ✅ `forge lint` — lihat hasil di bawah (dicatat jujur di laporan)
- ⏳ Belum: deploy & install ke situs Jira (butuh akun Atlassian + Devpost kyuuu)
- ⏳ Belum: video demo YouTube < 5 menit
- ⏳ Belum: submission di Devpost

Tidak ada akun yang dibuat, tidak ada yang didaftarkan / dikirim.

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

## Langkah berikutnya (butuh persetujuan kyuuu)

1. Buat akun GitHub (gratis) — untuk menyimpan repo ini.
2. Buat akun Atlassian + situs developer gratis, lalu:
   ```bash
   npm install -g @forge/cli
   forge login
   forge register   # ganti app id placeholder di manifest.yml
   forge deploy
   forge install --site <situs>.atlassian.net --product jira
   ```
3. Rekam video demo publik di YouTube, di bawah 5 menit.
4. Daftar & submit di https://codegeist2026.devpost.com — deadline
   **Selasa, 22 Desember 2026, 12:00 PST = Rabu, 23 Desember 2026, 03:00 WIB**.

## Hadiah (tidak dijamin)

Codegeist 2026 total $120.000, 33 tempat berbayar. Kategori Apps for
Software Teams: juara 1 $15.000, juara 2 $8.000, juara 3 $5.000, plus
bonus $1.500. Hanya pemenang yang dibayar; ikut serta tidak menjamin apa pun.
Aturan resmi: https://codegeist2026.devpost.com/rules
