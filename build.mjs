import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
// This fixed destination is always inside this checkout; never accept a CLI deletion path.
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'images'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'assets', 'work']) {
  await cp(path.join(root, file), path.join(dist, file), { recursive: true });
}
await cp(path.join(root, 'images', 'Aleks.jpg'), path.join(dist, 'images', 'Aleks.jpg'));
async function htmlPages(directory) {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await htmlPages(target));
    else if (entry.isFile() && entry.name.endsWith('.html')) pages.push(target);
  }
  return pages;
}
// A fresh HTML document must never combine new controls with a cached stylesheet
// or script from a previous deployment. Hash the actual copied asset bytes.
for (const page of await htmlPages(dist)) {
  let html = await readFile(page, 'utf8');
  const base = new URL(path.relative(dist, page).split(path.sep).join('/'), 'https://portfolio.invalid/');
  for (const match of html.matchAll(/(href|src)="([^"]+)"/g)) {
    const [, attribute, reference] = match;
    const resolved = new URL(reference, base);
    if (resolved.origin !== base.origin || !/\.(css|js)$/.test(resolved.pathname)) continue;
    const target = path.resolve(dist, '.' + decodeURIComponent(resolved.pathname));
    const relative = path.relative(dist, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Asset escapes build directory');
    const content = await readFile(target);
    const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const [assetAndQuery, fragment] = reference.split('#', 2);
    const asset = assetAndQuery.split('?', 1)[0];
    html = html.replace(match[0], `${attribute}="${asset}?v=${version}${fragment ? '#' + fragment : ''}"`);
  }
  await writeFile(page, html);
}
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!html.includes('Aleksandar Kamenev') || !html.includes('id="contact"')) throw new Error('Portfolio build is incomplete');
console.log('Portfolio built in dist/ (no runtime dependencies).');
