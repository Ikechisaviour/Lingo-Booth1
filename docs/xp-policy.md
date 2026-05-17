# XP Policy

Use `POST /api/users/:userId/learning-events` for learner activity XP.

Do not let screens choose their own points. Screens report what happened; the backend decides reward value, deduping, cooldowns, and caps.

## Reward rules

| Event | XP |
| --- | ---: |
| First correct quiz answer | beginner 3, intermediate 4, advanced 5, sentences 6 |
| Later-day quiz review | 1 |
| Same-day duplicate quiz answer | 0 |
| Flashcard recall | 1 per card per day |
| Class item completion | 2 once |
| Class activity completion | 5 once |
| Class lesson completion | 20 once |
| Meaningful conversation turn | 1, capped at 20 rewarded turns per day |
| Completed roleplay goal | 10 once per roleplay per day |
| Writing trace/copy completion | 1 per item/mode/day |
| Writing listen/meaning/stroke/review completion | 2 per item/mode/day |
| Writing from memory completion | 3 per item/mode/day |
| Speaking practice completion | 2 per prompt/day |

## Hands-free rule

Hands-free mode is a delivery mode, not an XP source by itself.

- Active hands-free conversation turns may earn the same XP as typed turns.
- Flashcards may earn XP only when the learner actively marks recall.
- Passive autoplay, background audio, and repeated playback do not award XP.

## Implementation guardrails

- New XP-producing work must create a learning event instead of calling raw point endpoints from UI code.
- If an activity can repeat, define whether dedupe is daily or lifetime before shipping it.
- If an activity is passive listening only, track engagement separately and award `0` XP.
- Web and mobile implementations must report the same event type and reference fields.
