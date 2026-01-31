import { z } from 'zod';

const whatsappRegex = /^(08|\+628|628)[0-9]{8,11}$/;

export const contactSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  whatsapp: z
    .string()
    .min(10, 'Nomor WhatsApp tidak valid')
    .regex(whatsappRegex, 'Format: 08xxx atau 628xxx'),
  package: z.enum(['bronze', 'silver', 'gold', 'custom'], {
    required_error: 'Pilih paket',
  }),
  budget_range: z.string().optional(),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
  deadline: z.string().optional(),
  // Checkbox bisa kirim true, "on", atau nilai lain; normalisasi dulu baru cek harus true
  privacy_agreed: z.preprocess(
    (v) => (v === true || v === 'on' || v === 1 ? true : v),
    z.literal(true, {
      errorMap: () => ({ message: 'Anda harus menyetujui kebijakan privasi' }),
    }),
  ),
  terms_agreed: z.preprocess(
    (v) => (v === true || v === 'on' || v === 1 ? true : v),
    z.literal(true, {
      errorMap: () => ({ message: 'Anda harus membaca dan menyetujui Syarat & Ketentuan' }),
    }),
  ),
});

export type ContactSchema = z.infer<typeof contactSchema>;

/** Form state can have privacy_agreed/terms_agreed false until user checks; schema requires true on submit */
export type ContactFormInput = Omit<ContactSchema, 'privacy_agreed' | 'terms_agreed'> & {
  privacy_agreed: boolean;
  terms_agreed: boolean;
};
