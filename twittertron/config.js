/*

  Twitter (fliptopbox13)
  The access keys need to be environment variables
  eg. consumer_key >> TWITTERTRON_CONSUMER_KEY (in bashrc)
*/

const tokens = Object.fromEntries([
  "consumer_key",
  "consumer_secret",
  "access_token",
  "access_token_secret",
].map(s => [s, process.env[`twittertron_${s}`.toUpperCase()]]));


module.exports = { ...tokens }
