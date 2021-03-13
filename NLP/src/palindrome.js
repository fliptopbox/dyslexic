function charArray(text, reverse = false) {
    const array = text.map((c) => c.charCodeAt(0));
    return reverse ? array.reverse() : array;
}

function rotateArray(array) {
  const first = array.splice(0,1)[0];
  return [...array, first];
}

function palindrome(sentence) {
    const text = sentence.replace(/\s+/g, '').toLowerCase().split('');

    const forward = charArray(text);
    const reverse = charArray(text, true);

    const diff = forward.map((v, i) => v - reverse[i]).filter((v) => v !== 0);

    return diff.length === 0 ? sentence : null;
};

module.exports = {palindrome, rotateArray}
