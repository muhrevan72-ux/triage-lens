# Deploy TriageLens ke Jira — Runbook

Situs: https://triage-lens-dev.atlassian.net (gratis, Cloud Developer Bundle)
Akun Atlassian: Muhamad Revan / muhrevan72@gmail.com
Akun GitHub: muhrevan72-ux

## Status deploy (terverifikasi 19 Nov 2026, ~09:15 WIB)

- **Developer Space: TriageLens** — dibuat 19 Nov 2026, kyuuu adalah admin.
- **App terdaftar:** `triage-lens`, app id
  `ari:cloud:ecosystem::app/43d20348-8a1e-4987-857d-1f68d3ef4243`
  (sudah masuk ke `manifest.yml`, bukan placeholder lagi).
- **Deploy development: BERHASIL.** `forge deploy -e development`,
  versi 2.0.0, eligible untuk Runs on Atlassian.
- **Install: BERHASIL, status COMPLETED.** Terpasang di Jira
  `triage-lens-dev.atlassian.net`, installation id
  `d5638939-14dd-434a-a809-937aa9dfcf1d`.
  Perhatian: percobaan install pertama melaporkan "fetch failed" di CLI,
  padahal di sisi Atlassian installasi sudah berjalan dan selesai.
  Jangan langsung retry buta — cek dulu pesan error retry: kalau muncul
  "already installed ... status COMPLETED", install sudah berhasil.
- **`forge lint`: 0 error, 1 warning** — properti `name` di bawah `app`
  di `manifest.yml` sudah deprecated, boleh dihapus nanti (tidak menghambat).
- **`npm test`: 4/4 lolos.**

## Prasyarat: API token Atlassian

Forge CLI di lingkungan ini tidak bisa login lewat prompt interaktif
(non-TTY gagal). Login memakai email + API token:

1. Buka https://id.atlassian.com/manage-profile/security/api-tokens
2. Create API token, nama "Forge CLI", salin tokennya (hanya tampil sekali).
3. Jangan simpan token di file, chat, atau git. Pakai sekali untuk login,
   lalu hapus dari riwayat terminal.

Catatan penting dari pengalaman 19 Nov 2026:
- Token Atlassian yang baru panjangnya **192 karakter**. Tampilan halaman
  memotongnya (yang terbaca pertama hanya 100 karakter) — token yang
  terpotong ditolak Atlassian dengan 401 / "token no longer valid".
  Selalu salin lewat tombol Copy, atau buat token di HP sendiri supaya
  clipboard-nya milik sendiri (clipboard browser cloud tidak sampai ke HP).
- Token yang dipakai di sini dibuat di HP kyuuu, dites dulu dengan
  `curl .../rest/api/3/myself` (HTTP 200) sebelum dipakai Forge CLI.

## Cara kerja login di lingkungan ini (yang benar-benar jalan)

- `forge login -u ... -t ... --non-interactive` **GAGAL** di sini karena
  CLI tidak bisa menyimpan kredensial di keychain (`libsecret` tidak ada,
  build native `keytar` gagal di Node 24). Pesan errornya:
  "The CLI couldn't securely store your login credentials in a local keychain...
  use environment variables".
- **Solusi: jangan `forge login` sama sekali.** Set env var
  `FORGE_EMAIL` dan `FORGE_API_TOKEN` — semua perintah `forge` (register,
  deploy, install, lint) memakai env var itu langsung.
- `forge login` pertama juga gagal dengan `EPERM: chown .../config.json.tmp`
  di `~/.config/@forge/cli-nodejs/`. **Solusi: `XDG_CONFIG_HOME=/tmp/forge-config`**
  untuk semua perintah `forge`.
- Perintah `forge register` / `forge install` memakai prompt interaktif
  (pilih Developer Space, nama aplikasi, konfirmasi y/N).
  Di non-TTY, jalankan lewat driver PTY Python (`/tmp/forge_interactive.py`)
  yang menjawab prompt saat muncul — jangan kirim semua jawaban di awal
  lewat stdin, karena prompt list (arrow keys) memakan baris pertama.
- `forge register` tanpa `--personal` (sebagai app di Developer Space):
  `--personal` ditolak dengan "Personal apps are not allowed in this
  developer space". Register biasa + pilih space TriageLens yang berhasil.
- `forge install` menanyakan dua konfirmasi: "Do you want to continue?
  (y/N)" lalu peringatan development app ke production site,
  "Are you sure you want to proceed? (y/N)" — jawab `y` di keduanya.

Contoh perintah (token TIDAK ditulis di sini — isi lewat env var):

```bash
cd ~/workspace/triage-lens
export FORGE_EMAIL="muhrevan72@gmail.com"
export FORGE_API_TOKEN="<token-sekali-pakai>"
export XDG_CONFIG_HOME=/tmp/forge-config

FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge deploy -e development

# install: pakai driver PTY, jawab y di dua konfirmasi
python3 /tmp/forge_interactive.py install -e development \
  --site triage-lens-dev.atlassian.net --product jira

FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge lint
```

Setelah selesai, hapus token dari shell:
`unset FORGE_API_TOKEN` — jangan biarkan di riwayat / file.

## Uji di Jira asli

1. Buka https://triage-lens-dev.atlassian.net/jira
2. Buat 1-2 issue contoh (satu darurat, satu biasa — lihat `npm run demo`).
3. Buka issue, buka menu Apps, pilih TriageLens.
4. Periksa skor, saran prioritas, checklist, dan langkah berikutnya.
5. Catat hasil + tangkapan layar untuk video demo.

## Catatan lingkungan

- `npm install` di sini memakai `--ignore-scripts` karena Forge CLI gagal
  build native `keytar` di Node 24. Tidak memengaruhi kode aplikasi.
- `forge create` interaktif gagal di non-TTY; scaffold dibuat manual
  mengikuti template resmi Atlassian (Forge Quest).
- Forge CLI 15.0.0, Node v24.22.1, di
  `~/workspace/codegeist-triage-app/node_modules/.bin/forge`.
