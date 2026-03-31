# Skill Registry — PetCare-Frontend

Generated: 2026-03-31

## Project Context

**Tech Stack**: React 19 + TypeScript 5.8 + Vite 7 (SWC)
**Package Manager**: pnpm 10.14.0
**Architecture**: Feature-based (src/features/*)
**Styling**: Tailwind CSS 4 + CVA + Lucide icons
**State**: Zustand 5 (src/store/)
**Forms**: React Hook Form 7 + Zod 4 (src/schemas/)
**HTTP**: Axios (src/services/)
**Routing**: React Router 7
**Animations**: Framer Motion
**Linting**: ESLint 9 + typescript-eslint + react-hooks/react-refresh

## Relevant Skills (auto-loaded by context)

| Skill | Trigger | When to Load |
|-------|---------|--------------|
| react-19 | Writing React components | Always for this project |
| typescript | Writing TypeScript code | Always for this project |
| zustand-5 | State management | When working with src/store/* |
| zod-4 | Schema validation | When working with src/schemas/* |
| tailwind-4 | Styling | When writing styles |
| react-native | Mobile (if RN branch exists) | Only if mobile context |
| security-checklist | New features, APIs | When adding features |
| playwright | E2E testing | If tests are added |
| github-pr | Creating PRs | When committing/pushing |

## Code Conventions (from AGENTS.md)

- **Named exports only** — no `export default`
- **interface** for component props and API responses
- **type** for unions/aliases
- **strict: true** — no `any`, use `unknown` + guards
- **verbatimModuleSyntax: true** — `import type` for type-only imports
- Path aliases: `@/`, `@components/*`, `@assets/*`
- Naming: PascalCase components, camelCase hooks/services, PascalCase + Store for Zustand
- Error handling: try/catch + toast (sonner) + descriptive Spanish messages

## File Structure

```
src/
├── assets/
├── auth/
├── components/          # Reusable (auth/, landing-page/, ui/)
├── features/            # Feature modules (16 features)
├── hooks/               # Global hooks
├── layouts/             # Layout wrappers
├── lib/                 # Utilities (cn())
├── pages/               # Top-level route pages
├── schemas/             # Zod schemas
├── services/            # Axios services
├── store/               # Zustand stores
├── types/               # Global types
└── utils/               # Global utilities
```

## Skills Scanned

### User-level (deduplicated by name)
- **react-19**: "React 19 patterns with React Compiler. Trigger: When writing React components - no useMemo/useCallback needed."
- **typescript**: "TypeScript strict patterns and best practices. Trigger: When writing TypeScript code - types, interfaces, generics."
- **zustand-5**: "Zustand 5 state management patterns. Trigger: When managing React state with Zustand."
- **zod-4**: "Zod 4 schema validation patterns. Trigger: When using Zod for validation - breaking changes from v3."
- **tailwind-4**: "Tailwind CSS 4 patterns and best practices. Trigger: When styling with Tailwind - cn(), theme variables, no var() in className."
- **security-checklist**: "OWASP Top 10 2025 security checklist and Spring Boot common vulnerabilities. Trigger: When implementing new features, APIs, or making security-related changes."
- **playwright**: "Playwright E2E testing patterns. Trigger: When writing E2E tests - Page Objects, selectors, MCP workflow."
- **github-pr**: "Create high-quality Pull Requests with conventional commits and proper descriptions. Trigger: When creating PRs, writing PR descriptions, or using gh CLI for pull requests."
- **skill-creator**: "Creates new AI agent skills following the Agent Skills spec. Trigger: When user asks to create a new skill, add agent instructions, or document patterns for AI."
- **go-testing**: "Go testing patterns for Gentleman.Dots, including Bubbletea TUI testing. Trigger: When writing Go tests, using teatest, or adding test coverage."
- **playwright-cli**: "Automates browser interactions for web testing, form filling, screenshots, and data extraction."
- **sdd-***: SDD workflow skills (explore, propose, spec, design, tasks, apply, verify, archive, init)

### Project-level conventions
- **AGENTS.md**: Project-level agent instructions (referenced above)

### Build/Deploy
- **Docker**: Multi-stage Dockerfile + compose.yml
- **Deploy**: Dokploy (Docker) + Vercel (vercel.json)
- **CI**: GitHub Actions (deployment.yml)
