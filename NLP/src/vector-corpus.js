var lzw = require('./lzw');

const text = `"After passing many years of life in the painful investigation of human
offences, it is with peculiar satisfaction that I find myself
commissioned to commemorate, in this Assembly, a character of virtue
without example--a character, at once so meek and so sublime, that, if a
feeling spirit had been poisoned with misanthropy from too close a
contemplation of mortal crimes, this character alone might serve as an
antidote to the word of mental distempers, and awaken the most callous
and sarcastic mind to confess the dignity of our Nature, and the
beneficence of our God. In stating to you the merits of HOWARD, I might
expatiate with delight on the various qualities of this incomparable
man; I might trace his progress through the different periods of a life
always singular and always instructive. I could not be checked by any
fear of overstepping the modesty of Truth in the celebration of Virtue,
so solid and so extensive, that the malevolence of Envy could not
diminish its weight, the fondness of Enthusiasm could not amplify its
effects. But I must not forget that there are professional limits to my
discourse. It is incumbent on me to confine myself to a single object,
and to dwell only on those public services, that peculiarly endear the
name of Howard to the liberal and enlightened community in which I have
the honour to preside.`;

function makeSentences(text) {
    const sentence = text
        .replace(/\n+/g, ' ')
        .split(/([\.;!?]+\s)/g)
        .filter((s) => !/^\W$/.test(s.trim()));

    return sentence;
}

function getWordObjects(sentence) {
    const words = sentence
        .toLowerCase()
        .replace(/\W+/g, ' ')
        .split(/\s+/)
        .filter((s) => s)
        .map((word) => {
            const n = parseInt(word, 36);
            return { [word]: word.length, n };
        });


    
    const array = lzw.encode(sentence, true);
    const value = array.reduce((a, c) => a + c, 0);

    return { array, value, words };
}

const sentences = makeSentences(text);
const words = sentences.map(getWordObjects);

words;

`"It was in the capacity of a Minister to Justice, that the pure spirit,
whom it is my glory to praise, first conceived the idea of those
unrivaled labours that have rendered his memory a treasure to mankind.
In discharging a temporary office, that exposed to him the condition of
criminals, he was led to meditate on the evils which had grievously
contaminated the operations of Justice. He perceived that Law herself,
like one of her most illustrious Delegates (I mean the immortal Bacon),
was grossly injured by the secret and sordid enormities of her menial
servants: that Captivity and Coercion, those necessary supporters of her
power, instead of producing good, often gave birth to mischiefs more
flagrant, and more fatal, than those which they were employed to
correct. He found, even in the prisons of his own humane and enlightened
country, an accumulation of the most hideous abuses: he found them not
nurseries of penitence and amendment, but schools of vice and impiety;
or dens of filth, famine, and disease: not the seats of just and
salutary correction and punishment, but the strong holds of cruelty and
extortion. The irons of the prisoner, which he only beheld, entered into
his soul, and awakened unextinguishable energy in a spirit, of which
companion and fortitude were the divine characteristicks. In the noble
emotions of pity for the oppressed, and of zeal for the honour and
interest of civilized society, he conceived perhaps the sublimest design
that ever occupied and exalted the mind of man, the design to search and
to purify the polluted stream of Penal Justice, not only throughout his
own country, but through the various nations of the world. How low, how
little, are the grandest enterprizes of Heroic Ambition, when compared
with this magnanimous pursuit! How frivolous and vain are the highest
aims of Fancy and Science, when contrasted with a purpose so
beneficently great! But, marvellous as the magnitude of HOWARD'S
enterprise appears, on the slightest view that magnitude becomes doubly
striking, when we contemplate at the same time the many circumstances
that might either allure or deter him from the prosecution of his idea.
Consider him as a private gentleman, possessed of ease and independence,
accustomed to employ and amuse his mind in retired study and
philosophical speculation; arrived at that period of life, when the
springs of activity and enterprize in the human frame have begun to
lose their force! consider that his health, even in youth, had appeared
unequal to common fatigue! his stature low! his deportment humble! his
voice almost effeminate! Such was the wonderful being, who relinquished
the retirement, the tranquillity, the comforts, that he loved and
enjoyed, to embark in labours at which the most hardy might tremble; to
plunge in perils from which the most resolute might recede without a
diminution of honour. Under all these apparent disadvantages,
unsummoned, unauthorized by any Prince, unexcited by any popular
invitation, he resolved to investigate all the abuses of imprisonment;
to visit the abodes of wretchedness and infection; and to prove himself
the friend of the friendless, in every country that the limits of his
advanced life would allow him to examine. Against such an enterprize,
projected by such an individual, what forcible arguments might be urged,
not only by every selfish passion, but even by that prudence, and that
reason, which are allowed to regulate an elevated mind! How plausibly
did Friendship exclaim to Howard, 'Your projects are unquestionably
noble; but they are above the execution of any individual: you are
unarmed with authority; you have the wish to do great good, but the
power of doing little! Consider the probable issue of the
undertaking!--You will see a few hapless wretches, and tell their
condition to the inattentive world; perhaps perish yourself from
contagion, before you have time to tell it; and leave your afflicted
friends to lament your untimely fate, and the ungrateful Publick to
deride your temerity!' What force of intellect, what dignity of soul
were required to prevent a mortal from yielding to remonstrances so
engaging! The divine energy of Genius and of Virtue enabled HOWARD to
foresee, that the sanctity of his pursuit would supply him with strength
and powers far superior to all human authority:--His piercing mind
comprehended that there are enormities of such a nature, that to survey
and to reveal them is to effect their correction.--He felt that his
sincere compassion for the oppressed, and his ardent desire to promote
perfect justice, would serve him as a perpetual antidote against the
poison of fear.--He felt that in the darkness of dungeons he should want
no associates, no guards to defend him against the outrages of detected
extortion, or suspicious brutality.--He felt, that as his purpose was
heavenly, the powers of Heaven would be displayed in his support; that
iniquity and oppression would not dare to lift a hand against him,
though they knew it was the business of his life to annihilate their
sway in their most secret dominion. How admirably did the progress of
his travels evince and justify the pure and enlightened confidence of
his spirit! All dangers, all difficulties, vanish before his gentleness,
his regularity, his perseverance. Insolence and ferocity seem to turn,
at his approach, into docility and respect. Every hardship he endures,
every step he advances, in his wide and laborious career of Beneficence,
instead of impairing his strength, invigorates his frame; instead of
diminishing his influence, increases the utility of his conduct, by
making the world acquainted with the sanctity of his character. Witness,
ye various regions of the earth! with what surprize, delight, and
veneration, ye beheld an unarmed, and unassuming traveller instructing
you in the sublime science of mitigating human misery, and giving you a
matchless example of tenderness and magnanimity! O, England! thou
generous country! ever enamoured of glory, contemplate in this, the most
perfect of thy illustrious sons; contemplate those virtues, and that
honour, in which thy parental spirit may most happily exult!--What
spectacle can be more flattering to thy native, thy honest pride, than
to behold the proudest potentates of distant nations listening with
pleasure to a private Englishman; and learning, from his researches, how
to relieve the most injured of their subjects! how to abolish the
enormities of perverted Justice! To form a complete account of the good
arising to the world from the life and labours of Howard, would be a
task beyond the limits of any human mind: an exact statement of the
benefits he has conferred upon society, could be rendered only by the
attendant Spirit whom Providence commissioned to watch over him, and who
might discern, by the powers of supernatural vision, what pregnant
sources of public calamity he crushed in the seed, and what future
virtues, in various individuals, he may draw into the service of mankind
by the attraction of his example.`;
