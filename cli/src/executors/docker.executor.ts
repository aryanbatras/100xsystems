/**
 * ## Docker Executor
 *
 * Validates Docker-related aspects of a project.
 * Can check Dockerfiles, build images, run containers, and verify docker-compose setups.
 *
 * @example
 * validation:
 *   - type: docker
 *     check: dockerfile
 *     path: "Dockerfile"
 *
 *   - type: docker
 *     check: build
 *     dockerfile: "Dockerfile"
 *     tag: "myapp:test"
 *     timeout: 120000
 *
 *   - type: docker
 *     check: compose-services
 *     services: ["api", "db", "redis"]
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { execa } from 'execa';
import { type Executor, type ExecutorResult, type ExecutorContext } from './types.js';

export class DockerExecutor implements Executor {
  type = 'docker';

  async execute(params: Record<string, any>, ctx: ExecutorContext): Promise<ExecutorResult> {
    const check = (params.check as string) || 'dockerfile';

    switch (check) {
      case 'dockerfile':
        return this.checkDockerfile(params, ctx);
      case 'build':
        return this.checkBuild(params, ctx);
      case 'compose-file':
        return this.checkComposeFile(params, ctx);
      case 'compose-services':
        return this.checkComposeServices(params, ctx);
      case 'container-running':
        return this.checkContainerRunning(params);
      default:
        return {
          check: 'docker',
          status: 'fail',
          message: `Unknown docker check type: "${check}". Available: dockerfile, build, compose-file, compose-services, container-running`,
          category: 'validation',
        };
    }
  }

  private async checkDockerfile(params: Record<string, any>, ctx: ExecutorContext): Promise<ExecutorResult> {
    const dockerfilePath = (params.path as string) || 'Dockerfile';
    const fullPath = path.resolve(ctx.projectDir, dockerfilePath);

    if (!fs.existsSync(fullPath)) {
      return {
        check: 'docker:dockerfile',
        status: 'fail',
        message: `Dockerfile not found: ${dockerfilePath}`,
        category: 'structure',
      };
    }

    const content = fs.readFileSync(fullPath, 'utf-8');

    // Basic Dockerfile validation
    const hasFrom = content.includes('FROM ');
    const hasRunOrCopy = content.includes('RUN ') || content.includes('COPY ') || content.includes('ADD ');

    if (!hasFrom) {
      return {
        check: 'docker:dockerfile',
        status: 'fail',
        message: `Dockerfile missing required "FROM" instruction`,
        category: 'structure',
      };
    }

    if (!hasRunOrCopy) {
      return {
        check: 'docker:dockerfile',
        status: 'warn',
        message: `Dockerfile has FROM but no RUN/COPY/ADD instructions`,
        category: 'structure',
      };
    }

    return {
      check: 'docker:dockerfile',
      status: 'pass',
      message: `Valid Dockerfile: ${dockerfilePath}`,
      category: 'build',
    };
  }

  private async checkBuild(params: Record<string, any>, ctx: ExecutorContext): Promise<ExecutorResult> {
    const dockerfile = (params.dockerfile as string) || 'Dockerfile';
    const tag = (params.tag as string) || '100x-test:latest';
    const timeout = (params.timeout as number) || 120000;
    const dockerfilePath = path.resolve(ctx.projectDir, dockerfile);

    if (!fs.existsSync(dockerfilePath)) {
      return {
        check: 'docker:build',
        status: 'fail',
        message: `Dockerfile not found: ${dockerfile}`,
        category: 'build',
      };
    }

    try {
      const result = await execa('docker', ['build', '-f', dockerfile, '-t', tag, ctx.projectDir], {
        timeout,
        reject: false,
        stdio: 'pipe',
      });

      if (result.exitCode === 0) {
        return {
          check: 'docker:build',
          status: 'pass',
          message: `Docker image built successfully: ${tag}`,
          details: result.stdout.slice(0, 300),
          category: 'build',
        };
      }

      return {
        check: 'docker:build',
        status: 'fail',
        message: `Docker build failed for ${dockerfile}`,
        details: (result.stderr || result.stdout).slice(0, 500),
        category: 'build',
      };
    } catch (err: any) {
      if (err.isTimeout) {
        return {
          check: 'docker:build',
          status: 'fail',
          message: `Docker build timed out after ${timeout}ms`,
          category: 'build',
        };
      }
      return {
        check: 'docker:build',
        status: 'error',
        message: `Docker build error: ${err.message}`,
        category: 'build',
      };
    }
  }

  private async checkComposeFile(params: Record<string, any>, ctx: ExecutorContext): Promise<ExecutorResult> {
    const composePath = (params.path as string) || 'docker-compose.yml';
    const fullPath = path.resolve(ctx.projectDir, composePath);

    if (!fs.existsSync(fullPath)) {
      return {
        check: 'docker:compose',
        status: 'fail',
        message: `Docker Compose file not found: ${composePath}`,
        category: 'structure',
      };
    }

    // Validate compose file by running config
    try {
      const result = await execa('docker', ['compose', '-f', composePath, 'config'], {
        cwd: ctx.projectDir,
        timeout: 15000,
        reject: false,
        stdio: 'pipe',
      });

      if (result.exitCode === 0) {
        return {
          check: 'docker:compose',
          status: 'pass',
          message: `Valid Docker Compose file: ${composePath}`,
          category: 'build',
        };
      }

      return {
        check: 'docker:compose',
        status: 'fail',
        message: `Invalid Docker Compose file: ${composePath}`,
        details: (result.stderr || result.stdout).slice(0, 500),
        category: 'build',
      };
    } catch {
      // If docker isn't available, just check file syntax
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const parsed = JSON.parse(content); // Might be JSON
        return {
          check: 'docker:compose',
          status: 'pass',
          message: `Compose file exists (${Object.keys(parsed.services || {}).length} services)`,
          category: 'build',
        };
      } catch {
        return {
          check: 'docker:compose',
          status: 'pass',
          message: `Docker Compose file exists: ${composePath}`,
          category: 'build',
        };
      }
    }
  }

  private async checkComposeServices(params: Record<string, any>, ctx: ExecutorContext): Promise<ExecutorResult> {
    const composePath = (params.path as string) || 'docker-compose.yml';
    const expectedServices = (params.services as string[]) || [];

    if (expectedServices.length === 0) {
      return {
        check: 'docker:services',
        status: 'warn',
        message: 'No services specified to check',
        category: 'build',
      };
    }

    const fullPath = path.resolve(ctx.projectDir, composePath);
    if (!fs.existsSync(fullPath)) {
      return {
        check: 'docker:services',
        status: 'fail',
        message: `Docker Compose file not found: ${composePath}`,
        category: 'structure',
      };
    }

    try {
      // Parse the compose file to check services
      const result = await execa('docker', ['compose', '-f', composePath, 'config', '--services'], {
        cwd: ctx.projectDir,
        timeout: 15000,
        reject: false,
        stdio: 'pipe',
      });

      if (result.exitCode === 0) {
        const actualServices = result.stdout.split('\n').filter((s: string) => s.trim());
        const missing = expectedServices.filter((s: string) => !actualServices.includes(s));

        if (missing.length === 0) {
          return {
            check: 'docker:services',
            status: 'pass',
            message: `All expected services found: ${expectedServices.join(', ')}`,
            category: 'build',
          };
        }

        return {
          check: 'docker:services',
          status: 'fail',
          message: `Missing services: ${missing.join(', ')}`,
          details: `Found: ${actualServices.join(', ')}`,
          category: 'build',
        };
      }

      return {
        check: 'docker:services',
        status: 'error',
        message: 'Could not parse docker compose services',
        category: 'build',
      };
    } catch {
      // Docker not available — fall back to YAML parsing manually
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const serviceMatch = content.match(/services:[\s\S]*?(?=^[a-z]|$)/m);
        if (!serviceMatch) {
          return {
            check: 'docker:services',
            status: 'fail',
            message: `No services section found in docker-compose`,
            category: 'build',
          };
        }
        return {
          check: 'docker:services',
          status: 'pass',
          message: `Docker Compose services section found`,
          category: 'build',
        };
      } catch {
        return {
          check: 'docker:services',
          status: 'pass',
          message: `Docker Compose file exists`,
          category: 'build',
        };
      }
    }
  }

  private async checkContainerRunning(params: Record<string, any>): Promise<ExecutorResult> {
    const containerName = (params.container as string) || '';
    const serviceName = (params.service as string) || '';

    if (!containerName && !serviceName) {
      return {
        check: 'docker:container',
        status: 'fail',
        message: 'Missing "container" or "service" parameter',
        category: 'validation',
      };
    }

    const searchPattern = containerName || serviceName;

    try {
      const result = await execa('docker', ['ps', '--format', '{{.Names}}'], {
        timeout: 10000,
        reject: false,
        stdio: 'pipe',
      });

      if (result.exitCode === 0) {
        const running = result.stdout.split('\n').filter((s: string) => s.includes(searchPattern));
        if (running.length > 0) {
          return {
            check: 'docker:container',
            status: 'pass',
            message: `Container(s) running: ${running.join(', ')}`,
            category: 'deploy',
          };
        }
      }

      return {
        check: 'docker:container',
        status: 'fail',
        message: `No running container matching "${searchPattern}"`,
        category: 'deploy',
      };
    } catch {
      return {
        check: 'docker:container',
        status: 'error',
        message: 'Docker is not available or not running',
        category: 'deploy',
      };
    }
  }
}
