// Array holding the current movies.
	var movieArray= ["Re-Animator", "Evil Dead", "Texas Chainsaw Massacre", "The Fly", "They Live", "City of the Living Dead", "Samurai Cop", "Riki-Oh"];

	newMovies = [];

$(document).ready(function() {
// Function that will create new buttons for anything the user searched.
	function newButton() {
		$("#newButtons").empty();
		// For loop will create a button for each movie within the movie array.
		for (var i = 0; i < newMovies.length; i++) {
			
			var newButton = $("<button class='btn btn-default movies'>");

			newButton.attr("data-movie", newMovies[i]);

			newButton.text(newMovies[i]);

			$("#newButtons").append(newButton);
		}
	}

	function oldButton() {
		// For loop will create a button for each movie within the movie array.
		for (var i = 0; i < movieArray.length; i++) {
			
			var movieButton = $("<button class='btn btn-default movies'>");

			movieButton.attr("data-movie", movieArray[i]);

			movieButton.text(movieArray[i]);

			$("#buttons").append(movieButton);
		}
	}
// Function for pulling data from Giphy API in order to create images and text on the page upon request.
	function gifShow() {	
		$("#gifs").empty();

		var movie = $(this).attr("data-movie");

		// var rating = "r"; 
		// Would place "?rating=" + rating + in the URL below if I wanted to use it. 
		// Adding this parameter messes with the results too much so I decided to keep it out.
	    
	    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	      $.ajax({
	        url: queryURL,
	        method: "GET"
	      }).done(function(response) {

	      	var results = response.data;	      	

	      	for (var i = 0; i < results.length; i++) {
	      		// Variable for creating a new div for each image and h3 element.
	      		var newDiv = $("<div class='item text-center'>");

		      	var newImg = $("<img>");
		      	// Added class, animated, still and data-status in order to allow the user to animate and pause the GIFs that appear.
		      	newImg.addClass("gif img-responsive");
		      	newImg.attr("src", results[i].images.fixed_height_still.url);
		      	newImg.attr("alt", "gif image here");
		      	newImg.attr("data-status", "still");
		      	newImg.attr("data-animated", results[i].images.fixed_height.url);
		      	newImg.attr("data-still", results[i].images.fixed_height_still.url);
				
				// Appends the new image to the newDiv.
		      	newDiv.append(newImg);

		      	var rating = results[i].rating;
		      	// Create an h3 element that contains the GIF rating.
				var h3 = $("<h3>").text("GIF Rating: " + rating);

				// Appends the h3 element to the newDiv.
				newDiv.append(h3);

				// Appends the newDiv element to the gif div located in the HTML.
		      	$("#gifs").prepend(newDiv);
	      	}
	      });
	}
	// Function responsible for changing the animation status of the GIF upon request.
	function changeStatus(event){
			//The GIF animation staus is set in the variable and is determined by the data-status. 
			var status = $(event.target).attr("data-status");

			if (status === "still") {
				$(this).attr("src", $(this).attr("data-animated"));
		       $(this).attr("data-status", "animated");
		    } else{
		       $(this).attr("data-status", "still");	
		       $(this).attr("src", $(this).attr("data-still"));
			}	
	}
	// When the user clicks the submit button...
	$("#submit").on("click", function() {
		event.preventDefault();

		// Takes the text entered in the text box.
		var newMovie = $("#movieText").val().trim();
		// Pushed the text entered into the existing movie array.
		newMovies.push(newMovie);
		// Makes the text entered in the text box go back to being blank.
		$("#movieText").val(" ");
		// Calls the function that creates a new button on the page.
		newButton();
	});

	// When the user clicks the submit button...
	$("#clear").on("click", function() {
		event.preventDefault();

		// Clears the array holding the newly added movies from previous session.
		newMovies = [];

		// Calls the function that clears the new buttons on the page.
		$("#newButtons").empty();
		
		// Clears the GIFS from the page.
		$("#gifs").empty();
	});
	// When someone clicks on the button with the class of ".movies", the function for the gifs to show will be called.
	$(document).on("click", ".movies", gifShow);
	// When someone clicks on the images with the class of ".gif", the function for the gifs to animate or stop will be called.
	$(document).on("click", ".gif", changeStatus);
// Calls the function that creates and displays buttons globally 
// so the buttons for the movies in the movie array will generate upon the page loading.
	oldButton();

});