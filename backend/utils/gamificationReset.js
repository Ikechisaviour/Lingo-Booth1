const { getTodayUTC, getCurrentMondayUTC, getDayIndex } = require('./dateHelpers');

/**
 * Ensures daily quest counters are reset if the date has changed.
 * Ensures weekly XP is reset if the week has changed.
 * Mutates user object and returns whether any reset occurred.
 * Does NOT call user.save() — caller must save if needed.
 */
function ensureResetsApplied(user) {
  const today = getTodayUTC();
  const currentMonday = getCurrentMondayUTC();
  let changed = false;

  // Daily quest reset
  if (user.questResetDate !== today) {
    user.dailyXpEarned = 0;
    user.dailyHighScoreLessons = 0;
    user.dailyTimeSpent = 0;
    user.dailyQuestXpClaimed = [];
    user.questResetDate = today;
    changed = true;
  }

  // Weekly XP reset
  if (user.weekResetDate !== currentMonday) {
    user.weeklyXP = 0;
    user.weekResetDate = currentMonday;
    changed = true;
  }

  // Streak history week reset
  if (user.streakWeekStart !== currentMonday) {
    user.streakHistory = [false, false, false, false, false, false, false];
    user.streakWeekStart = currentMonday;
    // Carry over today's study status if lastStudyDate is today
    if (user.lastStudyDate === today) {
      const dayIdx = getDayIndex(today);
      user.streakHistory[dayIdx] = true;
    }
    changed = true;
  }

  return changed;
}

module.exports = { ensureResetsApplied };
