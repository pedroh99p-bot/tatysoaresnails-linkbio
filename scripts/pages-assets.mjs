import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Cached HTML can still reference an earlier fingerprinted bundle after a deploy.
export function restoreBuildAssets(checkout) {
  const git = (...args) => execFileSync('git', args, { cwd: checkout, encoding: 'utf8' });
  const commits = git('log', '-10', '--format=%H', '--', 'assets').trim().split('\n').filter(Boolean);
  let restored = 0;
  for (const commit of commits) {
    const files = git('ls-tree', '-r', '--name-only', commit, '--', 'assets').trim().split('\n');
    for (const file of files) {
      if (!/^assets\/[\w-]+-[\w-]+\.(js|css)$/.test(file)) continue;
      const destination = join(checkout, file);
      if (existsSync(destination)) continue;
      mkdirSync(dirname(destination), { recursive: true });
      writeFileSync(destination, execFileSync('git', ['show', `${commit}:${file}`], { cwd: checkout }));
      restored += 1;
    }
  }
  return restored;
}
