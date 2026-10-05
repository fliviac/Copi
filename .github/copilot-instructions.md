🎯 Purpose
This document defines how GitHub Copilot should generate code, structure files, and assist development for the Daily Journal + Mood Tracker web application built with Vite + React + Supabase.
Copilot must follow these conventions consistently across the entire project.

🧱 Tech Stack
Vite + React + TypeScript

Supabase (Auth + Database)

TailwindCSS

React Router v6

React Context + Custom Hooks

📁 Project Structure Rules
1. Feature‑based folder architecture (Required)
Copilot must organize files by domain/feature:

Código
src/
  journal/
    journal.service.ts
    journal.context.tsx
    useJournal.ts
    components/
  mood/
    mood.service.ts
    mood.context.tsx
    useMood.ts
    components/
  auth/
    auth.service.ts
    auth.context.tsx
    useAuth.ts
  components/
  hooks/
  utils/
  routes/
2. File naming conventions
kebab-case for files: journal-entry.tsx, mood-tracker.tsx

PascalCase for React components: JournalEntry.tsx

🎨 Styling Rules
TailwindCSS (Required)
Copilot must:

Use Tailwind utility classes for all styling.

Avoid CSS files unless absolutely necessary.

Prefer semantic class composition using className.

Example:

tsx
const JournalEntry = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      ...
    </div>
  );
};
⚛️ React Component Rules
1. Functional Components + Arrow Functions (Required)
tsx
const MoodTracker = () => {
  return <div>...</div>;
};
2. Hooks + Custom Hooks (Required)
Copilot must:

Extract logic into custom hooks.

Keep components focused on rendering.

Example:

tsx
const useJournal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => { ... };

  return { entries, loadEntries };
};
🗄️ State Management Rules
React Context + Custom Hooks (Required)
Each feature must have:

A context provider

A custom hook to access the context

Example:

Código
journal/
  journal.context.tsx
  useJournal.ts
🛠️ Supabase Rules
Service files per feature (Required)
Copilot must create service files like:

Código
journal.service.ts
mood.service.ts
auth.service.ts
Each service must:

Export named async functions

Handle Supabase queries cleanly

Never mix UI logic with data logic

Example:

ts
export const createJournalEntry = async (payload: JournalEntryPayload) => {
  return supabase.from("journal").insert(payload);
};
🧭 Routing Rules
React Router v6 (Required)
Copilot must:

Use createBrowserRouter or BrowserRouter

Use nested routes when appropriate

Create a routes/ folder

Example:

tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "journal", element: <JournalPage /> },
      { path: "mood", element: <MoodPage /> },
    ],
  },
]);
🧹 Code Style & Formatting
Prettier + ESLint (Required)
Copilot must:

Format code automatically using Prettier rules

Follow ESLint recommendations for React + TS

Avoid unused imports and variables

📝 Commit Message Rules
Conventional Commits (Required)
Copilot must generate commit messages using:

feat: new features

fix: bug fixes

refactor: code improvements

docs: documentation

style: formatting

chore: maintenance

test: testing

Examples:

Código
feat: add mood context provider
fix: correct date formatting in journal service
refactor: extract supabase logic into feature services
🧪 Testing Preferences (Optional but encouraged)
If Copilot generates tests:

Use Vitest

Use React Testing Library

Test hooks and services separately

📌 General Behaviour Rules for Copilot
Copilot must:

Always generate TypeScript.

Prefer async/await over .then().

Avoid overly complex abstractions.

Keep components small and focused.

Suggest improvements aligned with industry standards.

Follow all conventions in this document before generating code.

🎉 End of Instructions