import {paragraphs} from "./stopwords.js";
import sample from "./sample.text.js";


describe('Name of the group', () => {
    test('should ', () => {
        const p = paragraphs(sample);
        expect(p).toHaveLength(155);
    });
});


