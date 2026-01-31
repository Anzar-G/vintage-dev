'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { faqs, faqCategories } from '@/data/faq';
import { cn } from '@/lib/utils';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = faqs.filter((faq) => {
    const matchSearch =
      !search.trim() ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || faq.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section id="faq" className="scroll-mt-20 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
          FAQ
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Pertanyaan yang sering diajukan. Tidak ketemu? Langsung tanya via form atau WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              aria-label="Cari FAQ"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Kategori FAQ"
          >
            <option value="all">Semua kategori</option>
            {faqCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center text-slate-500"
              >
                Tidak ada pertanyaan yang cocok.
              </motion.p>
            ) : (
              filtered.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={false}
                    className={cn(
                      'border-b border-slate-100 last:border-b-0 dark:border-slate-700/50',
                      isOpen && 'bg-primary-50/50 dark:bg-primary-900/10',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800/50"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      id={`faq-question-${faq.id}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-slate-500 transition-transform',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-question-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600 dark:border-slate-700/50 dark:text-slate-400">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
