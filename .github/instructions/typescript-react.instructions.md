---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript & React Engineering Instructions

These rules apply to all TypeScript and React files. They enforce strict correctness, clarity, and long‑term maintainability.

---

## 1. TypeScript Standards
- **No `any`**. Use precise types or `unknown` with narrowing.
- **Strict mode assumed**: no implicit `any`, no unchecked nulls, no loose inference.
- Prefer **immutable data**: avoid mutation; use `readonly` where applicable.
- Use **discriminated unions** for multi‑state logic instead of booleans or loose objects.
- Always type function parameters and return values explicitly.
- Prefer **type aliases** for complex shapes; use **interfaces** only for object contracts.
- Avoid optional fields unless semantically required.
- Use **narrowing** (`in`, `typeof`, `instanceof`) for safe branching.
- Prefer **pure functions**; avoid hidden side effects.

---

## 2. React Component Standards
- Use **functional components only**.
- Components must be **small, focused, and predictable**.
- Always type props explicitly using `type Props = { ... }`.
- Avoid inline anonymous functions inside JSX when possible.
- Prefer composition over inheritance or complex patterns.
- Never store derived values in state; compute them on render.
- Avoid prop drilling; use context or custom hooks when appropriate.

---

## 3. Hooks & State Management
- Follow the **Rules of Hooks** strictly.
- Extract reusable logic into **custom hooks**.
- Keep hook return values structured and typed.
- Use `useReducer` for multi‑state workflows or complex transitions.
- Avoid storing non‑stateful values in React state.
- Prefer **controlled components** for forms.
- Ensure state updates are **predictable and minimal**.

---

## 4. Error Handling Philosophy
- Fail explicitly; never swallow errors.
- Wrap async logic with safe guards and typed error boundaries.
- Use domain‑specific error types when possible.
- Provide actionable error messages; avoid vague or generic strings.
- Never expose internal details or stack traces to the UI.
- Ensure all async React logic handles loading, success, and failure states.

---

## 5. Data & Immutability Rules
- Treat all data as immutable.
- Avoid mutating arrays or objects; use spread or functional helpers.
- Prefer pure transformations over imperative updates.
- Ensure external data is validated and narrowed before use.

---

## 6. Imports & Module Discipline
- Use absolute imports when supported.
- Keep imports sorted and grouped: external → internal → local.
- Remove unused imports immediately.
- Avoid circular dependencies at all costs.
- Export only what is necessary; avoid large default exports.

---

## 7. JSX & Rendering Standards
- Keep JSX clean and minimal.
- Avoid deeply nested JSX; extract subcomponents.
- Use semantic HTML elements.
- Keep render logic pure; avoid side effects inside JSX.
- Prefer early returns for conditional rendering.

---

## 8. Comments & Documentation
- Comment **intent**, not implementation.
- Document complex types, discriminated unions, and reducers.
- Remove outdated comments immediately.
- Use JSDoc only when typing alone cannot express intent.

---

## 9. Refactoring & Maintainability
- Refactor continuously; do not accumulate technical debt.
- Extract reusable logic into utilities or hooks.
- Improve naming, structure, and clarity whenever touching a file.
- Avoid premature abstractions; keep solutions simple.

---

## 10. General Principles
- Prioritize correctness, clarity, and predictability.
- Prefer explicitness over magic.
- Ensure every change improves maintainability.
- Treat TypeScript as a design tool, not a compiler escape hatch.

---
