// twitter "track" content triggers to watch
// the incoming message MUST contain one of these phrases
// OR the profile/message must be in "interesting"

const track = [
    'writingcommunity',
    'writerslift',
    'writerslife',
    'amwriting',
    'literature',
    'poems',
    'essay',

    'write',
    'writing',
    'fiction',
    'horror',
    'fantasy',
    'drama',
    'scifi',

    'shortstory',
    'published',
    'flashfiction',

    'selfpublished',
    'bookboost',
    'bookplugs',
];

const interesting = [
    '#?(am)?writ(\\w+)', // amwriting, writercommunity
    '#?edit(\\w+)',
    '#?film(\\w+)',
    '#?short(\\w+)',
    '#?author(\\w+)?',
    '#?(gho\\w+)?writ(\\w+)', // writting, writer, written
    '#?screen(\\w+)', // screenwriter, screenplay
    '#?poe[mtry]+', // poerty, poem, poet
    '#?book(\\w+)', // book, bookshoop. booklift
    '#?story(\\w+)', // strory, stroryteller
    '#?novel(\\w)?', // novella, novel, novelist
    '#?word(\\w+)',
    '#?publish\\w+', // publish, published, publisher
];

// if the profile description OR message contains these
// the message is discarded immediately
//
const ignore = [
    'blm',
    'black',
    'white',
    'racis(\\w+)',
    'slav(\\w+)+',
    'colo(\\w+)',
    'christ(\\w+)',
    '(\\w+)?ethic(\\w+)?',
    'sjw',
    'equit(\\w+)',
    'allah',
    'mohamm(\\w+)',
    'jesus',
    'trump',
    'fascis(\\w+)',
    'nazi',
    'suprema(\\w+)',
    'justice',
    'misogyn(\\w+)',
    'patria(\\w+)',
    'diversi(\\w+)',
    'extinct(\\w+)',
];

module.exports = { track, interesting, ignore };
