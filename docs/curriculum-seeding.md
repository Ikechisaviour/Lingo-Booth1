# Curriculum Seeding

Use the target-curriculum sync scripts when publishing authored class lessons to a database.

## Why this exists

Repeated seeding should be safe:

- unchanged lessons remain unchanged
- edited lessons update in place
- new lessons insert once
- removed source lessons are reported as stale first, not silently deleted

Every managed lesson receives:

- `curriculumKey` for stable identity
- `curriculumSourceHash` for source comparison
- `curriculumStatus` so stale lessons can be archived instead of destroyed

The loader supports both curriculum shapes used in this repo:

- modern folders with `textbookLessons/<lang>/curriculum.js`
- legacy Korean, Chinese, and English layouts made of individual `level*.js` files

## Safe workflow

Preview what would happen:

```bash
cd backend
npm run curriculum:seed-target -- es --dry-run
```

Refresh one target curriculum safely:

```bash
cd backend
npm run curriculum:seed-target -- es
```

Verify the active database matches the local authored source:

```bash
cd backend
npm run curriculum:verify-target -- es
```

Review lessons that exist in the database but no longer exist in the source:

```bash
cd backend
npm run curriculum:seed-target -- es --sync --dry-run
```

Archive stale lessons only after review:

```bash
cd backend
npm run curriculum:seed-target -- es --sync --archive-stale
```

## What happens on repeated reseeds

If the curriculum in the database already matches the local source, another run should report:

- `Inserted: none`
- `Updated: none`
- every source lesson under `Unchanged`
- `Stale active lessons: none`

That is the healthy idempotent case. A repeated run should not create duplicates or rewrite unchanged lessons.

## Important rules

- Do not use destructive deletes for normal curriculum publishing.
- Use `--sync --dry-run` before any stale cleanup.
- Use `--archive-stale` only when the source removal is intentional.
- After seeding, run `curriculum:verify-target` for the same target language.
- Existing learner progress remains attached to lesson `_id` values because changed lessons are replaced in place rather than duplicated.
