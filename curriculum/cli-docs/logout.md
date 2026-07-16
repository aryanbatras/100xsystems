---
title: 100xsystems logout
description: Clear your cached GitHub authentication token
order: 31
category: auth
---

# `100xsystems logout` — Clear Authentication

Clear your cached GitHub authentication token.

## Usage

```bash
100xsystems logout
```

## Example

```bash
$ 100xsystems logout

  Authentication cleared.
  Run 100xsystems login to authenticate again.
```

## Behavior

- Removes the cached token from `~/.100x/auth.json`
- Does **not** revoke the GitHub OAuth token (manage that in GitHub settings)
- All authenticated commands (`submit`) will prompt for login again

## See Also

- [login](/cli-docs/login) — Authenticate with GitHub
- [auth](/cli-docs/auth) — Check auth status
