import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
// This fixed destination is always inside this checkout; never accept a CLI deletion path.
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'images'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'assets']) {
  await cp(path.join(root, file), path.join(dist, file), { recursive: true });
}
await cp(path.join(root, 'images', 'Aleks.jpg'), path.join(dist, 'images', 'Aleks.jpg'));
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
// A fresh HTML document must never combine new controls with a cached stylesheet
// or script from a previous deployment. Hash the actual copied asset bytes.
for (const asset of ['styles.css', 'script.js']) {
  const content = await readFile(path.join(dist, asset));
  const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const attribute = asset.endsWith('.css') ? 'href' : 'src';
  const reference = new RegExp(`${attribute}="${asset.replace('.', '\\.')}[^"\\s]*"`, 'g');
  if (!reference.test(html)) throw new Error(`Missing build asset reference: ${asset}`);
  html = html.replace(reference, `${attribute}="${asset}?v=${version}"`);
}
await writeFile(path.join(dist, 'index.html'), html);
if (!html.includes('Aleksandar Kamenev') || !html.includes('id="contact"')) throw new Error('Portfolio build is incomplete');
console.log('Portfolio built in dist/ (no runtime dependencies).');
