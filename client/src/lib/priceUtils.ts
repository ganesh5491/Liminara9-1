export function parsePrice(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  
  const cleanedValue = String(value).replace(/,/g, '').replace(/₹/g, '').trim();
  const parsed = parseFloat(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatPrice(value: string | number | null | undefined): string {
  const numValue = parsePrice(value);
  return numValue.toLocaleString('en-IN');
}

export function formatCurrency(value: string | number | null | undefined): string {
  const numValue = parsePrice(value);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numValue);
}
