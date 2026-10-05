---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# CSS & Tailwind Engineering Instructions

These rules define how styling must be implemented across the repository using a Tailwind‑first approach.

---

## 1. Tailwind‑First Styling
- Use **Tailwind utility classes** for all layout, spacing, typography, color, and interaction.
- Prefer composition via `className` instead of custom CSS.
- Avoid inline styles unless required for dynamic values.
- Use Tailwind config (`tailwind.config.js`) for theme extensions, not ad‑hoc CSS.

---

## 2. Class Organization Order
Classes must follow this order for consistency:

1. **Layout** (flex, grid, block, container)  
2. **Box Model** (margin, padding, width, height)  
3. **Typography** (text‑*, font‑*, leading‑*, tracking‑*)  
4. **Visuals** (bg‑*, border‑*, shadow‑*)  
5. **State** (hover:*, focus:*, active:*, disabled:*)  
6. **Responsive variants** (sm:, md:, lg:, xl:)  
7. **Dark mode variants** (dark:*)  

Example:

```tsx
<div className="flex flex-col p-4 text-sm text-gray-700 bg-white shadow-md hover:bg-gray-50 md:p-6 dark:bg-gray-900">
3. Responsive Design Rules
Use Tailwind’s mobile‑first breakpoints (sm, md, lg, xl).

Avoid custom media queries unless absolutely necessary.

Ensure components scale gracefully without relying on fixed pixel values.

Prefer max-w-*, flex-wrap, and fluid spacing utilities.

4. Accessibility Requirements
All interactive elements must include focus states using Tailwind (focus:outline-none, focus:ring-*).

Use semantic HTML elements before styling.

Ensure color contrast meets WCAG AA; use Tailwind’s accessible palette.

Provide aria-* attributes when needed.

Avoid removing outlines unless replacing them with visible focus indicators.

5. Custom CSS Rules
Custom CSS is allowed only when:

Tailwind cannot express the requirement (rare).

You need complex animations beyond Tailwind’s capabilities.

You need reusable component‑level styles that Tailwind cannot simplify.

When using custom CSS:

Place styles in feature‑scoped .css files.

Keep selectors minimal and avoid global overrides.

Never duplicate what Tailwind already provides.

6. Component Styling Philosophy
Keep components visually simple and consistent.

Extract repeated class sets into:

Tailwind @apply (sparingly)

Reusable components

Utility functions returning class strings

Avoid deeply nested DOM structures; simplify markup before styling.

7. State & Interaction Styling
Use Tailwind variants for:

hover:*

focus:*

active:*

disabled:*

aria-* states when applicable

Ensure interactive elements have:

Clear hover feedback

Visible focus rings

Disabled styles that prevent interaction

8. Formatting & Cleanliness
Keep class lists sorted and grouped according to the defined order.

Remove unused classes immediately.

Avoid overly long class strings; extract when readability suffers.

Ensure no trailing spaces or unused CSS rules.

9. General Principles
Tailwind first, custom CSS last.

Prioritize clarity, accessibility, and consistency.

Keep styling predictable and maintainable.

Every change should simplify or improve the UI codebase.

Código

If you want, I can also generate:

- `react-context.instructions.md`
- `supabase.instructions.md`
- `ui-components.instructions.md`
- `design-system.tokens.md`

Just tell me which one you want next.