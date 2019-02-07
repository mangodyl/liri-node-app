
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")

var argsArr = process.argv.slice(2);

let command = argsArr.shift();
let input = argsArr.join(' ');

console.log(input);
console.log(" ----------- ");
console.log("Command: " + command);

switch (command) {
  case 'spotify-this-song' :
    spotify();
    console.log("spotify");
    break;
  
  case 'concert-this' :
    bands();
    console.log("concert");
    break;

  case 'movie-this' :
    movie();
    console.log("movie")
    break;

  case 'do-what-it-says' :
    anyInput();
    console.log("any");
    break;
}


// Spotify API

function spotify() {
  var spotify = new Spotify(keys.spotify);

    if (input === '') {
      input = "The Sign Ace of Base"
    }

    spotify.search({ type: 'track', query: input, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      let info = data.tracks.items[0];

      console.log(`------- Artist: ${info.artists[0].name}
      Song: ${info.name}
      Album: ${info.album.name}
      Preview Link: ${info.preview_url}`);
      // console.log(data.tracks.items[0]); 
    });
};