const { validateAll, formatErrors } = require('../validator/validate');

describe('Curriculum v2 validator', () => {
  test('all lessons under backend/curriculum/lessons/ are structurally valid', () => {
    const result = validateAll();
    if (!result.ok) {
      // Print the errors so CI logs are useful, then fail.
      console.error('\n' + formatErrors(result.errors) + '\n');
    }
    expect(result.ok).toBe(true);
  });
});
