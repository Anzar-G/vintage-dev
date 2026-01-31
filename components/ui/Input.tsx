import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  error?: string;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <input
          ref={ref}
          className={cn(
            'block w-full rounded-lg border-gray-300 bg-white text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <textarea
          ref={ref}
          className={cn(
            'block w-full rounded-lg border-gray-300 bg-white text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
