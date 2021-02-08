const { sentence } = require('./getRandomSentence');

function randomTextMessage() {
    const text = sentence();
    const tags = [
        'DicemanPoetry',
        'MadnessPassedBy',
        'SurrealNonSense',
        'Silliness',
        'StrangeProes',
        'RandomThingToSay',
    ].sort(() => Math.random() - 0.5);

    const x = tags.length / 2;
    const n = x - ((Math.random() * x) >> 0);
    const array = tags.slice(-n);
    const items = ['WritingCommunity', ...array].map((s) => `#${s}`);
    const message = [text.trim(), '', '', ...items].join('\n');

    return message;
}

module.exports = randomTextMessage;