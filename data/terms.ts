export interface TermSection {
  id: string;
  title: string;
  content: string[];
}

export const termsSections: TermSection[] = [
  {
    id: 'pembayaran',
    title: '1. Pembayaran',
    content: [
      'Uang muka (DP) sebesar 50% harus dibayar dulu sebelum pengerjaan dimulai.',
      'Sisa pembayaran 50% dilunasi maksimal 3 hari setelah website selesai dan Anda setujui secara tertulis (melalui WhatsApp/Email).',
      'Uang muka tidak bisa dikembalikan jika Anda membatalkan pesanan.',
    ],
  },
  {
    id: 'bahan-website',
    title: '2. Bahan-Bahan Website',
    content: [
      'Anda wajib memberikan semua bahan yang diperlukan (logo, foto, tulisan/teks, dll) maksimal 3 hari setelah DP dibayar.',
      'Jika bahan tidak lengkap dalam 3 hari, waktu pengerjaan akan tertunda dan estimasi penyelesaian proyek akan disesuaikan.',
      'Jika kami butuh akses ke platform tertentu, akan kami bicarakan dan sepakati bersama dulu.',
      'Semua password atau akses akan dikembalikan ke Anda setelah website selesai.',
    ],
  },
  {
    id: 'akun-google',
    title: '2a. Akun Google untuk Keperluan Teknis',
    content: [
      'Untuk keperluan teknis pengembangan website yang mengintegrasikan alat AI dan platform modern, Anda wajib menyediakan 1 akun Google.',
      'Akun ini sebaiknya akun baru atau akun yang tidak dipakai untuk keperluan pribadi/penting.',
      'Akun akan digunakan selama masa pengerjaan dan akan dikembalikan setelah proyek selesai.',
      'Kami menjamin keamanan dan tidak akan menggunakan akun untuk hal di luar keperluan proyek Anda.',
    ],
  },
  {
    id: 'waktu-pengerjaan',
    title: '3. Waktu Pengerjaan',
    content: [
      'Waktu pengerjaan mulai dihitung setelah DP diterima dan semua bahan sudah lengkap.',
      'Jika sedang ada proyek lain yang dikerjakan, Anda akan masuk daftar tunggu dan kami akan beritahu kapan bisa mulai.',
      'Estimasi waktu pengerjaan akan diberitahu saat konsultasi awal.',
      'Jika ada keterlambatan dari Anda (bahan terlambat, respon revisi lama), waktu pengerjaan akan bertambah.',
    ],
  },
  {
    id: 'revisi',
    title: '4. Revisi & Perbaikan',
    content: [
      'Landing Page Express - Front-end: 2x revisi.',
      'Professional UI/UX Ecosystem - Front-end: 5x revisi.',
      'Advanced AI-Powered UI/UX - Front-end: revisi sepuasnya.',
      'Masukan untuk revisi harus diberikan maksimal 2 hari kerja (48 jam) setelah kami kirim hasil.',
      'Jika tidak ada respon dalam 7 hari, kami anggap Anda sudah setuju dan lanjut ke tahap berikutnya.',
    ],
  },
  {
    id: 'pelunasan',
    title: '5. Pelunasan & Penyerahan',
    content: [
      'Pelunasan harus dilakukan maksimal 3 hari setelah Anda setujui hasil akhir secara tertulis.',
      'Jika tidak ada pelunasan dalam 14 hari setelah website selesai, website akan kami hentikan sementara dan uang muka hangus.',
      'Setelah lunas, Anda mendapat: semua file website, panduan penggunaan, dan akses penuh.',
    ],
  },
  {
    id: 'domain-hosting',
    title: '6. Domain & Hosting',
    content: [
      'Jika Anda ingin alamat website sendiri (seperti namausaha.com), Anda yang sewa sendiri.',
      'Jika tidak, website akan kami pasang di platform gratis dengan alamat seperti: namausaha.vercel.app.',
      'Kami bisa bantu setup domain/hosting dengan biaya tambahan (opsional).',
    ],
  },
  {
    id: 'garansi',
    title: '7. Garansi & Bantuan Setelah Selesai',
    content: [
      'Gratis perbaikan bug/error selama 30 hari setelah website diserahkan (terbatas pada kesalahan kode kami).',
      'Perubahan isi atau desain setelah website selesai akan dikenakan biaya baru.',
    ],
  },
  {
    id: 'kepemilikan',
    title: '8. Kepemilikan Website',
    content: [
      'Setelah lunas, website dan semua file-nya 100% milik Anda.',
      'Kami boleh pakai website Anda sebagai contoh portfolio (dengan izin Anda dulu).',
      'File website tidak boleh dijual kembali sebagai produk template kepada pihak ketiga.',
    ],
  },
  {
    id: 'pembatalan',
    title: '9. Jika Ada Pembatalan',
    content: [
      'Jika Anda membatalkan setelah DP dibayar, uang muka tidak bisa kembali.',
      'Jika kami yang membatalkan, uang muka dikembalikan 100%.',
    ],
  },
  {
    id: 'komunikasi',
    title: '10. Komunikasi',
    content: [
      'Komunikasi utama lewat WhatsApp/Email yang sudah disepakati.',
      'Kami akan balas maksimal 24 jam di hari kerja.',
    ],
  },
  {
    id: 'batasan-pekerjaan',
    title: '11. Batasan Pekerjaan',
    content: [
      'Pekerjaan yang dikerjakan sesuai kesepakatan di awal saja.',
      'Jika ada penambahan fitur atau perubahan besar, akan ada biaya tambahan.',
    ],
  },
  {
    id: 'kerahasiaan',
    title: '12. Kerahasiaan Data',
    content: [
      'Kami akan jaga kerahasiaan data dan informasi bisnis Anda.',
      'Anda juga diharapkan menjaga kerahasiaan harga dan detail teknis yang kita sepakati.',
    ],
  },
  {
    id: 'testing',
    title: '13. Testing & Persetujuan',
    content: [
      'Anda wajib cek dan test website di perangkat Anda sendiri (HP, laptop, tablet).',
      'Setelah Anda setujui final, bug yang ditemukan di luar masa garansi 30 hari akan dikenakan biaya.',
    ],
  },
  {
    id: 'kondisi-darurat',
    title: '14. Kondisi Darurat',
    content: [
      'Jika terjadi hal di luar kendali (bencana alam, wabah, dll), waktu pengerjaan akan disesuaikan.',
    ],
  },
  {
    id: 'hak-ubah',
    title: '15. Hak Ubah S&K',
    content: [
      'Syarat dan ketentuan ini bisa berubah sewaktu-waktu untuk proyek baru.',
    ],
  },
];
