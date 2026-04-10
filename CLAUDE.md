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
- **Package manager**: npm (note: repo has both `package-lock.json` and `bun.lockb` — `npm ci` is the source of truth, matching the Docker deploy)

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
  pages/          # Top-level routes
  components/     # Shared components
    ui/           # shadcn-ui primitives (don't edit by hand — use shadcn CLI)
  hooks/          # Custom hooks
  lib/            # Utilities (cn, etc.)
  assets/         # Static assets imported by code
public/           # Static files served as-is
amiticia-site.yml # Docker compose for production deployment
```

## Deployment

Production runs on the Hostinger VPS. Compose file `amiticia-site.yml` (also kept at `/root/amiticia-site/amiticia-site.yml` on the server) runs a `node:20` container that:

1. Git-clones this repo into `/srv/app` (idempotent — skips if already cloned)
2. `git pull` to get latest `main`
3. `npm ci && npm run build`
4. `npx serve -s dist -l 3000` to serve the built SPA

Traefik labels route `amiticia.cc` and `www.amiticia.cc` with HTTPS via the `myresolver` certresolver. Container is on the external `network_public` Docker network and has `restart: unless-stopped` so it recovers from reboots.

### Deploy flow

1. Commit + push to `main` on GitHub.
2. On the VPS: `ssh hostinger` then `cd /root/amiticia-site && docker compose -f amiticia-site.yml down && docker compose -f amiticia-site.yml up -d`. The container re-pulls and rebuilds on startup.
3. If `amiticia-site.yml` itself changed, `scp` it to `/root/amiticia-site/` first before the down/up.

### Gotchas

- **Repo name mismatch**: the git origin is `eusoubrasileiro/amitic-ai-core.git`, not `amiticia-site`. Both names refer to the same repo. The Docker command hardcodes the `amitic-ai-core` URL.
- **`vite.config.ts` `preview.allowedHosts`** must include any hostname Traefik routes to it (currently `amiticia.cc`, `www.amiticia.cc`, `localhost`). Missing entries cause Vite to reject requests.
- **Don't use `docker start` after a reboot** — the inline bash bootstrap would try to re-clone into an existing `/srv/app`. Always `docker compose down && up -d` for a clean rebuild. The idempotent guard handles this now, but `down && up` is still the right pattern.
- **Never commit** `mcp-logs.txt` or `wa-logs.txt` — these are local debug artifacts.

## Parent Context

This repo is part of the AmiticIA monorepo at `~/Projects/amiticia/repositories/`. See the root `CLAUDE.md` there for cross-project conventions (pnpm workspaces elsewhere, WhatsApp integration patterns, etc.). This site is an outlier: it uses npm and is not part of any pnpm workspace.
