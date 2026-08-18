# Ricwiz Project Guidelines

## File Organization
- **One feature per file.** Each new command or feature goes in its own file under `src/commands/`.
- Keep `src/extension.ts` as a slim entry point — only imports, registration, and tightly-coupled integration logic.
- Never let a single file grow into a monolith. If a file starts doing too many things, split it.

## Code Reuse
- Before writing new logic, check if a shared utility already exists in `src/git.ts` or `src/types.ts`.
- If a pattern is used in more than one place, extract it into a reusable utility function in the appropriate shared module.
- Prefer creating small, well-named helper functions over duplicating code across files.

## Good Programming Practices
- Use proper TypeScript types instead of `any` wherever possible.
- Keep functions focused — each function should do one thing well.
- Preserve all existing comments and docstrings when modifying code.
- Write clear JSDoc comments on exported functions and interfaces.
- Use meaningful, descriptive names for files, functions, and variables.
