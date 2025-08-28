export function formatCurrencyMX(value: number) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value);
}



// utils/money.ts
export function formatCurrencyUSD(value: number | string | null | undefined) {
    if (value == null) return '$0.00';
  
    const n =
      typeof value === 'number'
        ? value
        : Number(String(value).replace(/[^0-9.-]+/g, '')); // quita $, comas, espacios
  
    if (!isFinite(n) || isNaN(n)) return '$0.00';
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(n);
  }
  