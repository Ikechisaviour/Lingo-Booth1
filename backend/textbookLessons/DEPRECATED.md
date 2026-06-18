# DEPRECATED — Curriculum v1 (textbook track)

This directory is **frozen** as of 2026-06-01.

**Do not add new units or edit existing ones.**

All curriculum work has moved to [backend/curriculum/](../curriculum/) (Curriculum v2).

## Why

The unit/cluster naming here drifted (Level 2 has both `Unit*` and `AdultUnit*`; Level 3 uses `Cluster*`; `unit1.js` is orphaned). See [docs/curriculumV2/audit.md](../../docs/curriculumV2/audit.md).

## What stays here until v2 ships

- These files continue to power the class-lesson track in production via `rollbackClassCurriculumFromWorktree.js` and the language-prefixed `seedXxLevel*.js` scripts.
- Bug-fix-only edits allowed. Tag with `// v1-fix:` so the migration can flag them.

## Removal

These files will be deleted when v2 covers 100% of v1 for a given target language.
