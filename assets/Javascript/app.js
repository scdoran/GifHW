$(document).ready(function() {

	var movieArray= ["Re-Animator", "Evil Dead", "Texas Chainsaw Massacre", "The Fly", "They Live", "City of the Living Dead", "Samurai Cop", "Riki-Oh"];

	// function newButton() {
		$("#buttons").empty();

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
		$("#gifs").empty();

		var movie = $(this).attr("data-movie");
	    
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {
	      	console.log(response.data);

	      	var results = response.data;

	      	for (var i = 0; i < results.length; i++) {
	      		
	      		var newDiv = $("<div class='item'>");

		      	var newImg = $("<img>");

		      	newImg.attr("src", results[i].images.fixed_height.url);
		      	// newImg.attr("data-status");
		      	// newImg.attr("data-animated");
		      	// newImg.attr("data-still");

		      	newDiv.append(newImg);

		      	$("#gifs").prepend(newDiv);
	      	}
	      });
	});

	// newButton();

});