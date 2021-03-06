$('#luckyTv').on("click", function(e) { //event handler for submit button
    event.preventDefault(); //prevents refreshing

    var genreArray = ['10759', '16', '35', '80', '99', '18', '10751', '10762', '9648', '10763', '10764', '10765', '10766', '10767', '10768', '37'];
    var random = genreArray[Math.floor(Math.random() * genreArray.length)];

    var queryURL = "https://api.themoviedb.org/3/discover/tv?api_key=50c9867e013d532a54d305162ee29e35&with_genres=" + random;
    $.ajax({ //AJAX call for specific show being clicked
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response.results);

        $('#moviesHere').empty();

        var results = response.results; //ajax results into variable
        console.log(results);

        for (var i = 0; i < results.length; i++) {

            var str = results[i].name;
            str = str.replace(/\s+/g, '-').toLowerCase();

            var mediaType = results[i].media_type;

            if (results[i].first_air_date === "") {
                var year = "N/A";
            } else {
                var yearFull = results[i].first_air_date; //takes release date from themoviedb 
                var year = yearFull.substring(0, 4); //extracts the year
            }
            var movieBox = $('<div>'); //creates div for poster + info
            movieBox.addClass('col-xs-6 col-sm-3 movieBox');

            var posterBox = $('<div>'); //creates div for poster
            posterBox.addClass('thumbnail');

            var imgWrapper = $('<div>'); //creates div for poster
            imgWrapper.addClass('img-wrapper');


            var img = $('<img>');
            img.addClass('img-responsive');

            if (results[i].poster_path == null) {
                img.attr('src', 'assets/media/image_not_found.png');
            } else {
                img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
            }

            img.attr('data-name', str);
            img.attr('data-id', results[i].id);
            img.attr('data-media', mediaType);
            img.attr('data-ratings', str + "&y=" + year);
            img.attr('title', results[i].name + " (" + year + ")");

            imgWrapper.append(img);
            posterBox.append(imgWrapper);
            movieBox.append(posterBox);

            $('#moviesHere').append(movieBox);
        }
    });
});
