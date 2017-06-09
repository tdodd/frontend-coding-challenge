/**
 * Add listeners on page load
 */
$(document).ready(function() {

	// Add listener to main search input
	$('#search-input').on('keyup', function(event) {

		event.preventDefault();

		// Check if search is empty
		if ($('#search-input').val() == '') {

			$('.error').show();

		} else {

			// Perform search when enter is pressed
			if (event.key === 'Enter') {
				search($('#search-input').val());
			}

		}

	});

	// Add listener to search icon
	$('#search-icon').click(function(event) {
		event.preventDefault();
		search($('#search-input').val());
	});

	// Add listener to category images
	$('.product-image, .product-name').click(function(event) {
		event.preventDefault();
		search(event.target.attributes.category.value);
	});

	// Add listener to error message
	$('.glyphicon-remove').click(function(event) {
		event.preventDefault();
		$('.error').hide();
	});

	

}); // document.ready

/**
 * Sends a GET request containing the search query to the API.
 * @param {string} query The search term
 */
function search(query) {

	// Clear previous search results
	$('.results').html('');

	// Show loading animations
	$('.products').fadeOut('fast');
	$('.loading').fadeIn('fast');

	// API endpoint
	var url = 'https://cloudplatform.coveo.com/rest/search?access_token=058c85fd-3c79-42a3-9236-b83d35588103&q=';

	// Send GET request
	$.ajax({
		url: url + query,
	})

	// Handle JSON response
	.done(function(data) {

		// Hide loading animation
		$('.loading').hide();

		// If results are found
		if (data.results.length > 0) {

			// Convert query duration to seconds
			var duration = data.duration / 1000;

			// Set results header text
			$('.results-header').text(data.results.length + ' results found for "'+query+'" in '+duration+' seconds.');

			// Loop through results
			$.each(data.results, function(index, result) {
				var newResult = pretty(result, index);
				$('.results').append(newResult);
			});

		} else { // No results found
			$('.results-header').text('No results found.');
		}

	});

}

/**
 * Format a search result
 * @param  {obj} result A search result returned by an API call
 * @param  {number} index The index in the 'results' array
 * @return {obj} The formatted result
 */
function pretty(result, index) {

	var prettyResult = '';

	// Add id
	prettyResult += '<div class="result" id="result-'+index+'">';
	
	// Check if title fits on 2 lines
	if (result.Title.length <= 40) {

		prettyResult += '<div class="result-title"><a target="_blank" href="'+result.ClickUri+'">'+result.Title+'</a></div>';
	
	} else { // Shorten title and add ellipses

		var shortTitle = result.Title.slice(0,25) + '...';
		prettyResult += '<div class="result-title"><a target="_blank" href="'+result.ClickUri+'">'+shortTitle+'</a></div>';

	}

	// Thumbnail
	prettyResult += '<img src="'+result.raw.tpthumbnailuri+'" class="result-thumbnail" height="150">';
	
	// Details
	prettyResult += '<div class="result-details">';
	prettyResult += '<div class="result-category">Category: '+result.raw.tpcategorie+'</div>';
	
	// Check if result has a region
	if (result.raw.tpregion) {
		prettyResult += '<div class="result-region">Region: '+result.raw.tpregion+'</div>';
	}
	
	// SAQ Code
	prettyResult += '<div class="result-code">SAQ Code : '+result.raw.tpcodesaq+'</div>';
	prettyResult += '</div>';
	
	// Price
	prettyResult += '<div class="result-price">'+result.raw.tpprixnormal+'<div/>';
	prettyResult += '</div>';

	return prettyResult;

}