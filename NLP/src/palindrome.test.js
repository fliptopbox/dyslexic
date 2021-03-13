var { palindrome, rotateArray } = require('./palindrome');

describe('Palindrome', () => {
    test('simple test', () => {
        const result = palindrome('nurses run');
        const expected = "nurses run";
        expect(result).toEqual(expected);
    });

  test("something", ()=> {

    const array = [1,2,3];
    const result = rotateArray(array)
    const expected = [2,3,1]
    expect(result).toEqual(expected);
  })


    // test.skip('complex test', () => {
    //     const result = palindrome('is it safe when nurses run for the bus');
    //     const expected = "nurses run";
    //     expect(result).toEqual(expected);
    // });
});
