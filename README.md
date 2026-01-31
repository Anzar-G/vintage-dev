# Portfolio & Jasa Web Development

Landing page portfolio + layanan web development dengan Next.js 14 (App Router), TypeScript, TailwindCSS, Supabase, dan Vercel.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion, React Hook Form, Zod, Lucide React
- **Backend:** Supabase (PostgreSQL, Auth, Storage), Next.js Server Actions
- **Deploy:** Vercel

## Fitur Utama

- **Portfolio:** Filter kategori, search, lightbox dengan carousel screenshot, tech stack tags, link live demo & GitHub
- **Pricing:** Tabel perbandingan Bronze/Silver/Gold (IDR), toggle Table/Cards, tooltip fitur, badge "Paling Populer" di Silver
- **Form Kontak:** Validasi (react-hook-form + zod), Server Action, rate limit (3/jam per IP), submit ke Supabase, toast + redirect WhatsApp
- **Testimoni:** Carousel auto-play, rating bintang, pause on hover, keyboard & dots
- **FAQ:** Accordion dengan search & filter kategori
- **SEO:** Metadata, JSON-LD (Person, Service, Offer, Review, FAQPage), sitemap.xml, robots.txt
- **UX:** Dark mode (toggle + persist), scroll progress bar, back to top, animasi Framer Motion

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` ke `.env.local`, lalu isi nilai aslinya:

```bash
cp .env.example .env.local
```

Contoh isi `.env.local`:

```env
# Supabase (wajib untuk form kontak)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Kontak (default sudah 082221025449 & muhammadniyar282@gmail.com di kode)
NEXT_PUBLIC_WHATSAPP_NUMBER=6282221025449
NEXT_PUBLIC_CONTACT_EMAIL=muhammadniyar282@gmail.com

# Setelah deploy, ganti dengan URL production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 3. Database (Supabase)

Jalankan schema di Supabase SQL Editor:

```bash
# File: supabase/schema.sql
# Berisi: inquiries, portfolio_projects, testimonials + RLS
```

Copy isi `supabase/schema.sql` lalu jalankan di Supabase Dashboard → SQL Editor.

### 4. Jalankan development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### 5. Build & deploy (Vercel)

```bash
npm run build
```

Deploy ke Vercel: connect repo GitHub, set environment variables di Vercel, deploy.

## Struktur Penting

- `app/` – Layout, page, actions (inquiry), sitemap, robots
- `components/sections/` – Hero, Services, Portfolio, Pricing, Testimonials, Contact, FAQ
- `components/layout/` – Header (nav + dark toggle), Footer
- `components/providers/` – ThemeProvider (dark mode)
- `components/seo/` – JsonLd (structured data)
- `data/` – projects, pricing, testimonials, faq (bisa diganti fetch dari Supabase)
- `lib/` – supabase client, validations (zod), utils
- `supabase/schema.sql` – DDL + RLS untuk inquiries, portfolio_projects, testimonials

## Konten

- **Portfolio:** Edit `data/projects.ts` atau ambil dari Supabase `portfolio_projects` (status = 'published').
- **Harga:** Edit `data/pricing.ts`.
- **Testimoni:** Edit `data/testimonials.ts` atau dari Supabase `testimonials` (status = 'approved').
- **FAQ:** Edit `data/faq.ts`.

## Fonts (opsional)

Untuk load font dari Google (perlu network saat build), di `app/layout.tsx` bisa pakai:

```ts
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' });
```

Lalu di `<html>`: `className={`${inter.variable} ${plusJakarta.variable}`}` dan di `tailwind.config.ts` fontFamily pakai `var(--font-inter)` / `var(--font-plus-jakarta)`.

Tanpa itu, halaman memakai fallback Inter / Plus Jakarta Sans dari system.

---

## Checklist: Menyempurnakan Web Sebelum Launch

Lakukan langkah berikut agar website siap dipakai dan pemesanan masuk ke kamu:

### Wajib

1. **Supabase**
   - Buat project di [supabase.com](https://supabase.com).
   - Di SQL Editor, jalankan isi file `supabase/schema.sql` (tabel `inquiries`, `portfolio_projects`, `testimonials` + RLS).
   - Ambil **Project URL** dan **anon public key** dari Settings → API.
   - Isi di `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

2. **Kontak**
   - Nomor WhatsApp **082221025449** dan email **muhammadniyar282@gmail.com** sudah dipakai sebagai default di kode (Footer, redirect setelah submit form).
   - Kalau mau pakai nomor/email lain, set `NEXT_PUBLIC_WHATSAPP_NUMBER` dan `NEXT_PUBLIC_CONTACT_EMAIL` di `.env.local`.

3. **Deploy ke Vercel**
   - Push repo ke GitHub, connect ke Vercel, deploy.
   - Di Vercel → Settings → Environment Variables, tambahkan semua variabel dari `.env.local` (termasuk `NEXT_PUBLIC_SUPABASE_*`).
   - Set `NEXT_PUBLIC_SITE_URL` ke URL production (misal `https://your-site.vercel.app`).

4. **Tes form pemesanan**
   - Isi form di section Kontak, centang S&K + privasi, submit.
   - Cek: (1) toast sukses + redirect ke WhatsApp ke nomor kamu, (2) di Supabase → Table Editor → `inquiries` ada baris baru.

### Opsional (lebih sempurna)

5. **Konten**
   - Ganti project di `data/projects.ts` dengan project asli kamu (judul, deskripsi, screenshot, link live/GitHub).
   - Ganti testimoni di `data/testimonials.ts` dengan klien nyata (nama, perusahaan, rating, quote).
   - Sesuaikan FAQ di `data/faq.ts` jika ada kebijakan lain.

6. **Domain sendiri**
   - Di Vercel tambah custom domain (misal `namausaha.com`), ikuti instruksi DNS.
   - Update `NEXT_PUBLIC_SITE_URL` ke domain tersebut.

7. **Google Analytics**
   - Buat property GA4, dapatkan Measurement ID.
   - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` di env, lalu tambah script GA4 di `app/layout.tsx` (bisa cari contoh "Next.js 14 GA4").

8. **Email konfirmasi (Resend/SendGrid)**
   - Saat ini tidak ada email otomatis setelah submit. Kalau mau: daftar Resend/SendGrid, set `RESEND_API_KEY`, lalu tambah logic di `app/actions/inquiry.ts` untuk kirim email ke pemesan + notif ke kamu.

9. **reCAPTCHA**
   - Untuk kurangi spam: daftar reCAPTCHA v3, set `RECAPTCHA_SECRET_KEY` dan site key di front-end, validasi token di server action.

Setelah poin 1–4 selesai, website sudah bisa dipakai: pemesan isi form → data masuk Supabase → mereka diarahkan ke WhatsApp kamu (082221025449).
