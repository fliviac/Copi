/** Format a date as a `YYYY-MM-DD` key in the local timezone. */
export const toDateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Today's `YYYY-MM-DD` key in the local timezone. */
export const todayKey = (): string => toDateKey(new Date())

/** Parse a `YYYY-MM-DD` key into a local `Date` (midnight). */
export const parseDateKey = (key: string): Date => {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Format a `YYYY-MM-DD` key as a readable date, e.g. "Mon, Jan 5, 2026". */
export const formatDisplayDate = (key: string): string =>
  parseDateKey(key).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
