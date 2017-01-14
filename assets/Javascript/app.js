
	var movieArray= ["Re-Animator", "Evil Dead", "Texas Chainsaw Massacre", "The Fly", "They Live", "City of the Living Dead", "Samurai Cop", "Riki-Oh"];

$(document).ready(function() {

	function newButton() {
		$("#buttons").empty();

		for (var i = 0; i < movieArray.length; i++) {
			
			var newButton = $("<button class='btn btn-default movies'>");

			newButton.attr("data-movie", movieArray[i]);

			newButton.text(movieArray[i]);

			$("#buttons").append(newButton);
		}
	}

	function gifShow() {	
		$("#gifs").empty();

		var movie = $(this).attr("data-movie");

		// var rating = "r"; 
		// Would place "?rating=" + rating + in the URL below if I wanted to use it. 
		// Adding this parameter messes with the results too much so I decided to keep it out.
	    
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {

	      	var results = response.data;

	      	for (var i = 0; i < results.length; i++) {
	      		
	      		var newDiv = $("<div class='item text-center'>");

		      	var newImg = $("<img>");

		      	newImg.addClass("gif");
		      	newImg.attr("src", results[i].images.fixed_height_still.url);
		      	newImg.attr("data-status", "still");
		      	newImg.attr("data-animated", results[i].images.fixed_height.url);
		      	newImg.attr("data-still", results[i].images.fixed_height_still.url);

		      	newDiv.append(newImg);

		      	var rating = results[i].rating;

				var h3 = $("<h3>").text("GIF Rating: " + rating);

				newDiv.append(h3);

		      	$("#gifs").prepend(newDiv);
	      	}
	      });
	}
	
	function changeStatus(event){
					
			var status = $(event.target).attr("data-status");

			if (status === "still") {
				$(this).attr("src", $(this).attr("data-animated"));
		       $(this).attr("data-status", "animated");
		       console.log("Animated!");
		    } else{
		       $(this).attr("data-status", "still");	
		       $(this).attr("src", $(this).attr("data-still"));
		       console.log("Still!");
			}	
	}

	$("#submit").on("click", function() {
		event.preventDefault();

		var newMovie = $("#movieText").val().trim();

		movieArray.push(newMovie);

		$("#movieText").val(" ");

		newButton();
	});

	$(document).on("click", ".movies", gifShow);
	$(document).on("click", ".gif", changeStatus);

	newButton();

});