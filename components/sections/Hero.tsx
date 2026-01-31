'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <motion.div
          className="flex w-full flex-1 flex-col gap-6 text-left md:w-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white sm:text-4xl md:text-6xl">
              Full-Stack <span className="text-primary-600 dark:text-primary-400">Web Developer</span> Building Scalable Digital Experiences
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Helping brands and businesses build modern, high-performance web applications with clean code and exceptional
              UI/UX. Specialized in React, Next, and cloud architecture.
            </p>
          </div>
          {/* Mobile: full-width CTA stack; Desktop: inline */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Hire Me
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                const portfolio = document.getElementById('portfolio');
                portfolio?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Work
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative aspect-square w-full overflow-hidden rounded-xl shadow-2xl ring-2 ring-slate-200 dark:ring-slate-700 md:w-[45%] md:ring-4 md:ring-white dark:md:ring-gray-800"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Image
            src="/images/hero-dev.jpg"
            alt="Professional headshot of a smiling web developer"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
        </motion.div>
      </div>
      {/* Scroll indicator (mobile & desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex justify-center md:mt-12"
        aria-hidden
      >
        <button
          type="button"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
          aria-label="Scroll ke bawah"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
