const intersection = require('./intersection');
const {ignore, track, interesting} = require("./track")

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



const bb = [
    "Story is he wrote this about princess Diana But he did drink a lot could of been pulling my leg 🙂 https://t.co/Flx8iZHnxP one of the rare alright ‘Karens’ Don’t follow me if you are a scum reader,racist or a Tory we won’t get on-thoughts are most definitely my own #J4T96 #NSNO",
    "And teaching this to children? Quite beyond the pale. mother, grandma. Women have a human right to same sex spaces and sterilizing children is unethical. Biological sex is fact. Gender Ideology out of schools .",
    "Yeah that's about the long and short of it.I still know lots of people who have been taken in by the media bullshit. And yet they sit around listening to fucking Boris Johnson and his 'guidance' on how to behave to stop a deadly virus from spreading...🧐 Murder should be legal as long as you plan to eat your victim.",
    "Novelist, freelance writer, bon vivant. Get my latest book here: http://matthewbin.com/2017/07/now-available-all-over-the-place-brendans-way/",
    "black white colored jesus",
    'Author, Artist & Book Reviewer. Published poetry books- Death Library, Mother May I?, Anatomy of A Dress & Confess. Currently working on my first novel!',
    'Film Graduate. Film & Media Editor at No Majesty. Contributing to FilmHounds. Screenwriter / director if time permits.',
    "Story of the Green Dress ~ prints to make your day a little brighter #story #words #text #greendress #written  #artprints   https://t.co/c7v95XdMFf  #redbubble Hearts, nature and rainbows; prints of illustrations and paintings, plus other stuff, mostly positive, including the occasional unicorn.",
    '26. Bi. ￼￼ Author & #mentalhealth campaigner. I write about the stuff this corrupt government want us to keep quiet about.  ￼',
    'Independent Hiphop/Rap Artist, Independent record label owner, ghostwriter, and performer',
    'put on the special glasses ￼ or @Mamma_D_ will make you eat that trash can / Twitter hates me / I’m also a father / why am i Mr. Pink? / #monica',
    'booklift, Lifedrawer. Filmmaker. Storyteller. JavaScripter. Designer. Coffee drinker. Cryptomancer. ( http://mas.to/@fliptopbox ) #writtingcommunity',
    "Fuck off with your self fellating back patting for even considering uttering the name of a charity or righteous cause. Fuck off for jumping on the bandwagon of human rights only when it's safe and popular to do so. Fuck off./rant 🜏 NSFW Artist ⛧ http://Avenier.org ⛧ http://SpectreComic.com ⛧ http://etsy.com/shop/Rituali ⛧ 🖤Marcus ⛧ Discord: Felix#2346 Persisted v2q6od 1351278480714064000",
][0];

// intersection(track, bb); //?
// intersection(ignore, bb); //?
// intersection(interesting, bb); //?

// const text = html().replace(/\n+/g, " ")




function html() {
    return `<HTML><HEAD>
<TITLE>Surrealism Server: Surrealist Compliments For All</TITLE>
<META NAME="DESCRIPTION" CONTENT="Surrealism Server: The Surrealist Compliment Generator">
<META NAME="KEYWORDS" CONTENT="Surrealism,Surrealist,Surreal,Dada,Art,Salvador Dali,Andre Breton,Rene Magritte,Max Ernst">
<SCRIPT Language="JavaScript">
<!--

// FRAME THIS! (Version 1.7)
// script home location http://www.gmdstudios.com/ideas/frames/
// Authors: GMD Studios (Andrew Cowan & Brian Clark)
//
// This script is copyright 1997-8 by GMD Studios. Permission to
// use, modify, and distribute this is granted as long as authors'
// copyright statements are left intact. All other use prohibited.

// VARIABLE ASSIGNMENT
// Set real_location to the URL of your website.

var real_location = "http://www.madsci.org/";

function framethis () {

        if (top.location) {
                    if (self != top) top.location = self.location;
                    } else {
                           if (parent.location) {
                              if (parent.location != real_location) parent.location = real_location;
                    }
        }

}
//-->

</SCRIPT>

</HEAD>
<BODY BGCOLOR=#CCCCCC>
<!--BACKGROUND="/~lynn/juju/surr/bkgr/zebra.gif"-->

<H3 align=center><Font size="4"><Font size="+5">T</Font>he 
<Font size="+5">S</Font>urrealist <Font size="+5">C</Font>ompliment 
<Font size="+5">G</Font>enerator</Font></H3>
<center><Font size=-1>
<a href="/~lynn/juju/surr/">Surrealism Server</a> | <a href="/~lynn/juju/">Jardin
M&eacute;canisme</a> | <a href="/~lynn/VH">Visible Human</a> |
<a href="/">MadSci Network</a>
</Font>
<HR>
<P>
<h2>

Where it not for the dizzy whiptail ambivalence of your crumbling
fleece, I could never contemplate the ways of so many merchant 
bankers in heat.
</h2>
</center>
<P>
<HR>
<P>
<I><a href="/cgi-bin/cgiwrap/~lynn/jardin/SCG">Reload</a> this page to
receive another omnivorous compliment.</I>
<P>
<script type="text/javascript"><!--
google_ad_client = "pub-7378904219238892";
google_ad_width = 468;
google_ad_height = 60;
google_ad_format = "468x60_as";
google_ad_type = "text_image";
google_ad_channel ="";
google_color_border = "CCCCCC";
google_color_bg = "CCCCCC";
google_color_link = "0000FF";
google_color_url = "008000";
google_color_text = "000000";
//--></script>
<script type="text/javascript"
  src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</BODY></HTML>`}