import * as React from 'react';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

interface FormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: (form: UseFormReturn<T>) => React.ReactNode;
  className?: string;
  defaultValues?: Partial<T>;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
  defaultValues,
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  });

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {children(form)}
    </form>
  );
}

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  render: ({ field, fieldState }: { field: any; fieldState: any }) => React.ReactNode;
}

export function FormField<T extends FieldValues>({
  form,
  name,
  render,
}: FormFieldProps<T>) {
  return (
    <>
      {render({
        field: form.register(name),
        fieldState: form.formState.errors[name],
      })}
    </>
  );
}

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormControl({ className, ...props }: FormControlProps) {
  return <div className={cn('', className)} {...props} />;
}

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  if (!children) return null;
  
  return (
    <p
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {children}
    </p>
  );
}
