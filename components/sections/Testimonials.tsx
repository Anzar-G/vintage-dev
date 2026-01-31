'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

const AUTO_PLAY_MS = 5000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = testimonials.filter((t) => (t.rating ?? 0) >= 1);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [paused, items.length, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  if (items.length === 0) return null;

  const current = items[index];
  const quote = current.testimonial || (current as { quote?: string }).quote || '';
  const rating = current.rating ?? 5;

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 py-16 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Testimoni Klien
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Beberapa feedback dari klien setelah project selesai.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl"
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-800/50 md:p-10">
          <Quote className="absolute left-6 top-6 h-12 w-12 text-primary-200 dark:text-primary-800" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="flex gap-1 mb-4" aria-label={`Rating: ${rating} dari 5`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-5 w-5',
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200 dark:text-slate-600',
                    )}
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                  {(current.client_name || 'Anonymous').charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-slate-900 dark:text-slate-100">
                    {current.client_name}
                  </cite>
                  {current.company && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {current.company}
                    </p>
                  )}
                  {current.project_type && (
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {current.project_type}
                    </p>
                  )}
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            aria-label="Testimoni sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Pagination testimoni">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'w-8 bg-primary-600' : 'w-2 bg-slate-300 dark:bg-slate-600',
                )}
                aria-label={`Testimoni ${i + 1}`}
                aria-selected={i === index}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            aria-label="Testimoni berikutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
