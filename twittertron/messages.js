const EventEmitter = require('events');

process.messages = new EventEmitter();
module.exports = process.messages;

/*
 *
 * A script that correclates mircofunctions
 * and triggers next action depending on
 * a time to live condintion or an aggreagated
 * determanistic result, for example a data package
 * arrives and is broadcast with a ttl of 250ms
 *
 * two microfunctions process the same package
 * - one appends a cliche: true flag
 * - two appends a oxymoron: true flag
 *
 * The junction can now do stuff with the appeneds metadata
 *
 *
 */
