import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { restoreBuildAssets } from './pages-assets.mjs';

const root = process.cwd();
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const origin = git('remote', 'get-url', 'origin');
const revision = git('rev-parse', '--short', 'HEAD');
const name = git('config', 'user.name');
const email = git('config', 'user.email');
if (!process.env.npm_execpath) throw new Error('Execute com npm run deploy.');
for (const task of ['lint', 'typecheck', 'test', 'build']) {
  execFileSync(process.execPath, [process.env.npm_execpath, 'run', task], { cwd: root, stdio: 'inherit' });
}
const staging = mkdtempSync(join(tmpdir(), 'taty-pages-'));
const stageGit = (...args) => execFileSync('git', args, { cwd: staging, stdio: 'inherit' });
try {
  stageGit('init', '--initial-branch=gh-pages');
  stageGit('config', 'user.name', name);
  stageGit('config', 'user.email', email);
  stageGit('remote', 'add', 'origin', origin);
  const lookup = spawnSync('git', ['ls-remote', '--exit-code', origin, 'refs/heads/gh-pages'], { encoding: 'utf8' });
  if (lookup.status === 0) {
    stageGit('fetch', '--depth=10', 'origin', 'gh-pages');
    stageGit('checkout', '-B', 'gh-pages', 'FETCH_HEAD');
    stageGit('rm', '-r', '--ignore-unmatch', '.');
    restoreBuildAssets(staging);
  } else if (lookup.status !== 2) {
    throw new Error('Não foi possível verificar gh-pages. Verifique a conexão e a autenticação Git.');
  }
  cpSync(join(root, 'dist'), staging, { recursive: true });
  writeFileSync(join(staging, '.nojekyll'), '');
  stageGit('add', '.');
  const diff = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: staging });
  if (diff.status === 1) {
    stageGit('commit', '-m', `Deploy site from ${revision}`);
    stageGit('push', 'origin', 'HEAD:gh-pages');
    console.log('Build enviado para gh-pages. Acompanhe a publicação no GitHub Pages.');
  } else if (diff.status === 0) {
    console.log('A versão publicada já corresponde a este build.');
  } else {
    throw new Error('Falha ao comparar o build antes da publicação.');
  }
} finally {
  rmSync(staging, { recursive: true, force: true });
}
