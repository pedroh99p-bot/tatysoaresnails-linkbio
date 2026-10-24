// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { restoreBuildAssets } from './pages-assets.mjs';

it('restores bundles referenced by cached HTML across deployments without reviving unrelated files', () => {
  const checkout = mkdtempSync(join(tmpdir(), 'taty-cache-test-'));
  const git = (...args) => execFileSync('git', args, { cwd: checkout, stdio: 'pipe' });
  try {
    git('init');
    git('config', 'user.name', 'Deployment test');
    git('config', 'user.email', 'test@example.invalid');
    mkdirSync(join(checkout, 'assets'));
    writeFileSync(join(checkout, 'assets/index-old.js'), 'old JavaScript');
    writeFileSync(join(checkout, 'assets/index-old.css'), 'old CSS');
    writeFileSync(join(checkout, 'assets/private.txt'), 'do not restore');
    git('add', '.');
    git('commit', '-m', 'previous build');
    git('rm', '-r', 'assets');
    mkdirSync(join(checkout, 'assets'));
    writeFileSync(join(checkout, 'assets/index-new.js'), 'new JavaScript');
    git('add', '.');
    git('commit', '-m', 'current build');
    git('rm', '-r', 'assets');

    expect(restoreBuildAssets(checkout)).toBe(3);
    expect(readFileSync(join(checkout, 'assets/index-old.js'), 'utf8')).toBe('old JavaScript');
    expect(readFileSync(join(checkout, 'assets/index-old.css'), 'utf8')).toBe('old CSS');
    expect(readFileSync(join(checkout, 'assets/index-new.js'), 'utf8')).toBe('new JavaScript');
    expect(existsSync(join(checkout, 'assets/private.txt'))).toBe(false);
    expect(restoreBuildAssets(checkout)).toBe(0);
  } finally {
    rmSync(checkout, { recursive: true, force: true });
  }
});
