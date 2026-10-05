/** A single mood option: an emoji paired with a human-readable label. */
export type Mood = {
  emoji: string
  label: string
}

/** A journal entry. `date` is a `YYYY-MM-DD` key and is unique per entry. */
export type JournalEntry = {
  date: string
  mood: string
  text: string
}

/** Payload used to create or update an entry. */
export type JournalEntryPayload = {
  date: string
  mood: string
  text: string
}
