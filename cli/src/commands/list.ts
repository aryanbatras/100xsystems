import chalk from 'chalk';
import { getAllSystems, getSystemMeta, getSystemFolderTags } from '../reader/system-reader.js';

/**
 * `100x list` — List all available systems
 * `100x list <system>` — List sections of a specific system
 */
export async function listCommand(systemSlug?: string): Promise<void> {
  if (systemSlug) {
    await listSystemDetail(systemSlug);
  } else {
    await listAllSystems();
  }
}

async function listAllSystems(): Promise<void> {
  const systems = getAllSystems();

  if (systems.length === 0) {
    console.log(chalk.yellow('No systems found in curriculum.'));
    console.log(chalk.dim('  Ensure the curriculum/ directory exists with system folders.'));
    return;
  }

  console.log(chalk.bold('\n  100xSystems — Available Systems\n'));

  for (const sys of systems) {
    const difficultyColor = sys.difficulty === 'Advanced' ? 'red' :
      sys.difficulty === 'Intermediate' ? 'yellow' : 'green';
    
    console.log(`  ${chalk.bold(sys.title)}`);
    console.log(`  ${chalk.dim(sys.description)}`);
    console.log(`  ${chalk[difficultyColor as 'red' | 'yellow' | 'green'](sys.difficulty)}` +
      (sys.tags.length > 0 ? `  ${chalk.dim(sys.tags.join(' · '))}` : ''));
    console.log(`  ${chalk.cyan(`100x list ${sys.slug}`)}  ${chalk.dim('→ see sections')}`);
    console.log(`  ${chalk.cyan(`100x init ${sys.slug}`)}  ${chalk.dim('→ start building')}`);
    console.log();
  }
}

async function listSystemDetail(slug: string): Promise<void> {
  const system = getSystemMeta(slug);
  if (!system) {
    console.log(chalk.red(`\n  System "${slug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  console.log(chalk.bold(`\n  ${system.title}\n`));
  console.log(`  ${chalk.dim(system.description)}`);
  if (system.tags.length > 0) {
    console.log(`  ${chalk.dim(system.tags.join(' · '))}`);
  }
  console.log();

  const folderTags = getSystemFolderTags(slug);

  if (folderTags.length === 0) {
    console.log(chalk.yellow('  No sections found for this system.'));
    return;
  }

  for (const tag of folderTags) {
    console.log(`  ${chalk.bold(tag.displayName)}  ${chalk.dim(`(${tag.children.length} items)`)}`);

    // Show sub-items
    for (const child of tag.children) {
      const icon = child.type === 'folder' ? '📁' : '📄';
      console.log(`    ${icon} ${child.title}`);
    }

    // Show available commands for this section
    if (tag.tag === 'quizzes') {
      console.log(`    ${chalk.cyan(`100x quiz ${slug}`)}  ${chalk.dim('→ take quizzes')}`);
    } else if (tag.tag === 'challenges') {
      console.log(`    ${chalk.cyan(`100x challenge ${slug}`)}  ${chalk.dim('→ start a challenge')}`);
    } else if (tag.tag === 'specification') {
      console.log(`    ${chalk.cyan(`100x verify`)}  ${chalk.dim('→ verify your implementation')}`);
    } else if (tag.tag === 'implementation') {
      console.log(`    ${chalk.cyan(`100x init ${slug} --lang <language>`)}  ${chalk.dim('→ scaffold project')}`);
    }
    console.log();
  }
}
