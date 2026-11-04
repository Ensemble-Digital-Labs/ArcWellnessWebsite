# ARC Wellness website

Next.js marketing site (App Router, Tailwind CSS v4, Framer Motion, GSAP).

## Folder layout

| Path | Purpose |
|------|---------|
| `src/app/` | App Router layout, pages, global styles |
| `src/app/client-showcase/` | **Client preview route** (`/client-showcase`) — simplified showcase, separate from production homepage |
| `src/client-showcase/` | Components and notes for the simplified client-only build (see `README.md` inside) |
| `src/components/arc/` | ARC homepage sections and UI (full experience at `/`; primary development target) |
| `src/content/` | Placeholder image URLs and shared copy hooks |
| `public/` | Static assets served from `/` |
| `design/reference/` | Design reference imagery (e.g. homepage mockup) |
| `design/client-showcase/` | Design assets for the **simplified client preview** (`/client-showcase`) only |
| `documents/` | Session / change logs (optional; see `.cursor/rules/session-logging.mdc`) |
| `.cursor/rules/` | Cursor project rules |

## Commands

Run from **this folder** (repository root):

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the full homepage, or [http://localhost:3000/client-showcase](http://localhost:3000/client-showcase) for the simplified client preview.

```bash
npm run build
npm start
```

## Deployment

- Merge to **`staging`** → GitHub Actions deploys to **Netlify** (PR approval only; no Actions issue gate).
- Merge to **`main`** → Actions issue approval → FTP to **GoDaddy** (`arcwellness.net`).
- **`development`** does not deploy; disable Netlify Git continuous deployment so pushes there do nothing.

Full details: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Branch / commit / PR naming: [`.cursor/rules/git-workflow.mdc`](.cursor/rules/git-workflow.mdc) (always applied).

## Agent notes

See `AGENTS.md` and `CLAUDE.md` for Next.js agent guidance.

## Leftover `arc-wellness/` directory

If an empty or partial `arc-wellness/` folder remains (often locked `node_modules` while the dev server was running), stop **`npm run dev`**, close terminals using that path, then delete `arc-wellness` in File Explorer or run:

`Remove-Item -LiteralPath "arc-wellness" -Recurse -Force`

from this folder.
