---
title: 100xsystems update
description: Check whether a newer version of the CLI is available on npm
order: 41
category: system
---

# `100xsystems update` — Check for CLI Updates

Check whether a newer version of `@100xsystems/cli` is available on npm.

## Usage

```bash
100xsystems update
```

## Examples

```bash
# When up to date
$ 100xsystems update

  ✓ You're up to date!
  Version: 0.1.0

# When a new version is available
$ 100xsystems update

  ⟳ Update available!

  Current: 0.0.5
  Latest:  0.1.0

  npm update -g @100xsystems/cli → upgrade

# When offline
$ 100xsystems update

  Could not check for updates.
  Make sure you have internet access and npm is configured.
  Local version: 0.1.0
```

## Behavior

- Reads the **local version** from the installed package's `package.json`
- Queries the **npm registry** (`npm view @100xsystems/cli version`) for the latest version
- Compares versions and displays the result
- Shows the upgrade command if a newer version is available
- Gracefully handles network errors

## See Also

- [doctor](/cli-docs/doctor) — Check your environment
