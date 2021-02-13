
const EventEmitter = require("events");

process.messages = new EventEmitter();

module.exports = process.messages;