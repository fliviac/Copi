# AGENTS.md

This document defines how automated agents, assistants, and code‑generation tools must operate within this repository. It establishes boundaries, priorities, and workflow expectations. All agents must follow these rules at all times.

---

## 1. Source of Truth & Rule Priority
Agents must follow the repository’s instruction files in this order of precedence:

1. **general.instructions.md** — universal engineering standards  
2. **typescript-react.instructions.md** — TypeScript + React rules  
3. **css-tailwind.instructions.md** — styling rules  
4. **design.instructions.md** — UI/UX principles  
5. **copilot-instructions.md** — project‑specific conventions

If a conflict occurs, **higher‑priority files override lower‑priority ones**.

Agents must not redefine or duplicate rules contained in these files.

---

## 2. Workflow Expectations
- Make **small, incremental changes**.
- Follow existing patterns; do not introduce new paradigms without clear justification.
- Avoid large refactors unless explicitly requested.
- Maintain architectural boundaries:
  - Components → UI only  
  - Hooks → reusable logic  
  - Services → Supabase and external interactions  
- Keep changes scoped, readable, and reversible.

---

## 3. Security Boundaries
Agents must **never**:
- Store or expose secrets, tokens, keys, or credentials.
- Weaken TypeScript strictness or introduce `any`.
- Bypass authentication or authorization flows.
- Introduce insecure patterns (e.g., unsanitized inputs, unsafe eval, direct DOM manipulation).
- Modify Supabase policies or security rules unless explicitly instructed.

All external data must be validated and typed before use.

---

## 4. Allowed & Forbidden Modifications
### Agents **may modify**:
- Source files in `src/`  
- Feature folders (journal, mood, auth, etc.)  
- Components, hooks, services  
- Configuration files (only when requested)  
- Documentation in Markdown files  

### Agents **must NOT modify**:
- `dist/` or any build output  
- Lockfiles (`package-lock.json`, `pnpm-lock.yaml`, etc.)  
- Generated files or artifacts  
- Node modules  
- Environment files (`.env`, `.env.local`, etc.)  
- Supabase migrations unless explicitly instructed

---

## 5. Reporting Changes
Every agent‑generated change must include:

- A **clear summary** of what was modified  
- The **reason** for the change  
- A list of **affected files**  
- Confirmation that all instruction files were respected  

Agents must not silently alter the codebase.

---

## 6. Commands & Tooling
Agents may reference or use the following project commands:

### Install dependencies
npm install

Código

### Development server
npm run dev

Código

### Production build
npm run build

Código

### Linting
npm run lint

Código

### Formatting
npm run format

Código

### Type checking
npm run typecheck

Código

### Tests (if present)
npm run test

Código

Agents must not modify these commands unless explicitly instructed.

---

## 7. Behavioral Expectations
Agents must:
- Respect all instruction files.
- Maintain consistency with existing architecture.
- Prefer clarity over cleverness.
- Avoid introducing unnecessary complexity.
- Ensure all output is deterministic and reproducible.

Agents must not:
- Invent new architectural layers.
- Introduce new dependencies without justification.
- Generate unused abstractions or speculative features.

---

## 8. Final Principles
- Follow the instructions; do not improvise outside them.
- Keep changes minimal, safe, and aligned with the project’s design.
- Maintain strict TypeScript, clean architecture, and Tailwind‑first styling.
- Treat this repository as a production system.

---