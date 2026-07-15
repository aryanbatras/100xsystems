import chalk from 'chalk';
import { systemExists, getSystemMeta } from '../reader/system-reader.js';
import { getSystemResources, getSystemsWithResources } from '../reader/resource-reader.js';

/**
 * `100x resources` — List all systems with resources
 * `100x resources <system>` — List curated resources for a specific system
 */
export async function resourcesCommand(systemSlug?: string): Promise<void> {
  if (systemSlug) {
    await showSystemResources(systemSlug);
  } else {
    await showAllResourceSystems();
  }
}

async function showSystemResources(slug: string): Promise<void> {
  if (!systemExists(slug)) {
    console.log(chalk.red(`\n  System "${slug}" not found.`));
    console.log(chalk.dim('  Run `100x list` to see all available systems.'));
    return;
  }

  const system = getSystemMeta(slug);
  const resources = getSystemResources(slug);

  if (!resources || resources.categories.length === 0) {
    console.log(chalk.yellow(`\n  No curated resources yet for "${system?.title || slug}".`));
    console.log(chalk.dim('  Resources should be added to curriculum/systems/[slug]/resources/.'));
    return;
  }

  console.log(chalk.bold(`\n  100xSystems — ${system?.title || slug} Resources\n`));

  for (const category of resources.categories) {
    console.log(`  ${chalk.bold(category.name)}`);

    for (const item of category.items) {
      const typeIcon = getTypeIcon(item.type);
      console.log(`    ${typeIcon} ${chalk.cyan(item.title)}`);
      console.log(`        ${chalk.dim(item.url)}`);
      if (item.description) {
        console.log(`        ${chalk.dim(item.description)}`);
      }
      console.log();
    }
  }
}

async function showAllResourceSystems(): Promise<void> {
  const systems = getSystemsWithResources();

  if (systems.length === 0) {
    console.log(chalk.yellow('\n  No resources found for any system yet.'));
    console.log(chalk.dim('  Resources should be added to curriculum/systems/[slug]/resources/.'));
    return;
  }

  console.log(chalk.bold('\n  100xSystems — Systems with Curated Resources\n'));

  for (const slug of systems) {
    const system = getSystemMeta(slug);
    const resources = getSystemResources(slug);
    const resourceCount = resources?.categories.reduce((sum, c) => sum + c.items.length, 0) || 0;

    console.log(`  ${chalk.bold(system?.title || slug)}`);
    console.log(`  ${chalk.dim(`${resourceCount} resources in ${resources?.categories.length || 0} categories`)}`);
    console.log(`  ${chalk.cyan(`100x resources ${slug}`)}  ${chalk.dim('→ view resources')}`);
    console.log();
  }
}

function getTypeIcon(type: string): string {
  switch (type) {
    case 'paper': return '📄';
    case 'video': return '🎬';
    case 'blog': return '📝';
    case 'documentation': return '📚';
    case 'tool': return '🔧';
    default: return '🔗';
  }
}
