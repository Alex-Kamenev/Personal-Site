import { cp, mkdir, readFile, rm } from 'node:fs/promises';
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
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!html.includes('Aleksandar Kamenev') || !html.includes('id="contact"')) throw new Error('Portfolio build is incomplete');
console.log('Portfolio built in dist/ (no runtime dependencies).');
