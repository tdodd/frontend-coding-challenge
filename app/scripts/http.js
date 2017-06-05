$(document).ready(function() {

	// Add listener to search input
	$('#search-input').on('keyup', function(event) {

		event.preventDefault();

		// Perform search when enter is pressed
		if (event.key === 'Enter') {
			search($('#search-input').val());
		}

	});

	// Add listener to search icon
	$('#search-icon').click(function(event) {
		event.preventDefault();
		search($('#search-input').val());
	});

	// Add listener to categories
	$('.product-image, .product-name').click(function(event) {
		event.preventDefault();
		searchByCategory(event.target.attributes.category.value);
	});

});

/**
 * Sends a GET request containing the search query to the API.
 * @param {string} query the search term
 * @return the data returned by the query
 */
function search(query) {

	// Show loading animation
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
		console.log(data);

		// Hide loading animation
		$('.loading').hide();

		// If results are found
		if (data.results.length > 0) {

			// Convert query duration to seconds
			var duration = data.duration / 100;

			// Set results header text
			$('.results-header').text(data.results.length + ' results found for "'+query+'" in '+duration+' seconds.');

			// Loop through results
			$.each(data.results, function(index, result) {
				console.log(result)
				var newResult = '<div class="result" id="result-'+index+'">';
				newResult += '<div class="result-title"><a href="'+result.ClickUri+'">'+result.Title+'</a></div>';
				newResult += '<img src="'+result.raw.tpthumbnailuri+'" class="result-thumbnail" width="150">';
				newResult += '<div class="result-price">'+result.raw.tpprixnormal+'<div/>';
				newResult += '<div class="result-category">'+result.raw.tpcategorie+'<div/>';
				newResult += '</div>';
				$('.results').append(newResult);
			});

		} else { // No results found
			$('.results-header').text('No results found.');
		}

	});

}

/**
 * Perform a search query by category
 * @param  {string} query the category to search
 */
function searchByCategory(cat) {

	// API endpoint
	var url = 'https://cloudplatform.coveo.com/rest/search?access_token=058c85fd-3c79-42a3-9236-b83d35588103&q=@tpcepagenomsplitgroup==';

	// Send GET request
	$.ajax({
		url: url + cat,
	})

	// Handle JSON response
	.done(function(data) {

		console.log(data)

	});

}