$(document).ready(function() {

	var movieArray= ["Re-Animator", "Alien", "Texas Chainsaw Massacre", "The Fly", "They Live", "Dead Alive", "Samurai Cop", "Riki-Oh"];

	// function newButton() {

		for (var i = 0; i < movieArray.length; i++) {
			
			var newButton = $("<button class='btn btn-default'>");

			newButton.attr("data-movie", movieArray[i]);

			newButton.text(movieArray[i]);

			$("#buttons").append(newButton);
		}
	// }

	$("#submit").on("click", function(event) {
		var movie = $("#movieText").val();

		movieArray.push(movie);

		newButton();
	});

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