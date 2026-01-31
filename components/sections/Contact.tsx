'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { contactSchema, type ContactFormInput } from '@/lib/validations';
import { submitInquiry } from '@/app/actions/inquiry';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const BUDGET_OPTIONS = [
  { value: '', label: 'Pilih budget (opsional)' },
  { value: '500k', label: 'Rp 500rb - 1jt' },
  { value: '1jt', label: 'Rp 1jt - 2jt' },
  { value: '2jt', label: 'Rp 2jt - 3jt' },
  { value: '3jt+', label: 'Rp 3jt+' },
];

const PACKAGE_OPTIONS = [
  { value: 'bronze', label: 'Bronze - Rp 500rb' },
  { value: 'silver', label: 'Silver - Rp 1,2jt (Populer)' },
  { value: 'gold', label: 'Gold - Rp 2,5jt' },
  { value: 'custom', label: 'Custom / Konsultasi' },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      package: 'bronze',
      budget_range: '',
      description: '',
      deadline: '',
      privacy_agreed: false,
      terms_agreed: false,
    },
  });

  const selectedPackage = watch('package');

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set('name', data.name);
      formData.set('email', data.email);
      formData.set('whatsapp', data.whatsapp);
      formData.set('package', data.package);
      if (data.budget_range) formData.set('budget_range', data.budget_range);
      formData.set('description', data.description);
      if (data.deadline) formData.set('deadline', data.deadline);
      formData.set('privacy_agreed', data.privacy_agreed ? 'on' : '');

      const result = await submitInquiry(formData);

      if (result.success) {
        toast.success(`Berhasil! No. inquiry: ${result.inquiryNumber}`, {
          description: result.message,
        });
        if (result.whatsappUrl) {
          window.open(result.whatsappUrl, '_blank');
        }
        // Reset form
        setValue('name', '');
        setValue('email', '');
        setValue('whatsapp', '');
        setValue('package', 'bronze');
        setValue('budget_range', '');
        setValue('description', '');
        setValue('deadline', '');
        setValue('privacy_agreed', false);
        setValue('terms_agreed', false);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Terjadi kesalahan. Silakan coba lagi atau hubungi WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Konsultasi Project
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Sebelum memesan, harap baca{' '}
          <Link
            href="/syarat-ketentuan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:decoration-primary-600 dark:text-primary-400"
          >
            Syarat & Ketentuan
          </Link>
          . Isi form berikut atau hubungi WhatsApp. Biasanya dibalas dalam 1x24 jam.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-800/50 md:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Min. 3 karakter"
                {...register('name')}
                className={cn(
                  'block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                  errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                {...register('email')}
                className={cn(
                  'block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                  errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                )}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              No. WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              placeholder="08xxx atau 628xxx"
              {...register('whatsapp')}
              className={cn(
                'block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                errors.whatsapp && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              )}
              aria-invalid={!!errors.whatsapp}
            />
            {errors.whatsapp && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="package" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Pilihan Paket <span className="text-red-500">*</span>
            </label>
            <select
              id="package"
              data-package-select
              {...register('package')}
              className={cn(
                'block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                errors.package && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              )}
              aria-invalid={!!errors.package}
            >
              <option value="">Pilih paket</option>
              {PACKAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.package && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.package.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="budget_range" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Budget (opsional)
            </label>
            <select
              id="budget_range"
              {...register('budget_range')}
              className="block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Deskripsi Project <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Min. 20 karakter. Jelaskan kebutuhan website Anda..."
              {...register('description')}
              className={cn(
                'block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
                errors.description && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              )}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="deadline" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Deadline (opsional)
            </label>
            <input
              id="deadline"
              type="date"
              {...register('deadline')}
              className="block w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                id="terms_agreed"
                type="checkbox"
                {...register('terms_agreed')}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800"
                aria-invalid={!!errors.terms_agreed}
              />
              <label htmlFor="terms_agreed" className="text-sm text-slate-600 dark:text-slate-400">
                Saya telah membaca dan menyetujui{' '}
                <Link
                  href="/syarat-ketentuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:decoration-primary-600 dark:text-primary-400"
                >
                  Syarat & Ketentuan
                </Link>
                . <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.terms_agreed && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.terms_agreed.message}
              </p>
            )}
            <div className="flex items-start gap-3">
              <input
                id="privacy_agreed"
                type="checkbox"
                {...register('privacy_agreed')}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800"
                aria-invalid={!!errors.privacy_agreed}
              />
              <label htmlFor="privacy_agreed" className="text-sm text-slate-600 dark:text-slate-400">
                Saya setuju data dikirim untuk keperluan penawaran dan komunikasi project.{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.privacy_agreed && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.privacy_agreed.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" aria-hidden />
                Kirim & Lanjut WhatsApp
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
