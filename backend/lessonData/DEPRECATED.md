# DEPRECATED — Curriculum v1

This directory is **frozen** as of 2026-06-01.

**Do not add new lessons or edit existing data files here.**

All curriculum work has moved to [backend/curriculum/](../curriculum/) (Curriculum v2).

## Why

v1 is a vocabulary-list shape. It does not support pattern drills, cloze production, comprehensible-input stories, contrastive notes, or interleaved sessions. See [docs/curriculumV2/audit.md](../../docs/curriculumV2/audit.md) for the diagnosis.

## What stays here until v2 ships

- The 20 `<lang>.js` files continue to power production seeders for users not yet migrated to v2.
- Bug-fix-only edits (e.g., a wrong translation flagged by a user) are allowed. Tag them with `// v1-fix:` comments so the migration can flag them.
- No structural changes, no new categories, no new languages.

## Removal

These files will be deleted when v2 covers 100% of v1 for a given target language. See [docs/curriculumV2/audit.md](../../docs/curriculumV2/audit.md).
