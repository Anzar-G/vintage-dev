'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-medium',
          success: 'text-green-600 dark:text-green-400',
          error: 'text-red-600 dark:text-red-400',
        },
      }}
    />
  );
}
