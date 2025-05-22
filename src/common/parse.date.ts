export function parseDate(value: string): Date | null {
  if (!value) return null;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [day, month, year] = value.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  const date = new Date(value);
  if (!isNaN(date.getTime())) {
    return date;
  }

  return null;
}
