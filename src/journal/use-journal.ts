import { useContext } from 'react'
import { JournalContext } from './journal.context'

/** Access the journal provider state and actions. */
export const useJournal = () => {
  const context = useContext(JournalContext)
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider')
  }
  return context
}
