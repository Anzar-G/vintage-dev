export const faqCategories = ['Umum', 'Teknis', 'Harga', 'Timeline'] as const;

export const faqs = [
  {
    id: '1',
    category: 'Umum' as const,
    question: 'Apa saja jenis website yang bisa dikerjakan?',
    answer:
      'Landing page, website company profile, blog, toko online (e-commerce), dashboard/SaaS, dan aplikasi web custom. Tech stack utama: Next.js, TypeScript, Tailwind, Supabase.',
  },
  {
    id: '2',
    category: 'Umum' as const,
    question: 'Apakah ada biaya maintenance setelah launch?',
    answer:
      'Hosting (Vercel) dan domain dibayar sendiri oleh klien. Saya bisa bantu setup. Revisi minor setelah launch tergantung paket (termasuk di Bronze 1x, Silver 2x, Gold 3x + minor unlimited).',
  },
  {
    id: '3',
    category: 'Teknis' as const,
    question: 'Apakah website bisa diintegrasikan dengan Google Analytics?',
    answer:
      'Ya. Paket Silver dan Gold sudah termasuk integrasi Google Analytics 4. Untuk Bronze bisa ditambah dengan biaya tambahan.',
  },
  {
    id: '4',
    category: 'Teknis' as const,
    question: 'Bagaimana dengan SEO?',
    answer:
      'Semua paket mendukung SEO dasar (meta title, description). Silver & Gold termasuk optimasi lebih lanjut; Gold termasuk sitemap, structured data, dan target performa Lighthouse 90+.',
  },
  {
    id: '5',
    category: 'Harga' as const,
    question: 'Apakah harga bisa nego?',
    answer:
      'Harga paket sudah fix. Untuk kebutuhan custom (di luar paket) bisa diskusi dan saya berikan penawaran terpisah.',
  },
  {
    id: '6',
    category: 'Harga' as const,
    question: 'Pembayaran bagaimana?',
    answer:
      'Biasanya 50% di awal (DP) dan 50% setelah project selesai. Bisa diskusi untuk termin lain.',
  },
  {
    id: '7',
    category: 'Timeline' as const,
    question: 'Berapa lama pengerjaan?',
    answer:
      'Bronze 2 hari kerja, Silver 4 hari kerja, Gold 7 hari kerja. Waktu bisa berubah jika scope berubah atau ada antrean project.',
  },
  {
    id: '8',
    category: 'Timeline' as const,
    question: 'Apakah revisi unlimited?',
    answer:
      'Tidak. Bronze 1x revisi minor, Silver 2x revisi major, Gold 3x revisi major + minor unlimited. Spesifikasi revisi dijelaskan di awal agar tidak salah ekspektasi.',
  },
];
