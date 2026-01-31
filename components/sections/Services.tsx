import { services } from '@/data/services';
import { Card } from '@/components/ui/Card';
import { Database, Palette, TerminalSquare } from 'lucide-react';

const iconMap = {
  terminal: TerminalSquare,
  database: Database,
  design: Palette,
} as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-slate-200 py-16 md:py-20 dark:border-slate-800">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-section font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Layanan
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Specializing in end-to-end development to bring your digital product ideas to life.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="flex h-full flex-col gap-4 border-slate-200 bg-white p-8 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-medium dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
