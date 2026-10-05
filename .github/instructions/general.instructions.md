---
applyTo: "**/*"
---

# General Engineering Instructions

These rules apply to all files in the repository. They define universal engineering standards to ensure consistency, clarity, maintainability, and professional software craftsmanship.

---

## 1. Naming Conventions
- Use clear, descriptive, and unambiguous names.
- Prefer **kebab-case** for files, **PascalCase** for types/classes, **camelCase** for variables and functions.
- Avoid abbreviations unless universally understood.
- Names must reflect purpose, not implementation details.

---

## 2. File & Folder Structure
- Organize files by **feature/domain**, not by type, unless strongly justified.
- Keep folders shallow; avoid unnecessary nesting.
- Group related logic together (e.g., services, hooks, utilities).
- Each file should contain a single responsibility.

---

## 3. Readability Standards
- Prioritize clarity over cleverness.
- Keep functions small and focused.
- Maintain consistent indentation and spacing.
- Avoid deeply nested logic; refactor when nesting exceeds 3 levels.
- Write code that is easy to understand without comments.

---

## 4. Commenting Guidelines
- Comment **why**, not **what**.
- Avoid redundant comments that restate the code.
- Use comments for:
  - Non-obvious decisions
  - Architectural reasoning
  - Known limitations
  - External constraints
- Remove outdated comments immediately.

---

## 5. Refactoring Discipline
- Refactor continuously; do not wait for large rewrites.
- Eliminate duplication aggressively.
- Extract reusable logic into shared utilities when appropriate.
- Improve naming, structure, and clarity whenever touching a file.
- Never introduce new technical debt without documenting it.

---

## 6. Error Handling
- Fail gracefully; never swallow errors silently.
- Validate inputs early.
- Use consistent error structures across the codebase.
- Log errors with actionable context.
- Avoid exposing internal details in user-facing messages.

---

## 7. Imports & Dependencies
- Use absolute imports when supported by the project.
- Keep import lists clean and sorted.
- Remove unused imports immediately.
- Avoid unnecessary dependencies; prefer native or existing utilities.
- Do not create circular dependencies.

---

## 8. Formatting & Style
- Follow the repository’s formatting tools (e.g., Prettier, ESLint).
- No manual formatting overrides unless justified.
- Maintain consistent spacing, line breaks, and ordering.
- Keep files free of trailing spaces and unused code.

---

## 9. Collaboration Rules
- Write code that others can understand and extend.
- Keep pull requests small, focused, and well‑described.
- Use clear commit messages following the repository’s conventions.
- Document architectural decisions when they affect multiple areas.
- Review code respectfully, focusing on clarity, correctness, and maintainability.

---

## 10. General Principles
- Prefer simplicity over complexity.
- Optimize for maintainability, not cleverness.
- Ensure every change improves the codebase.
- Treat the repository as a long‑term product, not a temporary project.

---
