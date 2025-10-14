// FILE: lib/env.ts
import {z} from 'zod';

// erlaubt sowohl "Name <email@domain>" als auch "email@domain"
const emailFromSchema = z
  .string()
  .min(3)
  .refine((v) => {
    const match = v.match(/<?([^<>@\s]+@[^<>@\s]+)>?$/);
    if (!match) return false;
    const email = match[1];
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, 'Invalid email')
  .optional()
  .nullable()
  .or(z.literal(''));

// optionale URL: darf leer sein
const optionalUrl = z
  .string()
  .url()
  .optional()
  .nullable()
  .or(z.literal(''));

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),

  DATABASE_URL: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().optional().nullable().or(z.literal('')),
  GOOGLE_CLIENT_SECRET: z.string().optional().nullable().or(z.literal('')),

  STRIPE_SECRET_KEY: z.string().optional().nullable().or(z.literal('')),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional().nullable().or(z.literal('')),
  STRIPE_WEBHOOK_SECRET: z.string().optional().nullable().or(z.literal('')),
  STRIPE_PRICE_DEFAULT: z.string().optional().nullable().or(z.literal('')),
  STRIPE_TAX_ENABLED: z.string().optional().nullable().or(z.literal('')),

  RESEND_API_KEY: z.string().optional().nullable().or(z.literal('')),
  EMAIL_FROM: emailFromSchema,

  UPSTASH_REDIS_REST_URL: optionalUrl,
  UPSTASH_REDIS_REST_TOKEN: z.string().optional().nullable().or(z.literal(''))
});

export const env = envSchema.parse(process.env);
