// ajax with GIPHY API

// Enter a search term to add a button
// Click the button to get gifs and insert into card bodies
// display rating and title, play/pause feature

$(document).ready(function() {
    
    // this is displaying twice so something is wrong
    console.log("hello");
    
    // hide the container until there is something to put in it
    $("#gif-container").hide();

    // API key from GIPHY
    var APIkey = "BFByOJzeEKQ5fOyhPUyS6VPFT1cjcMx3";
    
    // Grab the search input and create a button
    function addButton() {
        var newButton = $("<a href='#' class='btn btn-success search-button' role='button'>");
        var searchInput = $("#input-field").val().trim();
        if (searchInput.length > 0) {
            console.log(searchInput);
            $("#button-row").append(newButton);
            newButton.attr("data-source", searchInput);
            newButton.text(searchInput);
        } else {
        }
        $("#input-field").val("");
        
    };
    
    // click submit and post the button
    $(document).on("click", "#submit-button", function(){
        addButton();
    });
    
    // Take the reponse data and populate the gif cards
    function addGIFs(response) {
        for (i = 0; i < 5; i ++) {

            // variables to create divs for data
            var newGifDiv = $("<div class='card' id='each-gif'>");
            var newGIF = $("<img class='card-img-top'>");
            var newGifBody = $("<div class='card-body'>");
            var ratingGIF = $("<p class='card-text'>");
            var titleGIF = $("<h6 class='card-title'>");
            var sourceURL = response.data[i].images.fixed_height_still.url;
            
            //give attributes for playing gifs
            newGIF.attr("src", sourceURL);
            newGIF.attr("image-still", sourceURL);
            newGIF.attr("image-animate", response.data[i].images.fixed_height.url);
            newGIF.attr("state", "still");
            
            // append gif card to div and add texts
            $(newGifDiv).append(newGifBody)
            $("#gif-card").prepend(newGifDiv);
            $(newGifDiv).prepend(newGIF);
            ratingGIF.text("Rating: " + response.data[i].rating);
            titleGIF.text(response.data[i].title);
            $(newGifBody).append(ratingGIF);
            $(newGifBody).prepend(titleGIF);
        } 
    };

    // AJAX to the API
    $(document).on("click", ".search-button", function() {
        
        $("#gif-container").show();
        var titleTag = $(this).attr("data-source");
        var APItag = titleTag;
        var APIURL = "https://api.giphy.com/v1/gifs/search?q=" + APItag + "&api_key=" + APIkey + "&limit=5";
       
        $.ajax({
            url: APIURL,
            method: "GET"
            }).done(function(response) {
                addGIFs(response);
                var GIFsTitle = $("<div class='alert alert-success' role='alert'>").text(titleTag);
                $("#gif-card").prepend(GIFsTitle);
            });
    });


    // Animate gifs on click
    $(document).on("click", "img", function() {
        
        var GIFstate = $(this).attr("state");
        if (GIFstate === "still") {
            
            $(this).attr("src", $(this).attr("image-animate"));
            $(this).attr("state", "playing");

        } else if (GIFstate === "playing") {
            
            $(this).attr("src", $(this).attr("image-animate"));
            $(this).attr("state", "still");
        }
    }); 



});