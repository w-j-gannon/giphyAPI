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
    
    
    //};




});