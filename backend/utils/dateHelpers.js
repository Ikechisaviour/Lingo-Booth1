/**
 * Get today's date string in UTC: "YYYY-MM-DD"
 */
function getTodayUTC() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get the Monday of the current ISO week in UTC: "YYYY-MM-DD"
 */
function getCurrentMondayUTC() {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 1=Mon...6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diff);
  return monday.toISOString().split('T')[0];
}

/**
 * Get day-of-week index for a date string (0=Mon, 6=Sun)
 */
function getDayIndex(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  const jsDay = d.getUTCDay(); // 0=Sun, 1=Mon...
  return jsDay === 0 ? 6 : jsDay - 1;
}

module.exports = { getTodayUTC, getCurrentMondayUTC, getDayIndex };
