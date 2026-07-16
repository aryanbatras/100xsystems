---
title: 100xsystems auth
description: Check whether you're authenticated with GitHub and view your current session
order: 32
category: auth
---

# `100xsystems auth` — Check Authentication Status

Check whether you're authenticated with GitHub and view your current session details.

## Usage

```bash
# Show auth status
100xsystems auth
```

## Examples

```bash
# Check if authenticated
$ 100xsystems auth

  Authenticated as: Aryan (aryan)

# When not authenticated
$ 100xsystems auth

  Not authenticated.
  Run 100xsystems login to authenticate.
```

## See Also

- [login](/cli-docs/login) — Authenticate with GitHub
- [logout](/cli-docs/logout) — Clear authentication
