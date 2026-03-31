# AGENTS.md — PetCare Frontend

## Project Overview

React 19 + TypeScript + Vite SPA. Feature-based architecture in `src/features/`.
Package manager: **pnpm** (v10.14.0 — NEVER use npm or yarn).

## Commands

```bash
pnpm dev          # Start dev server (Vite)
pnpm build        # TypeScript check + production build (tsc -b && vite build)
pnpm lint         # ESLint check
pnpm preview      # Preview production build locally
```

**There are NO tests.** No test runner (Vitest/Jest) is configured. Do not create test files
unless explicitly asked. If you need to add tests later, Vitest is the natural choice for Vite.

## Project Structure

```
src/
├── assets/              # Static images, icons
├── auth/                # Auth logic, token management
├── components/
│   ├── auth/            # ProtectedRoute, RoleProtectedRoute
│   ├── landing-page/    # Landing page sections
│   └── ui/              # Reusable UI primitives (Button, Input, Badge, etc.)
├── features/            # Feature modules (billing, booking, pets, sitters, etc.)
│   └── <feature>/
│       ├── components/  # Feature-specific components
│       ├── view/        # View/page-level components
│       ├── types/       # Feature types (barrel exported)
│       ├── hooks/       # Feature-specific hooks
│       └── index.ts     # Barrel file
├── hooks/               # Global custom hooks
├── layouts/             # Layout wrappers (DashboardLayout)
├── lib/                 # Utilities (cn() helper)
├── pages/               # Top-level route pages (LoginPage, Register, etc.)
├── schemas/             # Zod validation schemas
├── services/            # Axios API service functions
├── store/               # Zustand stores
├── types/               # Global TypeScript interfaces
└── utils/               # Global utility functions
```

## Path Aliases

Use these in imports — configured in both `tsconfig.app.json` and `vite.config.ts`:

```typescript
import { Something } from '@/services/petService';        // src/
import { Button } from '@components/ui/Button';           // src/components/
import logo from '@assets/logo.svg';                       // src/assets/
```

Prefer `@/` absolute imports over deep relative paths (`../../../`).

## Code Style

### Components
- **Named exports only** — `export function ComponentName()`, never `export default`.
- Functional components with inline props destructuring:
  ```tsx
  export function PetCard({ pet, onSelect }: PetCardProps) { ... }
  ```
- Use `interface` for component props, not `type` (consistency with existing codebase).

### TypeScript
- **Strict mode enabled** — `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`.
- Use `interface` for object shapes (API responses, props). Use `type` for unions/aliases.
- Avoid `any`. Use `unknown` + type guards when needed.
- `verbatimModuleSyntax: true` — always use `import type { ... }` for type-only imports.

### State Management (Zustand)
- Stores in `src/store/`. Naming: `PascalCase` with `Store` suffix (e.g., `PetStore.ts`).
- Use selector pattern for reading state:
  ```tsx
  const pets = usePetsStore((state) => state.pets);
  const isLoading = usePetsStore((state) => state.isLoading);
  ```

### Forms (React Hook Form + Zod)
- Schemas in `src/schemas/` using Zod v4.
- Use `zodResolver` with `useForm`:
  ```tsx
  const methods = useForm<FormData>({
    resolver: zodResolver(mySchema),
    defaultValues: { ... },
  });
  ```

### API Calls (Axios)
- Services in `src/services/`. One file per domain (e.g., `petService.ts`).
- Always use try/catch with typed errors. Throw user-friendly messages in Spanish.
- Use the configured axios instance from `@/services/auth` (has interceptors).

### Styling (Tailwind CSS v4)
- Tailwind v4 with `@tailwindcss/vite` plugin — NO `tailwind.config.js`.
- Use `cn()` from `@/lib/utils` for conditional/merged classes (clsx + tailwind-merge).
- Lucide React for icons.

### Naming Conventions
| Type           | Convention       | Example                      |
|----------------|------------------|------------------------------|
| Components     | PascalCase       | `PetsOverview.tsx`           |
| Hooks          | `use` + camelCase | `usePetsActions.ts`         |
| Stores         | PascalCase + Store | `PetStore.ts`              |
| Services       | camelCase        | `petService.ts`              |
| Schemas        | camelCase + Schema | `loginSchema.ts`            |
| Types          | PascalCase       | `PetResponse`, `CreatePetRequest` |
| Utilities      | camelCase        | `dateUtils.ts`              |
| Pages          | PascalCase + Page | `LoginPage.tsx`             |

### File Organization
- Feature-based: group by feature, not by file type.
- Use barrel files (`index.ts`) in feature roots and subdirectories.
- Keep components small. Extract logic to hooks in `hooks/` subdirectory.

### Error Handling
- Use `sonner` toast for user-facing errors: `toast.error('Mensaje en español')`.
- API service functions: try/catch → console.error + throw descriptive Error.
- Use error boundary components for route-level fallbacks.

## Key Dependencies

| Purpose          | Library                  |
|------------------|--------------------------|
| UI Primitives    | Radix UI (slot, popover) |
| State            | Zustand 5                |
| Forms            | React Hook Form 7        |
| Validation       | Zod 4                    |
| HTTP             | Axios                    |
| Routing          | React Router 7           |
| Styling          | Tailwind CSS 4 + CVA     |
| Animations       | Framer Motion            |
| Notifications    | Sonner                   |
| Icons            | Lucide React             |
| Dates            | date-fns + react-day-picker |

## Build Configuration

- **Bundler:** Vite 7 with SWC (React plugin)
- **Code splitting:** Manual chunks in `vite.config.ts` (vendor, router, dashboard, pets, booking, sitters)
- **Docker:** Multi-stage build — stage 1 builds, stage 2 serves with `serve` on port 80
- **Deploy:** Dokploy (Docker) + Vercel support via `vercel.json`
