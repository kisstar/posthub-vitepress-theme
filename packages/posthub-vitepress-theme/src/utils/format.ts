export function formatDate(date: string | Date) {
  return new Date(date)
    .toLocaleDateString()
    .replace(/\d+/g, function (match) {
      return match.padStart(2, '0');
    })
    .replace(/\//g, '-');
}
