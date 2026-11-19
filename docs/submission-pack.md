# Paket Submission — TriageLens untuk Codegeist 2026

Disusun 19 Nov 2026, diperbarui 19 Nov 2026. Belum dikirim ke Devpost.
Akun GitHub muhrevan72-ux dan Atlassian Muhamad Revan sudah ada, situs
developer https://triage-lens-dev.atlassian.net sudah jadi, app sudah
ter-deploy, ter-install, dan teruji di Jira asli (TT-1 75 Urgent, TT-2 10 Low).
Repo GitHub https://github.com/muhrevan72-ux/triage-lens sudah dibuat tapi
masih kosong — kode lokal belum di-push (butuh token GitHub via HTTPS,
karena SSH dari mesin ini diblokir).
Semua teks Devpost di bawah ini adalah draf — kyuuu yang memutuskan dan mengirim.

## 1. Ringkas

- **Nama:** TriageLens
- **Kategori:** Apps for Software Teams
- **Platform:** Atlassian Forge, modul `jira:issuePanel` (UI Kit / render native)
- **Integrasi:** Jira (baca issue lewat `requestJira`, scope `read:jira-work`)
- **Satu kalimat:** Buka issue Jira, TriageLens langsung memberi skor triage,
  saran prioritas, checklist kelengkapan, dan langkah berikutnya.
- **Biaya masuk:** $0. Aturan resmi: "NO PURCHASE OR PAYMENT NECESSARY TO ENTER OR WIN."
- **Deadline:** Selasa, 22 Des 2026, 12:00 PST = Rabu, 23 Des 2026, 03:00 WIB
- **Link resmi:** https://codegeist2026.devpost.com
- **Aturan resmi:** https://codegeist2026.devpost.com/rules

## 2. Hadiah (tidak dijamin)

Total Codegeist 2026: $120.000, 33 tempat berbayar.
Kategori Apps for Software Teams: juara 1 $15.000, juara 2 $8.000, juara 3 $5.000.
Bonus $1.500 (masing-masing untuk 6 proyek): Best Rovo Agent, Best MCP App,
Best Teamwork Graph, Best Marketplace App. TriageLens saat ini **tidak**
menargetkan bonus — itu sengaja, supaya scope tetap kecil dan selesai.

Hanya pemenang yang dibayar. Ikut serta tidak menjamin apa pun.

## 3. Draf deskripsi Devpost (bahasa Inggris, siap tempel — edit dulu)

> **TriageLens — triage a Jira issue in seconds.**
>
> Every team has the same problem: an issue arrives with no assignee,
> no due date, and a one-line description — and nobody knows whether it
> is urgent or can wait. TriageLens sits inside the Jira issue view and
> answers that question immediately.
>
> Open an issue and TriageLens shows:
> - a triage score (0–100) and level: Urgent / High / Medium / Low,
> - a suggested priority, with the reasons behind the score,
> - a completeness checklist (description, assignee, due date),
> - a concrete next step, e.g. "Assign someone today" instead of a vague warning.
>
> How it works: a Forge resolver fetches the current issue with
> `requestJira` (`/rest/api/3/issue/{key}`), then a transparent,
> rule-based scorer weighs urgent keywords (crash, outage, payment
> failed…), the issue's own priority, age, and completeness. No external
> API key, no external AI service, no data leaves Atlassian — the rules
> are visible in `src/triage.js` and unit-tested locally.
>
> Built with: Atlassian Forge, UI Kit (`@forge/react`), `@forge/api`,
> Node.js 22. Tested with `npm test` (4 tests) and a local demo of
> 3 sample issues.

## 4. Panduan install untuk juri (draf, untuk ditempel di Devpost)

```text
1. Install TriageLens from the installation link on this submission.
2. Open any Jira issue (Jira Software, any project).
3. In the issue view, open the Apps menu and choose TriageLens.
4. The panel shows the triage score, suggested priority, checklist,
   reasons, and next step for that issue. Click "Periksa ulang" / Refresh
   to re-check after editing the issue.
Requirements: Jira Cloud. The app only needs read:jira-work (read-only).
No configuration, no API key, no external service.
```

Catatan: app sudah terdaftar (`forge register`, app id
`ari:cloud:ecosystem::app/43d20348-8a1e-4987-857d-1f68d3ef4243`),
ter-deploy (v2.0.0), dan ter-install di
https://triage-lens-dev.atlassian.net (status COMPLETED).
Installation link untuk juri tetap perlu diambil dari Devpost/Forge
saat submit.

