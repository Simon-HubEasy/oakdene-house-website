// Rebuilds src/content/oakdene-service-directory.json from the "Service directory" list on the Oakdene staff
// intranet (SharePoint), so staff can edit services there and the website picks the changes up.
//
// Run by .github/workflows/sync-service-directory.yml every 30 minutes. Only approved list items are published:
// the list has content approval on and draft visibility set to approvers, so a read-only app sees the last approved
// version of each item. As a safety net the sync refuses to run if it can see anything unapproved.
//
// Usage:
//   node scripts/sync-service-directory.mjs                 # reads SharePoint (needs SP_TENANT_ID, SP_CLIENT_ID, SP_CLIENT_SECRET)
//   node scripts/sync-service-directory.mjs --from <file>   # reads list items from a JSON file instead (for testing)
//   add --check to report whether the file would change, without writing it
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/content/oakdene-service-directory.json', import.meta.url);
const SITE_PATH = 'oakdenehouse.sharepoint.com:/sites/oakdene';
const LIST = 'Service directory';
const GRAPH = 'https://graph.microsoft.com/v1.0';

const args = process.argv.slice(2);
const fromFile = args.includes('--from') ? args[args.indexOf('--from') + 1] : null;
const checkOnly = args.includes('--check');

async function graphItems() {
  const { SP_TENANT_ID: t, SP_CLIENT_ID: id, SP_CLIENT_SECRET: secret } = process.env;
  if (!t || !id || !secret) throw new Error('SP_TENANT_ID, SP_CLIENT_ID and SP_CLIENT_SECRET must be set');
  const tok = await fetch(`https://login.microsoftonline.com/${t}/oauth2/v2.0/token`, {
    method: 'POST',
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: id, client_secret: secret, scope: 'https://graph.microsoft.com/.default' })
  }).then(r => r.json());
  if (!tok.access_token) throw new Error('token: ' + (tok.error_description || tok.error));
  const get = async (u) => {
    const r = await fetch(u, { headers: { Authorization: `Bearer ${tok.access_token}`, Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly' } });
    if (!r.ok) throw new Error(`${r.status} ${u.replace(GRAPH, '')}: ${(await r.text()).slice(0, 300)}`);
    return r.json();
  };
  const site = await get(`${GRAPH}/sites/${SITE_PATH}`);
  const items = [];
  let u = `${GRAPH}/sites/${site.id}/lists/${encodeURIComponent(LIST)}/items?expand=fields&$top=500`;
  while (u) { const p = await get(u); items.push(...p.value.map(i => i.fields)); u = p['@odata.nextLink']; }
  return items;
}

const blank = v => (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) ? null : (typeof v === 'string' ? v.trim() : v);

function toService(f) {
  const social = {};
  for (const [k, col] of [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn']]) if (blank(f[col])) social[k] = blank(f[col]);
  return {
    serviceName: blank(f.Title),
    organisation: blank(f.Organisation),
    category: blank(f.Category),
    categoryGroup: blank(f.CategoryGroup),
    serviceType: blank(f.ServiceType),
    contact: { phone: blank(f.Phone), email: blank(f.Email), website: blank(f.Website) },
    social,
    location: { suburb: blank(f.Suburb), lga: blank(f.CouncilArea), coverage: blank(f.Coverage) },
    identifiers: { abn: blank(f.ABN), acncLink: blank(f.CharityRegisterLink) },
    flags: { aod: !!f.AlcoholAndDrugs, legal: !!f.LegalSupport },
    listedIn: blank(f.ListedIn)
  };
}

const sydneyDate = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney' }).format(d);

function recount(list, keyOf, nameKey = 'name') {
  // Keep existing entries (and their descriptions) in order; refresh counts; append new values at the end.
  const counts = new Map();
  for (const k of keyOf) counts.set(k, (counts.get(k) || 0) + 1);
  const seen = new Set(list.map(x => x[nameKey]));
  const out = list.map(x => ({ ...x, count: counts.get(x[nameKey]) || 0 }));
  for (const [k, c] of counts) if (!seen.has(k)) out.push({ [nameKey]: k, count: c });
  return out;
}

async function main() {
  const raw = fromFile ? JSON.parse(await readFile(fromFile, 'utf8')) : await graphItems();
  const unapproved = raw.filter(f => f._ModerationStatus !== undefined && f._ModerationStatus !== 0);
  if (unapproved.length) throw new Error(`refusing to publish: ${unapproved.length} unapproved item(s) are visible to the sync app. Check the list's draft item security.`);
  const rows = raw.map(f => ({ order: Number.isFinite(f.SortOrder) ? f.SortOrder : Infinity, verified: f.LastVerified ? sydneyDate(new Date(f.LastVerified)) : null, s: toService(f) }))
    .filter(r => r.s.serviceName && r.s.categoryGroup && r.s.category && r.s.serviceType && r.s.location.coverage);
  rows.sort((a, b) => (a.order - b.order) || a.s.serviceName.localeCompare(b.s.serviceName));
  const services = rows.map(r => r.s);
  if (services.length < 50) throw new Error(`refusing to publish only ${services.length} services (expected about 300): check the list and the app's access`);

  const before = await readFile(FILE, 'utf8');
  const doc = JSON.parse(before);
  // Compare ignoring key order, and reuse the existing entry for every unchanged service so diffs show only real edits.
  const canon = o => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v)) ? Object.fromEntries(Object.entries(v).sort(([x], [y]) => x.localeCompare(y))) : v);
  const pool = new Map();
  for (const o of doc.services) { const c = canon(o); if (!pool.has(c)) pool.set(c, []); pool.get(c).push(o); }
  for (let i = 0; i < services.length; i++) { const hit = pool.get(canon(services[i])); if (hit && hit.length) services[i] = hit.shift(); }
  const servicesChanged = JSON.stringify(doc.services) !== JSON.stringify(services);

  // Category groups: keep the group order, refresh counts and the categories mapped into each group.
  doc.categoryGroups = doc.categoryGroups.map(g => {
    const mine = services.filter(s => s.categoryGroup === g.name);
    const extra = [...new Set(mine.map(s => s.category))].filter(c => !g.mappedCategories.includes(c)).sort((a, b) => a.localeCompare(b));
    return { ...g, mappedCategories: [...g.mappedCategories, ...extra], count: mine.length };
  });
  for (const name of new Set(services.map(s => s.categoryGroup))) if (!doc.categoryGroups.some(g => g.name === name)) {
    const mine = services.filter(s => s.categoryGroup === name);
    doc.categoryGroups.push({ name, mappedCategories: [...new Set(mine.map(s => s.category))].sort(), count: mine.length });
  }
  doc.coverageTiers = recount(doc.coverageTiers, services.map(s => s.location.coverage));
  doc.lgaTiers = recount(doc.lgaTiers, services.map(s => s.location.lga ?? '<empty>'));

  const latestVerified = rows.map(r => r.verified).filter(Boolean).sort().pop();
  doc.meta = { ...doc.meta, totalServices: services.length,
    lastVerified: [doc.meta.lastVerified, latestVerified].filter(Boolean).sort().pop() };
  if (servicesChanged) Object.assign(doc.meta, { generatedAt: sydneyDate(), source: 'Service directory list on the Oakdene staff intranet (SharePoint), synced automatically' });
  doc.services = services;

  const after = JSON.stringify(doc, null, 2);
  if (after === before) { console.log(`No change: ${services.length} services already match the list.`); return; }
  const changed = servicesChanged ? `${services.length} services` : 'counts only (services unchanged)';
  if (checkOnly) { console.log(`Would update: ${changed}.`); process.exitCode = 2; return; }
  await writeFile(FILE, after);
  console.log(`Updated ${FILE.pathname}: ${changed}.`);
}

main().catch(e => { console.error('Sync failed:', e.message); process.exit(1); });
