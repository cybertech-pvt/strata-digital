#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const reportPath = path.join(root, 'scripts', 'cleanup-js-report.txt');

const markdownFiles = [
  'ADMIN_LOGIN_SETUP.md',
  'ADMIN_SETUP.md',
  'COMPLETE_SETUP_GUIDE.md',
  'DEBUGGING_BLANK_PAGE.md',
  'PROJECT_DELIVERY_SUMMARY.md',
  'STATUS_REPORT.md',
];

const sqlFileName = 'SETUP_ADMIN_USER.sql';
const backupPrefix = 'strata-digital-1-clean'; // match files starting with this in project root

const protectedPaths = new Set([
  path.join(root, 'vite.config.ts'),
  path.join(root, 'tailwind.config.ts'),
  path.join(root, 'package.json'),
  path.join(root, '.env'),
]);

function usage() {
  console.log('Usage: node scripts/cleanup.js [--dry-run] [--yes] [--report]');
  console.log('--dry-run   : default — only list what would be deleted');
  console.log('--yes       : actually perform deletions');
  console.log('--report    : also print the generated report to console');
}

async function writeReport(lines) {
  try {
    await fs.mkdir(path.join(root, 'scripts'), { recursive: true });
    await fs.writeFile(reportPath, lines.join('\n') + '\n', 'utf8');
  } catch (err) {
    console.error('Failed to write report:', err.message);
  }
}

async function findFilesRecursive(dir, name) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip node_modules, .git
      if (e.name === 'node_modules' || e.name === '.git') continue;
      results.push(...await findFilesRecursive(full, name));
    } else {
      if (e.name === name) results.push(full);
    }
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const doDelete = args.includes('--yes');
  const dryRun = !doDelete;
  const showReport = args.includes('--report');

  if (args.includes('--help') || args.includes('-h')) {
    usage();
    return;
  }

  const reportLines = [];
  reportLines.push(`Cleanup run at ${new Date().toISOString()}`);
  reportLines.push(`Mode: ${dryRun ? 'DRY-RUN (no deletions)' : 'DELETE (performing deletions)'}\n`);

  // 1) Markdown files at project root
  reportLines.push('Markdown files checked:');
  for (const m of markdownFiles) {
    const p = path.join(root, m);
    try {
      await fs.access(p);
      reportLines.push(`- FOUND: ${p}`);
      if (!protectedPaths.has(p)) {
        if (dryRun) reportLines.push(`  (would delete)`);
        else {
          await fs.unlink(p);
          reportLines.push(`  (deleted)`);
        }
      } else {
        reportLines.push('  (protected — SKIPPED)');
      }
    } catch (err) {
      reportLines.push(`- missing: ${p}`);
    }
  }

  // 2) SQL file occurrences (delete unless inside supabase folder)
  reportLines.push('\nSQL files checked:');
  const sqlMatches = await findFilesRecursive(root, sqlFileName);
  if (sqlMatches.length === 0) {
    reportLines.push(`- No occurrences of ${sqlFileName} found`);
  } else {
    for (const p of sqlMatches) {
      const normalized = path.normalize(p);
      const inSupabase = normalized.split(path.sep).includes('supabase') || normalized.includes(path.join('supabase', ''));
      if (inSupabase) {
        reportLines.push(`- KEEP (inside supabase): ${p}`);
        continue;
      }
      if (protectedPaths.has(p)) {
        reportLines.push(`- PROTECTED: ${p}`);
        continue;
      }
      reportLines.push(`- FOUND (to delete): ${p}`);
      if (!dryRun) {
        try {
          await fs.unlink(p);
          reportLines.push('  (deleted)');
        } catch (err) {
          reportLines.push(`  (failed to delete: ${err.message})`);
        }
      } else {
        reportLines.push('  (would delete)');
      }
    }
  }

  // 3) Backup files at project root starting with backupPrefix
  reportLines.push('\nBackup files checked (project root):');
  try {
    const rootEntries = await fs.readdir(root, { withFileTypes: true });
    const backups = rootEntries.filter(e => e.isFile() && e.name.startsWith(backupPrefix)).map(e => path.join(root, e.name));
    if (backups.length === 0) {
      reportLines.push('- No backup files found at project root');
    } else {
      for (const b of backups) {
        reportLines.push(`- FOUND: ${b}`);
        if (!dryRun) {
          try { await fs.unlink(b); reportLines.push('  (deleted)'); } catch (err) { reportLines.push(`  (failed to delete: ${err.message})`); }
        } else {
          reportLines.push('  (would delete)');
        }
      }
    }
  } catch (err) {
    reportLines.push(`- Failed to scan root for backups: ${err.message}`);
  }

  // Safety checks: ensure src and public weren't touched
  reportLines.push('\nSafety check: src/public presence (no deletion attempted)');
  try {
    const srcExists = (await fs.stat(path.join(root, 'src')).catch(()=>null)) !== null;
    const publicExists = (await fs.stat(path.join(root, 'public')).catch(()=>null)) !== null;
    reportLines.push(`- src exists: ${srcExists}`);
    reportLines.push(`- public exists: ${publicExists}`);
  } catch (err) {
    reportLines.push(`- Safety check error: ${err.message}`);
  }

  await writeReport(reportLines);

  console.log('Report written to', reportPath);
  if (showReport) console.log(reportLines.join('\n'));
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
