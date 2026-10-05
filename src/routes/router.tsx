import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout'
import { HomePage } from '../pages/home-page'
import { JournalsPage } from '../pages/journals-page'
import { NewJournalPage } from '../pages/new-journal-page'
import { JournalDetailPage } from '../pages/journal-detail-page'
import { EditJournalPage } from '../pages/edit-journal-page'
import { NotFoundPage } from '../pages/not-found-page'

/** Application routes. All pages render inside the shared Layout. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'journals', element: <JournalsPage /> },
      { path: 'journals/new', element: <NewJournalPage /> },
      { path: 'journals/:date', element: <JournalDetailPage /> },
      { path: 'journals/:date/edit', element: <EditJournalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
