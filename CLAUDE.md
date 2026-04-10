# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What This Is

Marketing website for **amiticia.cc** — the public-facing landing page for the AmiticIA product suite. Single-page Vite + React app deployed as a Docker container on the Hostinger VPS behind Traefik.

## Tech Stack

- **Build**: Vite 5
- **Framework**: React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn-ui (Radix primitives under `src/components/ui/`)
- **Router**: react-router-dom v6
- **Forms**: react-hook-form + zod
- **Icons**: lucide-react
- **Package manager**: npm (`package-lock.json` is the source of truth, matching the Docker build)

## Scripts

```bash
npm install        # Install deps
npm run dev        # Vite dev server on :8080
npm run build      # Production build to dist/
npm run lint       # ESLint
npm run preview    # Preview built dist on :3000 (host mode)
```

## Project Layout

```
src/
  pages/            # Top-level routes
  components/       # Shared components
    ui/             # shadcn-ui primitives (don't edit by hand — use shadcn CLI)
  hooks/            # Custom hooks
  lib/              # Utilities (cn, etc.)
  assets/           # Static assets imported by code
public/             # Static files served as-is
Dockerfile          # Multi-stage: node builder → nginx runtime
nginx.conf          # SPA fallback + asset caching, listens on :3000
amiticia-site.yml   # Production compose file (pulls pre-built image)
.github/workflows/
  deploy.yml        # CI/CD: build → push to ghcr.io → SSH deploy
```

## Deployment

**Fully automated.** Push to `main` → GitHub Actions builds a Docker image → pushes to `ghcr.io/eusoubrasileiro/amitic-ai-core:latest` → SSHes into the Hostinger VPS → `docker compose pull && up -d`. End-to-end takes ~2 min.

### How it works

1. **Image build** (`Dockerfile`): multi-stage. Stage 1 `node:20-alpine` runs `npm ci && npm run build`. Stage 2 `nginx:alpine` copies `dist/` into `/usr/share/nginx/html` and serves it on port 3000 using `nginx.conf` (SPA fallback + immutable caching for `/assets/`).
2. **Registry**: `ghcr.io/eusoubrasileiro/amitic-ai-core`. Tagged `:latest` and `:sha-<short>` per commit. Package is public so the VPS pulls without auth.
3. **Compose on the VPS** (`/root/amiticia-site/amiticia-site.yml`): `image: ghcr.io/.../amitic-ai-core:latest`, `pull_policy: always`, `restart: unless-stopped`. Traefik labels unchanged — still routes `amiticia.cc` / `www.amiticia.cc` via `myresolver`, on the external `network_public` network.
4. **CI/CD** (`.github/workflows/deploy.yml`): triggers on push to `main` or manual dispatch. Two jobs: `build-and-push` (uses `docker/build-push-action` with GHA cache) and `deploy` (uses `appleboy/ssh-action` to run `docker compose pull && up -d && docker image prune -f` on the VPS).

### Required GitHub secrets

| Name | Value |
|---|---|
| `SSH_HOST` | Hostinger IP |
| `SSH_USER` | `root` |
| `SSH_KEY` | Private ed25519 key for the Actions deploy user |

`GITHUB_TOKEN` (auto-provided) handles ghcr.io push.

### Manual deploy (escape hatch)

If Actions is broken:
```bash
ssh hostinger
cd /root/amiticia-site
docker compose -f amiticia-site.yml pull
docker compose -f amiticia-site.yml up -d
```

To roll back to a specific commit, edit the image tag in `amiticia-site.yml` to `ghcr.io/.../amitic-ai-core:sha-<short>` and run the pull+up commands above.

### Gotchas

- **Repo name mismatch**: git origin is `eusoubrasileiro/amitic-ai-core.git`, not `amiticia-site`. Both names refer to the same repo. The ghcr.io image name follows the repo name.
- **`vite.config.ts` `preview.allowedHosts`** is only used for `npm run preview` (local dev). Production serves via nginx, which doesn't care about host headers. Leaving it correct anyway is cheap insurance.
- **Never commit** `mcp-logs.txt` or `wa-logs.txt` — local debug artifacts (already gitignored).

## Parent Context

This repo is part of the AmiticIA monorepo at `~/Projects/amiticia/repositories/`. See the root `CLAUDE.md` there for cross-project conventions (pnpm workspaces elsewhere, WhatsApp integration patterns, etc.). This site is an outlier: it uses npm and is not part of any pnpm workspace.
