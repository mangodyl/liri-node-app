
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var argsArr = process.argv.slice(2);

let command = argsArr.shift();
let input = argsArr.join(' ');

switch (command) {
  case 'spotify-this-song' :
    spotify();
    console.log("Here's that song info you wanted...");
    break;
  
  case 'concert-this' :
    bands();
    console.log("These are the next 5 concerts...");
    break;

  case 'movie-this' :
    movie();
    console.log("Here's your movie info...")
    break;

  case 'do-what-it-says' :
    read();
    console.log("Fine, I guess I'll do the work...");
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
        return console.log('Spotify Error: ' + err);
      }

      let info = data.tracks.items[0];

      var print = (`----- Artist: ${info.artists[0].name}
      Song: ${info.name}
      Album: ${info.album.name}
      Preview Link: ${info.preview_url}`);

      console.log(print);

      // Appending file to log.txt
      fs.appendFile("log.txt", `\nSpotify: \n${print}`, function(err) {
        if (err) {
          console.log(err);
        }
    
        else {
          console.log("Content Added!");
        }
      
      });
      
    });
};


// Bands In Town API

function bands() {
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
  .then((response) => {
    let eventArray = response.data;
    console.log(` > Band: ${eventArray[0].lineup[0]} <`);
    for(let i = 0; i < 5; i++) {
      console.log("----------")
      console.log(`   Venue: ${eventArray[i].venue.name}`);
      if(eventArray[i].venue.region === '') {
        console.log(`   Location: ${eventArray[i].venue.city}, ${eventArray[i].venue.country}`);
      }
      else {
        console.log(`   Location: ${eventArray[i].venue.city}, ${eventArray[i].venue.region}, ${eventArray[i].venue.country}`);
      };
      let eventTime = moment(eventArray[i].venue.datetime);
      let eventDate = eventTime.utc().format('MM-DD-YYYY');
      console.log(`   Date: ${eventDate}`);
    }
  })
  .catch((error) => {
    console.log("BandsInTown Error: " + error);
  });
};

// OMDB API

function movie() {
  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
    .then((response) => {
      let data = response.data;
      console.log(`----- Title: ${data.Title}
      Year: ${data.Year}
      IMDb Rating: ${data.Ratings[0].Value}
      Rotten Tomatoes Rating: ${data.Ratings[1].Value}
      Country of Production: ${data.Country}
      Language: ${data.Language}
      Plot: ${data.Plot}
      Actors: ${data.Actors}`)
    })
    .catch((error) => {
      console.log("OMDB Error: " + error)
    });
};


function read() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    
    var dataArr = data.split(',');
    command = dataArr[0];
    input = dataArr[1];
    spotify();
    
  });
};