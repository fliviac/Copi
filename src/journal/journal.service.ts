import type { JournalEntry, JournalEntryPayload } from './types'

/**
 * Data access layer for journal entries.
 *
 * All persistence is isolated behind these async functions so the storage
 * backend (currently localStorage) can be swapped for Supabase later without
 * touching UI code.
 */

const STORAGE_KEY = 'daily-journal:entries'

/** Read all entries from storage. Returns an empty list when none exist. */
const readEntries = (): JournalEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isEntry)
  } catch {
    // Corrupt or unavailable storage: treat as empty rather than crash.
    return []
  }
}

/** Write the full entry list to storage. */
const writeEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

/** Narrow an unknown value to a valid JournalEntry. */
const isEntry = (value: unknown): value is JournalEntry => {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.date === 'string' &&
    typeof entry.mood === 'string' &&
    typeof entry.text === 'string'
  )
}

/** List all entries, newest date first. */
export const listEntries = async (): Promise<JournalEntry[]> => {
  const entries = readEntries()
  return entries.sort((a, b) => b.date.localeCompare(a.date))
}

/** Get a single entry by its `YYYY-MM-DD` date key, or `undefined`. */
export const getEntryByDate = async (
  date: string,
): Promise<JournalEntry | undefined> => {
  const entries = readEntries()
  return entries.find((entry) => entry.date === date)
}

/**
 * Create a new entry, or update the existing one for that date.
 * Enforces the one-entry-per-calendar-day rule.
 */
export const createOrUpdateEntry = async (
  payload: JournalEntryPayload,
): Promise<JournalEntry> => {
  const entries = readEntries()
  const existingIndex = entries.findIndex(
    (entry) => entry.date === payload.date,
  )
  const entry: JournalEntry = { ...payload }

  if (existingIndex >= 0) {
    entries[existingIndex] = entry
  } else {
    entries.push(entry)
  }

  writeEntries(entries)
  return entry
}

/** Delete the entry for the given date. Resolves to `true` if one was removed. */
export const deleteEntry = async (date: string): Promise<boolean> => {
  const entries = readEntries()
  const remaining = entries.filter((entry) => entry.date !== date)
  const removed = remaining.length !== entries.length
  if (removed) writeEntries(remaining)
  return removed
}
