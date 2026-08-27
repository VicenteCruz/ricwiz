# Ricwiz Project Guidelines

## File Organization
- **One feature per file.** Each new command or feature goes in its own file under `src/commands/`.
- Keep `src/extension.ts` as a slim entry point — only imports, registration, and tightly-coupled integration logic.
- Never let a single file grow into a monolith. If a file starts doing too many things, split it.

## Code Reuse
- Before writing new logic, check if a shared utility already exists in `src/git.ts` or `src/types.ts`.
- If a pattern is used in more than one place, extract it into a reusable utility function in the appropriate shared module.
- Prefer creating small, well-named helper functions over duplicating code across files.

## Packaging & Releases
- Deployments are authorized and encouraged when new features or fixes are implemented, as long as the correct workflow is followed.
- **Proper Deployment Workflow**:
  1. Increment the version (`npm version patch/minor/major`).
  2. Create the package (`npx vsce package`).
  3. Delete the older `.vsix` file from the repository (`git rm <old>.vsix`).
  4. Only 1 `.vsix` file (the latest one) should ever be versioned to save repository space.
  5. Stage the changes, commit (`git commit -m "..."`), push the commit (`git push`), and ensure tags are also pushed (`git push --tags`).

## Continuous Learning & Findings
- **Self-Correction & Memory**: Whenever a mistake is made or a highly important detail for the project's progress is discovered, document it in this file (`GEMINI.md`) to maintain crucial context for the future.
- **VS Code Commands**: When adding new commands in the TypeScript code (e.g., `src/commands/`), they **must** also be declared in the `contributes.commands` array in `package.json`. Otherwise, they won't appear in the VS Code Command Palette.
- **Type Definitions vs. Implementation**: Ensure that shared API interfaces (e.g., `RicwizPublicApi`, `AiSkills`) perfectly match their implementations. If a method (like `get_git_blame`) is deprecated or native tools are used instead, remove it from the TypeScript interface to avoid silent compilation errors.
- **AI Output Sanitization**: LLMs and reasoning models (via headless CLI or API) may output thinking tags (`<thought>`, `<think>`), thinking process blocks, markdown fences, JSON wrappers, preambles, or duplicate ticket IDs. Always use strict XML tag extraction (`<commit_message>...</commit_message>`) coupled with multi-layer sanitization (`extractCommitMessage`) so internal reasoning never leaks into user-facing inputs or git commit boxes.

## Git Multi-Remote Topology
- Em contexto multi-remote, o **`originRemote`** é o repositório da equipa (onde mora a release branch, ex: `CRC-R19`). Diffs de validação locais de um ticket (para deployment, listagem de ficheiros ou testes) devem sempre ser calculados comparando a HEAD com o `originRemote` (ex: `originRemote/ticketSourceBranch`).
- O **`upstreamRemote`** é o repositório global/principal da empresa (usado para descer o topo da cadeia, mas não para diffs locais de tickets).

## Good Programming Practices
- Use proper TypeScript types instead of `any` wherever possible.
- Keep functions focused — each function should do one thing well.
- Preserve all existing comments and docstrings when modifying code.
- Write clear JSDoc comments on exported functions and interfaces.
- Use meaningful, descriptive names for files, functions, and variables.
