# Service directory: edited in SharePoint, published here

Staff maintain the community service directory in the **Service directory** list on the Oakdene staff
intranet (https://oakdenehouse.sharepoint.com/sites/oakdene/Lists/Service%20directory). The website keeps
reading `src/content/oakdene-service-directory.json` exactly as before; a scheduled job keeps that file in step
with the list.

## How it flows

1. A staff member adds or edits a service in the list. The list has **content approval** on, so the change
   waits as *Pending* until an approver (Simon or Pauline) approves it.
2. Every 30 minutes `.github/workflows/sync-service-directory.yml` runs `scripts/sync-service-directory.mjs`.
   It reads the list through Microsoft Graph with a read-only app, rebuilds the `services` array, refreshes the
   counts in `categoryGroups`, `coverageTiers` and `lgaTiers`, and commits the file only if it changed.
3. The push rebuilds the site as usual. An approved edit is live within about 30 to 35 minutes.

`meta`, `otherDirectories` and the group/tier descriptions stay in this file and are edited here as before.

## Safety

- The app can only read, and only the intranet site (Microsoft Graph `Sites.Selected`, granted read on that one site).
- The list's draft item security is set to approvers only, so the app sees the last **approved** version of each
  service. If it can ever see an unapproved item, the sync stops with an error rather than publishing it.
- It refuses to publish fewer than 50 services, so a permissions or connection fault can't empty the directory.
- Unchanged services keep their exact JSON, so each commit diff shows only real edits.

## One-time setup (repository owner)

Add three repository secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `SP_TENANT_ID` | Oakdene's Microsoft 365 tenant ID |
| `SP_CLIENT_ID` | Application (client) ID of the "Oakdene website directory sync" app |
| `SP_CLIENT_SECRET` | A client secret for that app |

Until the secrets exist the job skips quietly. Run it once by hand from the Actions tab to check.

The workflow pushes to `main` with the built-in `GITHUB_TOKEN`; if `main` gets branch protection, allow
GitHub Actions to push or switch the job to open a pull request instead.

## Testing locally

```bash
node scripts/sync-service-directory.mjs --from items.json --check
```

`items.json` is an array of list item field objects (as Graph returns them under `fields`). `--check` reports
whether the file would change without writing it.
