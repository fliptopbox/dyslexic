
const a = [
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

    'self',
    'published',
    'short',
    'story',
    'flash',
    'fiction',

    'selfpublished',
    'bookboost',
    'bookplugs',
];
const b = `
>> (LadyEloudia) w26 #0 @0 <13wq5iz>  
>> 1350787886384349200 
>> There is a reason why I prefer reading fanfics untill the crack of dawn and not "real books" like I used to. Because they are better.
>> [ 'CrackOfDawn' ]
Persisted 13wq5iz 1350787886384349200
liked 1350787886384349186
retweeted 1350787886384349186

>> (krobnovelist) w41 #0 @0 <1kmizei>  
>> 1350788374689407000 
>> I don’t really detail Wyatt’s relationship history all that much in “The Road to Ithaca,” but I’m sure he does have lost loves. He’s just become very cynical toward relationships and wouldn’t talk about them. has your MC loved and lost?
>> [ 'LovedAndLost' ]
Persisted 1kmizei 1350788374689407000
liked 1350788374689406976

>> (ironsjon) w26 #0 @2 <1u6f3rl>  
>> 1350788562480992300 
>> The high tax cliche is a red herring. It’s only so high as it contains things like health insurance that are charged separately in other countries.
>> [ 'RedHerring' ]
Persisted 1u6f3rl 1350788562480992300
liked 1350788562480992256
retweeted 1350788374689406976
retweeted 1350788562480992256

>> (JkayeMorgan) w35 #1 @0 <1lh4df7> wisdom 
>> 1350790726536323000 
>> Words of from Alex Morritt, "New year—a new chapter, new verse, or just the same old story? Ultimately we write it. The choice is ours." Start the new chapter of your life today, why wait?
>> [ 'SameOldStory' ]
Persisted 1lh4df7 1350790726536323000
liked 1350790726536323073
retweeted 1350790726536323073`;


function intersection(a, b) {
    // a is a list of strings (needles)
    // b is a paragraph of text (haystack)
    // returns a list of needles

    if (!a || !b) return;

    const string = " " + b.replace(/\n+/, " ").toLowerCase() + " ";
    const rexs = a.map((s) => {
        return new RegExp(`(${s})`, 'gi');
    });

    const matches = rexs
        .map((re, i) => {
            return re.test(` ${string} `) ? i : null;
        })
        .filter((s) => s)
        .map((i) => a[i]);

    rexs; //?
    matches;

    return matches;
}

intersection(a, b); //?