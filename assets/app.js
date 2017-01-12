// Loads when the web page is ready.
$(document).ready(function() {

	// Array where movie names are stored.
	var buttonArray= ["Re-Animator", "Alien", "Texas Chainsaw Massacre", "The Fly", "They Live", "Dead Alive", "Samurai Cop", "Riki-Oh"];

// For loop to create buttons for each element in the array.
	for (var i = 0; i < buttonArray.length; i++) {
		
		var newButton = $("<button>").attr("data-movie");

		newButton.attr("class", "btn btn-default");

		$("#button").append(newButton);
	}

// When someone clicks on a button it will call ajax in order to pull data from the Giphy API.
	$("button").on("click", function() {
		var movie = $(this).attr("data-movie");
	    
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {
	      	console.log(response);
	      });

	});
});