# Status Akun — TriageLens / Codegeist 2026

Diperbarui 19 Nov 2026, ~09:15 WIB. Versi sebelumnya file ini (08:39 WIB)
sudah kedaluwarsa — jangan pakai versi lama itu.

## Status saat ini (terverifikasi)

- **GitHub: BERHASIL MASUK.** Username **muhrevan72-ux**,
  email muhrevan72@gmail.com. Dasbor menampilkan
  "Welcome to GitHub, muhrevan72-ux!" dan masih kosong (belum ada repo).
  Akun baru dengan username `kyuuu` TIDAK dibuat — `kyuuu` sudah dipakai
  orang lain, dan email ini sudah terhubung ke akun muhrevan72-ux.
- **Atlassian: BERHASIL DIBUAT BARU DAN MASUK.** Nama **Muhamad Revan**,
  email muhrevan72@gmail.com. Tanpa paket berbayar, tanpa kartu kredit.
- **Situs developer: BERHASIL DIBUAT.** https://triage-lens-dev.atlassian.net
  (Cloud Developer Bundle gratis, Jira + Confluence, 19 Nov 2026).
- **Developer Space: TriageLens** — dibuat 19 Nov 2026, kyuuu admin.
- **Forge: TERDAFTAR, TER-DEPLOY, TERINSTALL.** App `triage-lens`,
  app id `ari:cloud:ecosystem::app/43d20348-8a1e-4987-857d-1f68d3ef4243`,
  deploy development versi 2.0.0 berhasil, install di Jira
  triage-lens-dev.atlassian.net status COMPLETED
  (installation id `d5638939-14dd-434a-a809-937aa9dfcf1d`).
  `forge lint`: 0 error, 1 warning (properti `name` deprecated).
  Detail cara deploy di `docs/deploy.md`.
- **Repo TriageLens:** belum dibuat di GitHub. Kode lokal sudah di-commit
  di `~/workspace/triage-lens/` (commit pertama 19 Nov 2026).
  Repo yang direncanakan: `muhrevan72-ux/triage-lens`.

## Langkah berikutnya

1. Uji panel TriageLens di Jira asli (buat issue contoh, buka Apps >
   TriageLens, periksa skor/checklist), tangkap layar untuk video.
2. Buat repo GitHub `muhrevan72-ux/triage-lens` dan push commit lokal.
3. Rekam video demo < 5 menit, daftar & submit di
   https://codegeist2026.devpost.com sebelum **Rabu, 23 Des 2026, 03:00 WIB**.

## Status TriageLens

- `npm test` **4/4 lolos**, `npm run demo` — payment crash **75/100 Urgent**,
  typo **20/100 Low**, login tanpa deskripsi **40/100 Medium**.
- Sudah terinstall di Jira asli (triage-lens-dev.atlassian.net, status
  COMPLETED, 19 Nov 2026) dan **sudah diuji panelnya di issue sungguhan**:
  proyek Triage Test (TT), TT-1 "Payment failed, production down" →
  75/100 Urgent, saran Highest; TT-2 "Fix typo on help page" →
  10/100 Low, saran Low. Panel memuat tanpa error di kedua issue.
- App id di `manifest.yml` sudah id asli, bukan placeholder.
- Hadiah Codegeist (tidak dijamin): total $120.000, 33 tempat berbayar;
  kategori Apps for Software Teams juara 1 $15.000, juara 2 $8.000,
  juara 3 $5.000. Hanya pemenang yang dibayar.
- Aturan resmi: https://codegeist2026.devpost.com/rules
