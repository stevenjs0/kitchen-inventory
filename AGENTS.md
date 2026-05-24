<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:ui-primitives -->
# UI Primitives: Base UI, not Radix

The `src/components/ui/` wrappers are built on **Base UI** (`@base-ui/react`), **not** Radix UI. Key differences:
- `@base-ui/react/button` — does **not** have `asChild`. Use `<Link><Button>...</Button></Link>` wrapping instead.
- `@base-ui/react/menu` — `Menu.GroupLabel` (`DropdownMenuLabel`) requires `Menu.Group` (`DropdownMenuGroup`) parent. Also `DropdownMenuTrigger` does **not** accept `asChild` — pass `className` directly instead.
- Props are not identical to Radix. Always check the actual `@base-ui/react` docs before using a primitive.
<!-- END:ui-primitives -->
