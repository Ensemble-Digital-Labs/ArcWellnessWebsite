# Arc Wellness — Deployment

## Branch flow

| Branch | Deploys to | How |
|--------|------------|-----|
| `development` / feature branches | Nowhere | Code only — **no** Netlify auto-deploy |
| `staging` | Netlify (preview/staging site) | PR into `staging` → review approval → merge → **GitHub Actions** (`Deploy staging`) |
| `main` | GoDaddy (`https://arcwellness.net`) | PR into `main` → review approval → merge → Actions issue approve/deny → FTP |

Canonical staging branch name is lowercase **`staging`**.

## Naming conventions

Enforced by Cursor rule [`.cursor/rules/git-workflow.mdc`](../.cursor/rules/git-workflow.mdc) and GitHub Actions checks:

| Kind | Format | Example |
|------|--------|---------|
| Start work | Always branch from up-to-date `staging`; never commit on `staging`/`main` | `git checkout -b feature/…` |
| Branch → `staging` | `feature\|bugfix\|hotfix\|chore\|docs\|ci/<kebab>` or `development` | `feature/hero-cta` |
| Branch → `main` | only `staging` | `staging` |
| Commit | `type(scope): summary` | `feat(nav): add sticky header` |
| PR title | `[TICKET] type(scope): description` | `feat: add staging Netlify deploy` |

PR body template: [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md).

## Stop Netlify auto-deploy from `development` (required)

Pushes to `development` must **not** publish to Netlify. Only Actions after a merge to `staging` should.

On the Netlify project (`9522cc14-708a-426a-b7bd-9af209c0e7fd`):

1. **Project configuration** → **Build & deploy** → **Continuous Deployment**
2. **Unlink** the GitHub repo, or disable automatic deploys / stop builds so Git pushes do nothing
3. Confirm a push to `development` does **not** start a Netlify deploy

Prefer CLI-only publishes so `Deploy staging` owns the site.

## GitHub Actions workflows

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `CI (PR)` | PR → `staging` or `main` | `npm ci` + `npm run build` |
| `Deploy staging` | Push to `staging` | Netlify CLI `deploy --build --prod` |
| `Deploy production` | Push to `main` | Issue approval → `npm run build:godaddy` → FTP `out/` |

### Staging environment secrets

GitHub → **Settings → Environments → staging**

- `NETLIFY_AUTH_TOKEN` — Netlify personal access token
- `NETLIFY_SITE_ID` — Netlify project/site ID

### Production environment secrets

GitHub → **Settings → Environments → production**

- `FTP_SERVER` — `cbsurgery.com` (not `ftp.cbsurgery.com`; that host has no DNS A record)
- `FTP_USERNAME` — e.g. `githubactionsdeploy@arcwellness.net`
- `FTP_PASSWORD` — FTP account password
- `FTP_SERVER_DIR_PROD` — `/` if the FTP account Directory is the site docroot (`public_html/arcwellness.net`)

### Production approval variable

GitHub → **Settings → Secrets and variables → Actions → Variables**

- `PRODUCTION_DEPLOY_APPROVERS` — comma-separated GitHub usernames

Approvers reply with **exactly** `approve`, `approved`, `lgtm`, `deny`, or `denied` on the auto-created deploy issue (the workflow initiator may self-approve if they are listed in `PRODUCTION_DEPLOY_APPROVERS`).

## Local builds

```bash
# Netlify-style (Node runtime features)
npm run build

# GoDaddy static export (writes out/ + zip under deploy/godaddy/)
npm run build:godaddy
```

Manual GoDaddy fallback: see [`deploy/godaddy/DEPLOY.txt`](../deploy/godaddy/DEPLOY.txt).
