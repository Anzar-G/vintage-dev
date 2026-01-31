/**
 * Kontak & konfigurasi default.
 * Untuk production, set via .env.local (NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_CONTACT_EMAIL).
 */

export const CONTACT = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282221025449',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'muhammadniyar282@gmail.com',
} as const;

/** Nomor WhatsApp format internasional (tanpa +) untuk wa.me */
export function whatsappUrl(path = '') {
  const num = CONTACT.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${num}${path ? `?text=${encodeURIComponent(path)}` : ''}`;
}
