'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Layanan' },
  { href: '#pricing', label: 'Harga' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#faq', label: 'FAQ' },
];

function handleNavClick() {
  // Close mobile menu on link click (state lives in parent)
  if (typeof window !== 'undefined') {
    document.body.style.overflow = '';
  }
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = () => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };
  const goTo = (href: string) => {
    closeMenu();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-[#0f0f14]/90 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-primary-600 dark:text-primary-400"
            aria-label="Beranda"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white dark:bg-primary-500">
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight md:text-xl">
              DevPortfolio
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button
              size="sm"
              className="hidden min-w-[100px] md:inline-flex"
              onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Konsultasi
            </Button>
            <button
              type="button"
              onClick={openMenu}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden"
              aria-label="Buka menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col gap-6 border-l border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-[#0f0f14] md:hidden"
              role="dialog"
              aria-label="Menu navigasi"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-slate-900 dark:text-slate-100">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  aria-label="Tutup menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className="rounded-lg px-4 py-3 text-left text-base font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-slate-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-300"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <Button
                className="mt-auto w-full"
                onClick={() => {
                  goTo('#contact');
                }}
              >
                Konsultasi
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
