
require("dotenv").config();
var keys = require("./keys.js");

const command = process.argv[2];
const input = process.argv[3];



var spotify = new Spotify(keys.spotify);