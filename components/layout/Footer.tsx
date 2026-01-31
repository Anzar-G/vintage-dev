'use client';

import Link from 'next/link';
import { Code2, Mail, MessageCircle } from 'lucide-react';
import { CONTACT, whatsappUrl } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-900 py-12 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-slate-100"
              aria-label="Beranda"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary-500 text-white">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                DevPortfolio
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Jasa pembuatan website profesional: landing page, web app, e-commerce.
              Next.js, TypeScript, performa tinggi. Konsultasi gratis.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-primary-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-primary-400"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-primary-400"
                >
                  Form Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#portfolio" className="text-slate-400 hover:text-primary-400">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-400 hover:text-primary-400">
                  Harga
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-slate-400 hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/syarat-ketentuan" className="text-slate-400 hover:text-primary-400">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center text-sm text-slate-500">
          <span>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</span>
          <Link href="/syarat-ketentuan" className="hover:text-primary-400 transition-colors">
            Syarat & Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  );
}
