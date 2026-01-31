import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';
import { termsSections } from '@/data/terms';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Syarat & Ketentuan',
  description:
    'Syarat dan ketentuan pemesanan jasa pembuatan website. Wajib dibaca sebelum memesan.',
};

export default function SyaratKetentuanPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          {/* Back + title */}
          <Link
            href="/#contact"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ChevronLeft className="h-4 w-4" />
            Kembali ke form pemesanan
          </Link>

          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                <FileText className="h-6 w-6" />
              </span>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
                Syarat & Ketentuan
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Harap baca dengan saksama sebelum memesan. Dengan mengisi form pemesanan, Anda dianggap telah membaca dan menyetujui syarat dan ketentuan berikut.
            </p>
          </header>

          {/* Table of contents */}
          <nav
            className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50"
            aria-label="Daftar isi"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Daftar isi
            </h2>
            <ol className="space-y-2 text-sm">
              {termsSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-primary-600 underline decoration-primary-600/30 underline-offset-2 transition-colors hover:decoration-primary-600 dark:text-primary-400 dark:decoration-primary-400/30 dark:hover:decoration-primary-400"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-10">
            {termsSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-b border-slate-100 pb-10 last:border-b-0 dark:border-slate-700/50"
              >
                <h2 className="mb-4 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {section.title}
                </h2>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  {section.content.map((paragraph, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
                      <span className="leading-relaxed">{paragraph}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-900/20">
            <p className="mb-4 font-medium text-slate-900 dark:text-slate-100">
              Sudah baca dan setuju?
            </p>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Centang persetujuan Syarat & Ketentuan di form pemesanan, lalu isi data Anda untuk memulai.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Isi form pemesanan
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
