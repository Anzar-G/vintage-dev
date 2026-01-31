'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, LayoutGrid, List } from 'lucide-react';
import { pricingPlans, pricingTableRows } from '@/data/pricing';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

function formatPrice(price: number) {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(0)}jt`;
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)}rb`;
  }
  return price.toString();
}

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center gap-1">
      {children}
      <span
        className="cursor-help text-slate-400"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-describedby={show ? 'tooltip-desc' : undefined}
      >
        <HelpCircle className="h-4 w-4" aria-hidden />
      </span>
      {show && (
        <span
          id="tooltip-desc"
          role="tooltip"
          className="absolute left-0 top-full z-10 mt-1 max-w-xs rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg dark:bg-slate-700"
        >
          {text}
        </span>
      )}
    </span>
  );
}

export function Pricing() {
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const scrollToContact = (packageId: string) => {
    const contact = document.getElementById('contact');
    contact?.scrollIntoView({ behavior: 'smooth' });
    // Set package select after scroll so form is visible with pre-selected package
    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>('[data-package-select]');
      if (select) select.value = packageId;
    }, 400);
  };

  return (
    <section id="pricing" className="scroll-mt-20 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Harga Paket
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            Pilih paket sesuai kebutuhan. Silver paling populer untuk bisnis yang ingin tampil profesional.
          </p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={() => setView('cards')}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              view === 'cards'
                ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
            )}
            aria-pressed={view === 'cards'}
            aria-label="Tampilan kartu"
          >
            <LayoutGrid className="inline h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView('table')}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              view === 'table'
                ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
            )}
            aria-pressed={view === 'table'}
            aria-label="Tampilan tabel"
          >
            <List className="inline h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {view === 'cards' && (
        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-strong dark:bg-slate-800/50 dark:border-slate-700',
                plan.highlight &&
                  'border-primary-500 ring-2 ring-primary-500/20 md:-translate-y-2 md:shadow-strong',
              )}
            >
              {plan.badge && (
                <span
                  className={cn(
                    'absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold',
                    plan.badge === 'popular' && 'bg-primary-600 text-white',
                    plan.badge === 'best-value' && 'bg-amber-500 text-white',
                  )}
                >
                  {plan.badge === 'popular' ? 'Paling Populer' : 'Best Value'}
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {plan.description}
                </p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Rp {formatPrice(plan.price)}
                  </span>
                  <span className="text-slate-500">/ project</span>
                </p>
              </div>
              <ul className="flex-1 space-y-3">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                    {f.tooltip ? (
                      <Tooltip text={f.tooltip}>
                        <span>{f.text}</span>
                      </Tooltip>
                    ) : (
                      <span>{f.text}</span>
                    )}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlight ? 'primary' : 'outline'}
                className="mt-6 w-full"
                onClick={() => scrollToContact(plan.id)}
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {view === 'table' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-800/50"
        >
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-900 dark:text-slate-100">
                  Fitur
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className={cn(
                      'p-4 font-semibold',
                      plan.highlight && 'bg-primary-50 dark:bg-primary-900/20',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {plan.name}
                      {plan.badge && (
                        <span className="rounded bg-primary-600 px-2 py-0.5 text-xs text-white">
                          {plan.badge === 'popular' ? 'Popular' : 'Best Value'}
                        </span>
                      )}
                    </span>
                    <p className="mt-1 font-normal text-slate-600 dark:text-slate-400">
                      Rp {formatPrice(plan.price)} / project
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingTableRows.map((row, featIndex) => (
                <tr
                  key={featIndex}
                  className={cn(
                    'border-b border-slate-100 transition-colors dark:border-slate-700/50',
                    hoveredRow === `row-${featIndex}` && 'bg-slate-50 dark:bg-slate-800/50',
                  )}
                  onMouseEnter={() => setHoveredRow(`row-${featIndex}`)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                    {row.tooltip ? (
                      <Tooltip text={row.tooltip}>
                        <span>{row.label}</span>
                      </Tooltip>
                    ) : (
                      row.label
                    )}
                  </td>
                  <td
                    className={cn(
                      'p-4',
                      pricingPlans[0].highlight && 'bg-primary-50/50 dark:bg-primary-900/10',
                    )}
                  >
                    {row.bronze ? (
                      <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                  <td
                    className={cn(
                      'p-4',
                      pricingPlans[1].highlight && 'bg-primary-50/50 dark:bg-primary-900/10',
                    )}
                  >
                    {row.silver ? (
                      <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                  <td
                    className={cn(
                      'p-4',
                      pricingPlans[2].highlight && 'bg-primary-50/50 dark:bg-primary-900/10',
                    )}
                  >
                    {row.gold ? (
                      <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-3 border-t border-slate-200 p-4 dark:border-slate-700">
            {pricingPlans.map((plan) => (
              <Button
                key={plan.id}
                variant={plan.highlight ? 'primary' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => scrollToContact(plan.id)}
              >
                Pilih {plan.name}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
