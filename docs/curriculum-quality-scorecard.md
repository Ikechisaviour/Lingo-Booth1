# Curriculum Quality Scorecard

This scorecard compares every target-language class curriculum against the current strongest curriculum shape in the repo.

## Benchmark

The current quality benchmark is the mature multi-level shape used by the strongest curricula:

- 51 lessons total
- Level 1 foundation + 21 beginner units
- Level 2 thematic units, reviews, and adult/workplace units
- Level 3 advanced grammar clusters
- roughly 10+ activities per lesson
- dense, reusable support content rather than only a small vocabulary list
- language-specific grammar, register, pronunciation, and culture features

Chinese is the richest current corpus by authored density. Japanese and German are the strongest examples of how the shared richer file structure can still preserve target-language-specific features.

## Current Coverage

| Language group | Current state |
| --- | --- |
| `ko`, `zh`, `en`, `ja`, `de`, `es`, `fr` | Mature multi-level curricula present |
| `ms`, `ar`, `he`, `hi`, `it`, `fil`, `id`, `pt`, `ru`, `tr`, `nl`, `ta`, `bn` | Mature multi-level curricula present |

## Main Findings

1. Every supported target language now has the same 51-lesson structural footprint: Level 1 foundation and thematic work, Level 2 thematic/adult/review coverage, and Level 3 advanced grammar clusters.
2. Structural completion is not enough on its own. Korean and English previously retained legacy thin lessons, so the quality bar now also checks content depth and sparse-gloss rates across every target language.
3. The quality gate is therefore both structural and editorial:
   - at least 51 lessons
   - at least 10 average activities per lesson
   - at least 50 average content items per lesson
   - no lesson below 45 content items
   - no curriculum with more than 10% sparse glosses
   - no placeholder learner-facing glosses such as `Topic anchor.` or bare-function glosses such as `Make service requests.`
4. Any future completion pass that merely copies another language's distinctions into a target language would violate the repo rules. Richness must still preserve what is genuinely distinctive about each target language.

## Practical Standard For The Next Pass

For each language, completion means:

1. Keep the full multi-level structure intact.
2. Use the shared rich lesson structure where useful, but provide target-specific:
   - grammar contrasts
   - pronunciation problems
   - register choices
   - culturally natural examples
3. Pass learner-flow review on representative pairs before seeding.
4. Do not call a curriculum complete merely because the file count matches the benchmark.
5. Keep `npm run audit:all` green so depth regressions are caught automatically rather than rediscovered by eye.

## Verification

Run:

```bash
node backend/scripts/reportCurriculumQuality.js
npm --prefix backend run audit:language-guardrails
```

This prints the current coverage, depth, and gloss-density metrics for every target language so future expansion work can be compared against the same bar.
