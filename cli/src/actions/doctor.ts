import chalk from 'chalk';
import { execSync } from 'child_process';

interface ToolCheck {
  name: string;
  command: string;
  required: boolean;
  versionFlag?: string;
  minVersion?: string;
}

interface CheckResult {
  name: string;
  found: boolean;
  version?: string;
  required: boolean;
  ok: boolean;
}

const TOOLS: ToolCheck[] = [
  { name: 'Node.js', command: 'node --version', required: true },
  { name: 'Git', command: 'git --version', required: true },
  { name: 'npm', command: 'npm --version', required: true },
  { name: 'TypeScript', command: 'npx tsc --version 2>/dev/null', required: false },
  { name: 'Java (JDK)', command: 'java -version 2>&1', required: false },
  { name: 'Maven', command: 'mvn --version 2>&1 | head -1', required: false },
  { name: 'Docker', command: 'docker --version 2>/dev/null', required: false },
  { name: 'Docker Compose', command: 'docker compose version 2>/dev/null', required: false },
  { name: 'Kubernetes (kubectl)', command: 'kubectl version --client 2>/dev/null', required: false },
  { name: 'Terraform', command: 'terraform --version 2>/dev/null | head -1', required: false },
  { name: 'AWS CLI', command: 'aws --version 2>&1', required: false },
  { name: 'Python 3', command: 'python3 --version 2>/dev/null || python --version 2>/dev/null', required: false },
  { name: 'Go', command: 'go version 2>/dev/null', required: false },
  { name: 'Rust (cargo)', command: 'cargo --version 2>/dev/null', required: false },
];

/**
 * `100x doctor` — Check development environment
 * `100x doctor <system>` — Check only tools needed for a specific system
 */
export async function doctorCommand(systemSlug?: string): Promise<void> {
  console.log(chalk.bold('\n  100xSystems — Environment Doctor\n'));

  let toolsToCheck = TOOLS;

  if (systemSlug) {
    toolsToCheck = filterToolsForSystem(systemSlug, TOOLS);
    console.log(`  ${chalk.dim('Checking tools for:')} ${chalk.bold(systemSlug)}\n`);
  } else {
    console.log(`  ${chalk.dim('Checking all available tools...')}\n`);
  }

  const results: CheckResult[] = [];

  for (const tool of toolsToCheck) {
    const result = checkTool(tool);
    results.push(result);
  }

  // Print results
  const requiredOk = results.filter((r) => r.required && r.ok).length;
  const requiredFail = results.filter((r) => r.required && !r.ok).length;
  const optionalFound = results.filter((r) => !r.required && r.ok).length;

  for (const result of results) {
    if (result.found) {
      console.log(`  ${chalk.green('✓')} ${result.name.padEnd(18)} ${chalk.dim(result.version || '')}`);
    } else if (result.required) {
      console.log(`  ${chalk.red('✗')} ${result.name.padEnd(18)} ${chalk.red('NOT FOUND (required)')}`);
    } else {
      console.log(`  ${chalk.dim('○')} ${result.name.padEnd(18)} ${chalk.dim('not found (optional)')}`);
    }
  }

  // Summary
  console.log();
  console.log(`  ${chalk.bold('─'.repeat(40))}`);
  console.log(`  ${chalk.bold('Summary:')}`);
  console.log(`  ${chalk.green(`${requiredOk} required tools OK`)}`);

  if (requiredFail > 0) {
    console.log(`  ${chalk.red(`${requiredFail} required tools MISSING`)}`);
    console.log();
    console.log(`  ${chalk.dim('Install missing tools:')}`);
    if (!results.find(r => r.name === 'Node.js' && !r.ok)) {
      console.log(`    ${chalk.cyan('https://nodejs.org/')}`);
    }
    if (!results.find(r => r.name === 'Git' && !r.ok)) {
      console.log(`    ${chalk.cyan('https://git-scm.com/')}`);
    }
  } else {
    console.log(`  ${chalk.green('Environment looks good!')}`);
  }

  console.log(`  ${chalk.dim(`${optionalFound} optional tools found`)}`);
  console.log();
}

function checkTool(tool: ToolCheck): CheckResult {
  try {
    const output = execSync(tool.command, {
      timeout: 10000,
      stdio: 'pipe',
      shell: true as any,
      cwd: process.cwd(),
      env: process.env as any,
    }).toString().trim();

    const version = output.split('\n')[0].trim();
    return { name: tool.name, found: true, version, required: tool.required, ok: true };
  } catch {
    return { name: tool.name, found: false, required: tool.required, ok: false };
  }
}

function filterToolsForSystem(systemSlug: string, allTools: ToolCheck[]): ToolCheck[] {
  // Map of system slugs to required tools
  const systemTools: Record<string, string[]> = {
    'claude-code': ['Node.js', 'Git', 'npm', 'TypeScript', 'Docker'],
    'microservices': ['Node.js', 'Git', 'npm', 'Docker', 'Docker Compose'],
    'event-driven': ['Node.js', 'Git', 'npm', 'Docker'],
    'kubernetes': ['Node.js', 'Git', 'npm', 'Docker', 'Kubernetes (kubectl)', 'Docker Compose'],
    'terraform': ['Node.js', 'Git', 'npm', 'Terraform'],
    'aws-infrastructure': ['Node.js', 'Git', 'npm', 'AWS CLI', 'Terraform'],
    'java-microservices': ['Node.js', 'Git', 'npm', 'Java (JDK)', 'Maven', 'Docker'],
    'go-service': ['Node.js', 'Git', 'npm', 'Go', 'Docker'],
    'rust-tool': ['Node.js', 'Git', 'npm', 'Rust (cargo)'],
  };

  const relevantNames = systemTools[systemSlug] || [];
  if (relevantNames.length === 0) {
    // If no specific mapping, include all tools
    return allTools;
  }

  return allTools.filter((tool) => relevantNames.includes(tool.name));
}
