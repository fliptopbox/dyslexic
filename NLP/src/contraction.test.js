import  contraction from './contraction.js';
import  dict from './contraction_list.js';

test('word with contraction', () => {
    expect(contraction("arent")).toBeTruthy();
    expect(contraction("aren't")).toBeFalsy();
});

test("known dictionary of contraction", () => {

    const keys = Object.keys(dictionary());
    expect(keys).toHaveLength(74);

    const results = keys.map(contraction).filter(b => b);
    expect(results).toHaveLength(0);
})



function dictionary(key = null) {
    return key ? dict[key] : dict;
}