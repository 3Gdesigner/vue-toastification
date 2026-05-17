# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
yarn dev           # Start demo dev server
yarn preview       # Preview production demo on port 3000

# Build
yarn build         # Full build (code + type declarations)
yarn build:code    # Vite build only (ES + UMD modules)
yarn build:tsc     # TypeScript declarations only
yarn build:demo    # Build demo app

# Test
yarn test          # Run all unit tests
yarn test:watch    # Jest in watch mode
yarn test:unit -- tests/unit/ts/interface.spec.ts   # Single file
yarn test:unit -- -t "pattern"                      # By test name

# Lint
yarn lint          # Type check + ESLint
yarn lint:fix      # Apply auto-fixes
```

## Architecture

Vue Toastification is a Vue 3 toast notification library with no runtime dependencies. It ships three outputs: `dist/index.es.js`, `dist/index.umd.js`, and `dist/index.css` (types at `dist/types/`).

### Core flow

The library uses **provide/inject** + an **EventBus** pattern:

1. `VueToastificationPlugin` ([src/ts/plugin.ts](src/ts/plugin.ts)) installs the plugin and provides the toast interface via `app.provide()`.
2. `useToast()` ([src/ts/composables/useToast.ts](src/ts/composables/useToast.ts)) retrieves the injected interface. On SSR (no `window`), it returns a no-op mock that logs warnings.
3. `buildInterface()` ([src/ts/interface.ts](src/ts/interface.ts)) constructs the toast API (`.success()`, `.error()`, `.dismiss()`, `.update()`, etc.) and emits events via the `EventBus`.
4. `VtToastContainer.vue` ([src/components/VtToastContainer.vue](src/components/VtToastContainer.vue)) listens to those events and manages the list of active toasts.
5. `VtToast.vue` renders individual toasts; `VtProgressBar`, `VtIcon`, `VtCloseButton`, `VtTransition` are sub-components.

### Key files

| File | Role |
|------|------|
| [src/index.ts](src/index.ts) | Public entry point — re-exports everything |
| [src/ts/constants.ts](src/ts/constants.ts) | `TYPE`, `POSITION`, `EVENTS` enums |
| [src/ts/eventBus.ts](src/ts/eventBus.ts) | `EventBus` class powering toast lifecycle |
| [src/types/](src/types/) | All TypeScript types (`plugin.ts`, `toast.ts`, `toastContainer.ts`, `common.ts`) |
| [src/scss/index.scss](src/scss/index.scss) | All styles |

### Behavior composables

[src/ts/composables/](src/ts/composables/) contains isolated UI behavior hooks used by `VtToast`: `useDraggable.ts`, `useHoverable.ts`, `useFocusable.ts`.

### Build modes

Vite operates in two modes (via `MODE` env var): `lib` produces the library bundle; `demo` builds the demo app from `./demo/` root. The library build externalizes Vue entirely.

## Testing

Jest with `ts-jest` and `@vue/vue3-jest`. Tests live in [tests/unit/](tests/unit/).

**Coverage is enforced at 100%** across branches, functions, lines, and statements — all new code paths must be covered.
