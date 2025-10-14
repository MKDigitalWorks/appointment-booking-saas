import * as React from 'react';
import { Input } from '@/components/ui/Input';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './Form';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export function Field({
  label,
  description,
  error,
  required,
  className,
  ...props
}: FieldProps) {
  return (
    <FormItem>
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input
          className={error ? 'border-destructive' : ''}
          {...props}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
}
