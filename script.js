
// 1. namespace object
const movieApp = {};


// 2. identifying the base URL
const baseEndpoint = 'https://api.themoviedb.org/3';

// 3. identifying base image URL as per API documentation for TMDB
const basePoster = 'https://image.tmdb.org/t/p/w500';

// 4. Storing my API key
const myApiKey = 'bf757c4363ed8591fb5f3a319913c892';

// 5. Document ready
$(function(){
        movieApp.init();
    });

// 6. INIT functions created
movieApp.init = function(){
    movieApp.form();
}

// 7. clearing the result and reloading page

function reloadPage(){
    location.reload(true);
}

// 8. Event listener and getting input from the search field
movieApp.form = function(){
    $('form').on('submit', function(event){
        event.preventDefault();
        let movieTitle = $('#movieTitle').val();
        $('#movieTitle').val('');

        console.log(movieTitle);
        movieApp.getUserQuery(movieTitle);
    });
}

// 9. calling API getting data and sending data to displayContent method
movieApp.getUserQuery = function(movieTitle){
    $.ajax({
        url: baseEndpoint + '/search/movie',
        method: 'GET',
        dataType: 'JSON',
        data: {
            api_key: myApiKey,
            language: 'en-US',
            query: movieTitle
        }
    })
    .then(function(res){
            let movie = {}
            movie.title = res.results[0].title;
            movie.image = basePoster + res.results[0].poster_path;
            movie.overview = res.results[0].overview;
            movie.releaseDate = res.results[0].release_date;
            movie.voteAverage = res.results[0].vote_average;
            
            movieApp.dispFormContent(movie);
            // Logging movie title in the console
            console.log(movie);
            // Logging movie title in the console
            console.log(movie.voteAverage)

// 10. Conditional statement to get movie recommendation
           if (movie.voteAverage >= 7) {
               console.log("recommended")
               document.getElementById('recommendation').innerHTML = "Highly Recommended!";
           } else if (movie.voteAverage >= 6) {
            console.log("Not recommended")
            document.getElementById('recommendation').innerHTML = "Sort of Recommended";
            } else if (movie.voteAverage < 6) {
                document.getElementById('recommendation').innerHTML = "Not Recomended!";
            }

        });

// 11. Displaying data from the API on the page using handlebars
    movieApp.dispFormContent = function(movie){
        let rawMovieData = $('#data').html();
        let compiledMovieData = Handlebars.compile(rawMovieData);
        let finalmovieData = compiledMovieData(movie);

    console.log(finalmovieData);

    $('ul').html(finalmovieData);    
    };
            

}
