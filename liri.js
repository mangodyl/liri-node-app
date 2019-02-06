
require("dotenv").config();
var keys = require("./keys.js");

var argsArr = process.argv.slice(2);

const command = argsArr.shift();
const input = argsArr;

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

  spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
    console.log(data); 
  });
};