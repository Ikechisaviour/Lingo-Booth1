const User = require('../models/User');

const GRACE_PERIOD_MS = 48 * 60 * 60 * 1000; // 48 hours grace period
const INTERVAL_MS = 24 * 60 * 60 * 1000; // 24-hour intervals
const DECAY_RATE = 0.85; // Keep 85% each interval (15% reduction)

/**
 * Middleware that applies XP inactivity decay.
 * - 48-hour grace period after last answer (no penalty)
 * - After grace period, 15% reduction every 24 hours
 * - Only answering questions resets the timer (lastAnsweredAt)
 *
 * Uses optimistic concurrency (matching penaltyIntervalsApplied in the query)
 * to prevent race conditions when multiple requests arrive simultaneously.
 *
 * @param {string} paramName - The route parameter holding the userId (default: 'userId')
 */
const checkInactivityPenalty = (paramName = 'userId') => {
  return async (req, res, next) => {
    try {
      const userId = req.params[paramName];
      if (!userId) return next();

      const user = await User.findById(userId).select('totalXP lastAnsweredAt penaltyIntervalsApplied');
      if (!user) return next();

      req.xpPenalty = 0;

      if (user.lastAnsweredAt && user.totalXP > 0) {
        const idleMs = Date.now() - new Date(user.lastAnsweredAt).getTime();

        // No penalty during grace period
        if (idleMs <= GRACE_PERIOD_MS) return next();

        // Calculate intervals elapsed after grace period
        const msAfterGrace = idleMs - GRACE_PERIOD_MS;
        const totalIntervals = Math.floor(msAfterGrace / INTERVAL_MS);
        const alreadyApplied = user.penaltyIntervalsApplied || 0;
        const newIntervals = totalIntervals - alreadyApplied;

        if (newIntervals > 0) {
          // Apply decay: newXP = floor(XP * 0.85^n)
          const multiplier = Math.pow(DECAY_RATE, Math.min(newIntervals, 200));
          const newXP = Math.max(0, Math.floor(user.totalXP * multiplier));
          const penalty = user.totalXP - newXP;

          if (penalty > 0) {
            // Conditional update: only succeeds if penaltyIntervalsApplied hasn't changed
            const result = await User.findOneAndUpdate(
              { _id: userId, penaltyIntervalsApplied: alreadyApplied },
              {
                $inc: { totalXP: -penalty },
                $set: { penaltyIntervalsApplied: totalIntervals },
              },
              { new: true }
            );

            if (result) {
              req.xpPenalty = penalty;
            }
          }
        }
      }

      next();
    } catch (error) {
      console.error('XP inactivity check error:', error);
      next();
    }
  };
};

module.exports = { checkInactivityPenalty };