## 5. Naskah video demo (target 2 menit 30 detik, batas 5 menit)

Juri tidak wajib menonton lebih dari 3 menit, jadi semua poin penting
harus ada di 3 menit pertama. Rekam layar Jira + suara, tanpa musik.
**Suara sebaiknya bahasa Inggris** — juri Codegeist internasional dan
submission Devpost berbahasa Inggris. Kalau tidak nyaman, bahasa
Indonesia masih bisa, tapi bahasa Inggris memberi peluang lebih baik.
Bacakan naskah Inggris di bawah ini pelan-pelan; angka skornya sudah
disesuaikan dengan hasil uji di Jira asli 19 Nov 2026 (TT-1 75 Urgent,
TT-2 10 Low — bukan 20 seperti di demo lokal, karena TT-2 tidak punya
assignee dan due date).

| Waktu | Yang ditampilkan | Yang dikatakan (bahasa Inggris) |
|---|---|---|
| 0:00–0:20 | Jira issue "Payment failed, production down", tanpa assignee | "This is an issue that came in with no assignee. The team doesn't know if it's urgent or not." |
| 0:20–1:00 | Buka panel TriageLens, skor 75/100 Urgent | "TriageLens gives it a score of 75, Urgent, suggests Highest priority, and shows why: crash, payment failed, production." |
| 1:00–1:40 | Checklist + langkah berikutnya | "The checklist shows the assignee and due date are still empty, and the next step is clear: assign someone today." |
| 1:40–2:10 | Issue kedua: typo, skor 10/100 Low | "An ordinary issue is not blown up: a complete typo gets a score of 10, Low." |
| 2:10–2:30 | Penutup: Forge + UI Kit, read-only | "Built on Forge with UI Kit, read-only on Jira, no external API key." |

## 6. Checklist submission Devpost (status 19 Nov 2026)

- [x] Aplikasi Forge selesai di lokal (`~/workspace/triage-lens/`)
- [x] `npm test` 4/4 lolos
- [x] `npm run demo` 3 contoh benar (75 Urgent, 20 Low, 40 Medium)
- [x] Frontend JSX + resolver lolos bundling esbuild
- [x] `manifest.yml` valid YAML, modul `jira:issuePanel`, scope `read:jira-work`
- [x] Akun GitHub muhrevan72-ux — sudah masuk
- [x] Akun Atlassian Muhamad Revan + situs developer gratis
- [x] `forge register` — app id `ari:cloud:ecosystem::app/43d20348-8a1e-4987-857d-1f68d3ef4243` sudah di `manifest.yml`
- [x] `forge deploy` + `forge install` di situs developer, uji di Jira asli (TT-1 75 Urgent, TT-2 10 Low)
- [x] `forge lint` — 0 error, 1 warning
- [x] Repo GitHub https://github.com/muhrevan72-ux/triage-lens dibuat (publik, kosong)
- [ ] Push kode lokal ke repo GitHub — **terblokir: SSH diblokir, butuh token GitHub via HTTPS**
- [x] Video demo publik YouTube < 5 menit — https://youtu.be/NRd57uLSxik (diunggah kyuuu 19 Nov 2026, judul "TriageLens — Jira Issue Triage in Seconds (Codegeist 2026 Demo)", publik, terverifikasi bisa dibuka)
- [ ] Daftar di Devpost + submit (link install, deskripsi, video) sebelum 23 Des 2026, 03:00 WIB

## 7. Batasan yang dilaporkan jujur

1. Sudah dijalankan di Jira asli 19 Nov 2026 (TT-1 75 Urgent, TT-2 10 Low,
   panel muncul tanpa error). Yang belum: push kode ke GitHub dan submit Devpost.
2. App id di `manifest.yml` sudah asli
   (`ari:cloud:ecosystem::app/43d20348-8a1e-4987-857d-1f68d3ef4243`).
3. `forge create` interaktif gagal di lingkungan ini (butuh TTY + login);
   scaffold dibuat manual mengikuti struktur template resmi Atlassian
   (Forge Quest / Build and deploy a Forge app).
4. `npm install` memakai `--ignore-scripts` karena Forge CLI gagal build
   native `keytar` di Node 24. Tidak memengaruhi kode aplikasi.
