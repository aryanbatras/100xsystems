# Community Submissions

This directory stores review packages from community implementations of 100xSystems courses.

Each submission is a **review package** — not the code itself, but the documentation and design artifacts that describe the implementation.

## Structure

```
submissions/
  README.md                         ← This file
  submissions.json                  ← Index of all submissions
  [system-name]/
    [author-language-timestamp]/
      README.md                     ← Project overview
      metadata.json                 ← Submission metadata
      design/
        decisions.md                ← Engineering Decision Log
        architecture.md             ← Architecture explanation
        tradeoffs.md                 ← Trade-offs analysis
      verification/
        checklist.md                ← Self-assessment checklist
      specification/
        SPECIFICATION.md            ← System specification (from curriculum)
```

## What Belongs Here

- **Review packages only** — documentation, decisions, architecture explanations
- **Not code** — the actual implementation stays in the author's repository
- **Not curriculum content** — that belongs in `curriculum/`

## How Submissions Work

1. User builds a system implementation in their own repository
2. User runs `100x submit <system>` from the CLI
3. CLI validates documentation completeness
4. CLI creates a review package in this directory
5. A Pull Request is created against this repository
6. Reviewers review the documentation and linked code
7. If accepted, the PR is merged

## Review Criteria

Reviewers evaluate:
- Engineering Decision Log completeness
- Architecture clarity
- Trade-off awareness
- Code quality (via linked repository)
- Self-assessment honesty

## Certificate

When a submission PR is merged, a certificate is generated via GitHub Actions,
verifying that the implementation has passed community review.
