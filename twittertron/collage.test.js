const collate = require('./collate');

describe('description', () => {
    test('something', () => {
      const result = true;
      const expected = true;
      collate();
      expect(result).toEqual(expected);
    });
});
