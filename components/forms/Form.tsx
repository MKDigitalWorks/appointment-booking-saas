"use client";
import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";

type Props<T extends Record<string, any> = any> = {
  defaultValues?: Partial<T>;
  onSubmit?: (data: T) => void | Promise<void>;
  children: React.ReactNode;
};

export default function Form<T extends Record<string, any> = any>({
  defaultValues,
  onSubmit,
  children,
}: Props<T>) {
  const methods = useForm<T>({ defaultValues: defaultValues as any });
  const submit = methods.handleSubmit(async (data) => {
    if (onSubmit) await onSubmit(data as T);
  });
  return <FormProvider {...(methods as any)}>
    <form onSubmit={submit}>{children}</form>
  </FormProvider>;
}
