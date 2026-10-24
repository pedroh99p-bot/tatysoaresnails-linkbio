import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { render } from '../.prerender/entry-static.js';

const file = new URL('../dist/index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Ponto de renderização inicial não encontrado.');
writeFileSync(file, html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
rmSync(new URL('../.prerender', import.meta.url), { recursive: true, force: true });
