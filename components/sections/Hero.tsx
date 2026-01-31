'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <motion.div
          className="flex flex-1 flex-col gap-6 text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#121317] dark:text-white md:text-6xl">
              Full-Stack <span className="text-primary-600 dark:text-primary-400">Web Developer</span> Building Scalable Digital Experiences
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Helping brands and businesses build modern, high-performance web applications with clean code and exceptional
              UI/UX. Specialized in React, Next, and cloud architecture.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
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
          className="relative aspect-square w-full overflow-hidden rounded-xl shadow-2xl ring-4 ring-white dark:ring-gray-800 md:w-[45%]"
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
    </section>
  );
}
