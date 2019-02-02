// ajax with GIPHY API
// Get gifs and insert into card bodies
// ratings, play/pause

$(document).ready(function() {
    console.log("hello");
    $("#gif-card").hide();

    // window.onload = function() {

    // API key from GIPHY
    var APIkey = "BFByOJzeEKQ5fOyhPUyS6VPFT1cjcMx3";
    
    // Grab the search input and create a button
    function addButton() {
        var newButton = $("<a>");
        var searchInput = $("#input-field").val().trim();
        if (searchInput.length > 0) {
            console.log(searchInput);
            $("#button-row").append(newButton);
            newButton.attr("data-source", searchInput);
            newButton.attr("class", "search-button btn btn-success");
            newButton.text(searchInput);
        } else {
        }
        $("#input-field").val("");
        
    };
    
    // click submit and post the button
    $(document).on("click", "#submit-button", function(){
        addButton();
    });
    
    function addGIFs(x) {
        for (i = 0; i < 10; i ++) {
            var divOfGIF = $("<div>");
            var newGIF = $("<img>");
            var ratingGIF = $("<p>");
            var titleGIF = $("<p>");
            var sourceURL = x.data[i].images.fixed_height_still.url;
            divOfGIF.attr("class", "image-box");
            newGIF.attr("src", sourceURL);
            newGIF.attr("image-still", sourceURL);
            newGIF.attr("image-animate", x.data[i].images.fixed_height.url);
            newGIF.attr("state", "still");
            newGIF.attr("class", "gif-image")
            $("#gif-card").prepend(divOfGIF);
            $(divOfGIF).append(newGIF);
            ratingGIF.attr("class", "rating-text");
            ratingGIF.text("Rating:" + x.data[i].rating);
            titleGIF.attr("class", "title-text");
            titleGIF.text("Title:" + x.data[i].title);
            $(divOfGIF).append(ratingGIF);
            $(divOfGIF).append(titleGIF);
        } 
    }

    // AJAX to the API
    $(document).on("click", ".search-button", function() {
        $("#gif-card").show();
        var titleTag = $(this).attr("data-source");
        var APItag = titleTag;
        var APIURL = "https://api.giphy.com/v1/gifs/search?q=" + APItag + "&api_key=" + APIkey + "&limit=5";
        console.log(this);

        $.ajax({
            url: APIURL,
            method: "GET"
            }).done(function(response) {
                addGIFs(response);
                var GIFsTitle = $("<h2>");
                GIFsTitle.text(titleTag);
                $("#gif-card").prepend(GIFsTitle);
            });
        console.log(response);
    });
    //};




});