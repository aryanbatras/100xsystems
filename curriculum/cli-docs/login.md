---
title: 100xsystems login
description: Authenticate with GitHub via PKCE OAuth flow
auth_required: true
order: 30
category: auth
---

# `100xsystems login` — Authenticate with GitHub

Authenticate with GitHub via PKCE OAuth flow. Required for `100xsystems submit`.

## Usage

```bash
# Authenticate (will prompt browser)
100xsystems login

# Force re-authentication
100xsystems login --force
100xsystems login -f
```

## Examples

```bash
# First-time login
$ 100xsystems login

  GitHub Authentication

  A browser window will open to authorize 100xSystems.
  If it doesn't open automatically, follow the URL shown above.

  ✓ Authenticated successfully as Aryan (aryan)

# Check current session
$ 100xsystems login

  Authenticated as: Aryan (aryan)
  Use 100xsystems login --force to re-authenticate.

# Force re-authentication
$ 100xsystems login --force
```

## Authentication Flow

1. CLI opens a **local HTTP server** on `http://localhost:14420`
2. Opens your **default browser** to GitHub's OAuth authorize page
3. GitHub redirects back to the local server with an **authorization code**
4. CLI exchanges the code for an **access token** using PKCE
5. Token is cached locally in `~/.100x/auth.json`
6. Local server shuts down

## Token Storage

- **Location:** `~/.100x/auth.json`
- **Contents:** GitHub access token, user info (login, name, avatar URL)
- **Security:** File permissions set to owner-only read/write
- **Duration:** Token remains valid until revoked via GitHub settings

## See Also

- [auth](/cli-docs/auth) — Check auth status
- [logout](/cli-docs/logout) — Clear authentication
- [submit](/cli-docs/submit) — Submit for review
