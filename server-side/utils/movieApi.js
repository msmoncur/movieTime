const request = require("request"); 

function getMovie(movieSearch, callback){
const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieSearch)}&include_adult=false&language=en-US&page=1`;
const options = {
  url, 
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGY5NGQ1Y2I1OTdlMGZiYzkzMTVmYTBhYTllOTA4ZSIsIm5iZiI6MTczNDQ0OTA4NS4zNDgsInN1YiI6IjY3NjE5N2JkZTdjNGZkZDkyZGNiZTVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdvker793O9lbc1aktdGew-2JrfYMQDJ5kEsQLccbqU'
  }, 
  json: true, 
};

//call the API 
request(options, (error, response) => {
    if(error){
        callback("Unable to connect to location service", null)
    } else if(response.statusCode != 200) {
        callback("Something went wrong", undefined)
    } else {
        callback(null, response.body)
    }
  })
}


module.exports = getMovie;
