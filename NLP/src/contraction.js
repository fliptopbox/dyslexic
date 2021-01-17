/**
 *  contractions(word String)
 * Checks if a @word is a contraction
 *
 * Returns String or Null
 * - contraction will return Null
 * - standard word returns itself (@word)
 *
 * ! Mark	Description	Windows	Mac	HTML
 * '	    Straight single apostrophe	'	'	'
 * "	    Straight double quote	"	"	"
 * ‘	    Opening single apostrophe	alt+0145	option+]	&lsquo;
 * ’	    Closing single apostrophe	alt+0146	option+shift+]	&rsquo;
 * “	    Opening double quote	alt+0147	option+[	&ldquo;
 * ”	    Closing double quote	alt+0148	option+shift+[	&rdquo;
 */


// Create the RegEx out of scope to cache it in memory
//! note: whole phrase match for: ol' and 'twas
const reSuffix = new RegExp(
    "((?:n)?(?:'twas|['‘’`][tdvelsamnr]{1,2}$|ol'))",
    'i'
);

export default function contraction(word = null) {
    return reSuffix.test(word) ? null : word;
}

/** * /

import  dict from './abbreviations_list.js';

// performance tests
const array = Object.keys(dict);
Object.keys(array).map(contractions); //? .
Object.keys(array).map(dictionary); //? .


function dictionary(key = null) {
    return dict[key];
}

/** */
