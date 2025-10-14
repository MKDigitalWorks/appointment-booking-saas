// lib/price.ts
export function formatCents(cents: number, currency = "EUR", locale?: string) {
    const amount = (cents || 0) / 100;
    return new Intl.NumberFormat(locale || undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  