export function parseDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;

  const clean = dateStr.trim().split(" ");

  const [monthStr, yearStr] = [clean[0], clean[clean.length - 1]]; // Garantee to get month and year only (Ex: if dateStr is "Jan de 2020" get "Jan" and "2020" if is "Jan 2020" get "Jan" and "2020")

  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return new Date(Number(yearStr), months[monthStr.substring(0, 3)], 1);
}
