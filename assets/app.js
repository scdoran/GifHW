// Loads when the web page is ready.
$(document).ready(function() {

	// Array where movie names are stored.
	var buttonArray= ["Re-Animator", "Evil Dead", "Texas Chainsaw Massacre", "The Fly", "They Live", "Dead Alive", "Samurai Cop", "Riki-Oh"];

// function newButton(){
// For loop to create buttons for each element in the array.
		for (var i = 0; i < buttonArray.length; i++) {
			
			var newButton = $("<button>").attr("data-movie");

			newButton.attr("class", "btn btn-default");

			$("#button").append(newButton);
		}
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
	      	var results = response.data;

	      	updateDisplay();
 
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

	function() updateDisplay {
		$(".item").empty();
	}
});