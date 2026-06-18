# Curriculum v2

Multi-modal language-learning curriculum. Supports pattern drills, cloze production, comprehensible-input stories, contrastive notes, SRS vocab, pronunciation, and minimal-pair listening — sequenced by a session planner that interleaves lesson types.

**Status:** Phase 1-2 in progress. See [docs/curriculumV2/audit.md](../../docs/curriculumV2/audit.md) for the prior-state audit and [../../docs/curriculumV2/plan.md](../../docs/curriculumV2/plan.md) (forthcoming) for the full roll-out plan.

## Directory layout

```
backend/curriculum/
  schema/         # discriminated-union schema for all lesson types + cross-cutting types
  lessons/        # the actual lesson data, one file per pattern/story/etc.
  seeders/        # scripts that load lessons into MongoDB
  validator/      # structural validator (replaces all backend/scripts/audit*.js)
  __tests__/      # unit tests, especially for the session planner
```

## Lesson types

A lesson is a discriminated union on `lessonType`:

| `lessonType`           | Purpose                                                     |
|------------------------|-------------------------------------------------------------|
| `PatternLesson`        | Grammar pattern with anchors + drill slots + production task |
| `ClozeLesson`          | Sentence with a blank, scaffolded production                 |
| `StoryLesson`          | Graded reader / dialogue with glosses (comprehensible input) |
| `ContrastNote`         | Korean-vs-English explainer attached to a pattern            |
| `VocabDeck`            | SRS-scheduled cards (wires into existing Flashcard model)    |
| `PronunciationTask`    | Audio target + production prompt                             |
| `MinimalPairTask`      | Listening discrimination (e.g. ㄱ/ㅋ/ㄲ)                       |

See [schema/lessonTypes.js](schema/lessonTypes.js) for full field definitions.

## Cross-cutting types

| Type           | File                              |
|----------------|-----------------------------------|
| `Concept`      | [schema/concepts.js](schema/concepts.js)         |
| `SlotCategory` | [schema/slotCategories.js](schema/slotCategories.js) |
| `Register`     | [schema/register.js](schema/register.js)         |
| `Function`     | [schema/functions.js](schema/functions.js)       |

## Rules (enforced by validator)

1. Every lesson has a unique `id` of the form `<type>.<conceptId>.<variant?>`.
2. Every lesson references a defined `conceptId` from `schema/concepts.js`.
3. `PatternLesson` has ≥ 2 anchors and ≥ 3 slot categories.
4. Every slot category referenced by a lesson is defined in `schema/slotCategories.js`.
5. `Register` is one of `informal | polite | formal | honorific`. Nothing else.
6. Prerequisites form a DAG (no cycles).
7. No two lessons share an `id`.

Run the validator: `node backend/curriculum/validator/validate.js`.

The validator runs in pre-commit (see [../../.husky/pre-commit](../../.husky/pre-commit), if present) and in CI.
