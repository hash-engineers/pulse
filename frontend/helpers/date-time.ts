export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  return `${day + ' ' + month + ' ' + year}`;
}
