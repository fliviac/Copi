import type { Mood } from './types'

/** The set of moods a user can pick for a journal entry. */
export const MOODS: Mood[] = [
  { emoji: '😄', label: 'Great' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😕', label: 'Low' },
  { emoji: '😢', label: 'Bad' },
]

/** Look up a mood by its label. Returns `undefined` when not found. */
export const getMoodByLabel = (label: string): Mood | undefined =>
  MOODS.find((mood) => mood.label === label)
