/**
 * Single canonical politeness/formality dimension for Curriculum v2.
 *
 * Replaces the v1 metadata overlap (note / register / formality / distinction)
 * which encoded the same dimension in 3-4 contradictory fields.
 */

const REGISTER = Object.freeze({
  INFORMAL: 'informal',   // 반말 — friends, younger family, very close peers
  POLITE: 'polite',       // 해요체 — default for adult strangers, casual workplace
  FORMAL: 'formal',       // 합니다체 — formal speech, presentations, broadcasts
  HONORIFIC: 'honorific', // 시-marked — addressing elders, superiors, customers
});

const REGISTER_VALUES = Object.freeze(Object.values(REGISTER));

function isValidRegister(value) {
  return REGISTER_VALUES.includes(value);
}

module.exports = {
  REGISTER,
  REGISTER_VALUES,
  isValidRegister,
};
