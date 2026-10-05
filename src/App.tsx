import { RouterProvider } from 'react-router-dom'
import { JournalProvider } from './journal/journal.context'
import { router } from './routes/router'

/** Root component: wires the journal provider and the router. */
const App = () => {
  return (
    <JournalProvider>
      <RouterProvider router={router} />
    </JournalProvider>
  )
}

export default App
