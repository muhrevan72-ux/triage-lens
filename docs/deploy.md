# Deploy TriageLens ke Jira — Runbook

Situs: https://triage-lens-dev.atlassian.net (gratis, Cloud Developer Bundle)
Akun Atlassian: Muhamad Revan / muhrevan72@gmail.com
Akun GitHub: muhrevan72-ux

## Prasyarat: API token Atlassian

Forge CLI di lingkungan ini tidak bisa login lewat prompt interaktif
(non-TTY gagal). Login memakai email + API token:

1. Buka https://id.atlassian.com/manage-profile/security/api-tokens
2. Create API token, nama "Forge CLI", salin tokennya (hanya tampil sekali).
3. Jangan simpan token di file, chat, atau git. Pakai sekali untuk login,
   lalu hapus dari riwayat terminal.

## Login + register + deploy (sekali token tersedia)

```bash
cd ~/workspace/triage-lens

# Forge CLI sudah terinstal di ~/workspace/codegeist-triage-app/node_modules/.bin/forge
export FORGE_EMAIL="muhrevan72@gmail.com"
export FORGE_API_TOKEN="<token-sekali-pakai>"
FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge login \
  -u "$FORGE_EMAIL" -t "$FORGE_API_TOKEN" --non-interactive

# register: ganti app id placeholder di manifest.yml dengan id baru
FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge register

# deploy ke development
FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge deploy -e development

# install ke situs developer
FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge install \
  -e development --site triage-lens-dev.atlassian.net --product jira

# cek lint (butuh login, jadi baru bisa setelah langkah di atas)
FORGE_DISABLE_ANALYTICS=true \
  ../codegeist-triage-app/node_modules/.bin/forge lint
```

Setelah login selesai, hapus token dari shell:
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
- `forge lint` menolak tanpa login (CLI 15).
