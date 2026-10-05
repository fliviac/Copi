import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import * as journalService from './journal.service'
import type { JournalEntry, JournalEntryPayload } from './types'

/** Loading state while entries are being read. */
type LoadingState = { status: 'loading' }

/** Loaded state carrying the full entry list. */
type LoadedState = { status: 'loaded'; entries: JournalEntry[] }

/** Error state carrying a user-facing message. */
type ErrorState = { status: 'error'; message: string }

/** Discriminated union describing the journal data lifecycle. */
export type JournalState = LoadingState | LoadedState | ErrorState

type JournalContextValue = {
  state: JournalState
  /** Create a new entry or update the existing one for a date. */
  saveEntry: (payload: JournalEntryPayload) => Promise<JournalEntry>
  /** Delete the entry for a date. */
  removeEntry: (date: string) => Promise<void>
  /** Re-read entries from storage. */
  reload: () => Promise<void>
}

export const JournalContext = createContext<JournalContextValue | null>(null)

/** Provider that owns the journal entry list and its lifecycle. */
export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<JournalState>({ status: 'loading' })

  const load = useCallback(async () => {
    try {
      const entries = await journalService.listEntries()
      setState({ status: 'loaded', entries })
    } catch {
      setState({
        status: 'error',
        message: 'Could not load your journal entries.',
      })
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const saveEntry = useCallback(
    async (payload: JournalEntryPayload) => {
      const entry = await journalService.createOrUpdateEntry(payload)
      await load()
      return entry
    },
    [load],
  )

  const removeEntry = useCallback(
    async (date: string) => {
      await journalService.deleteEntry(date)
      await load()
    },
    [load],
  )

  const value = useMemo(
    () => ({ state, saveEntry, removeEntry, reload: load }),
    [state, saveEntry, removeEntry, load],
  )

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
