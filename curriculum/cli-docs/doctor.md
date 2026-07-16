---
title: 100xsystems doctor
description: Check whether required and optional development tools are installed
order: 40
category: system
---

# `100xsystems doctor` — Check Development Environment

Check whether required and optional development tools are installed on your system.

## Usage

```bash
# Check all tools
100xsystems doctor

# Check tools relevant to a specific system
100xsystems doctor <system-slug>
```

## Examples

### Full check

```bash
$ 100xsystems doctor

  100xSystems — Environment Doctor
  Checking all available tools...

  ✓ Node.js           v22.0.0
  ✓ Git               git version 2.39.3
  ✓ npm               10.0.0
  ✓ TypeScript        Version 5.5.0
  ✗ Java (JDK)        NOT FOUND (required)
  ✗ Maven             NOT FOUND (optional)
  ✓ Docker            Docker version 24.0.6
  ○ Kubernetes (kubectl)  not found (optional)
  ○ Terraform         not found (optional)
  ✓ Python 3          Python 3.12.0
  ✓ Go                go version go1.21.5
  ○ Rust (cargo)      not found (optional)

  ─────────────────────────────────────
  Summary:
  7 required tools OK
  0 required tools MISSING
  3 optional tools found
  Environment looks good!
```

### System-specific check

```bash
$ 100xsystems doctor microservices

  100xSystems — Environment Doctor
  Checking tools for: microservices

  ✓ Node.js           v22.0.0
  ✓ Git               git version 2.39.3
  ✓ npm               10.0.0
  ✓ Docker            Docker version 24.0.6
  ✗ Docker Compose    NOT FOUND (optional)
  ✓ Kubernetes (kubectl)  Version 1.28.0
```

## Tools Checked

| Tool | Required | Systems Needing It |
|------|:--------:|--------------------|
| Node.js | Yes | All systems |
| Git | Yes | All systems |
| npm | Yes | All systems |
| TypeScript | No | claude-code |
| Java (JDK) | No | java-microservices |
| Maven | No | java-microservices |
| Docker | No | claude-code, microservices, kubernetes |
| Docker Compose | No | microservices, kubernetes |
| Kubernetes (kubectl) | No | kubernetes |
| Terraform | No | terraform |
| AWS CLI | No | aws-infrastructure |
| Python 3 | No | General |
| Go | No | go-service |
| Rust (cargo) | No | rust-tool |

## See Also

- [init](/cli-docs/init) — Scaffold a project (checks tools)
- [list](/cli-docs/list) — Browse systems with tool requirements
