/**
 * Add listeners on page load
 */
$(document).ready(function() {

	// Advanced search options
	var options = {};

	// Add listener to sidebar search
	$('.sidebar-search-input').on('keyup', function(event) {

		event.preventDefault();
		if (event.key === 'Enter') {
			var price = ($('#price')[0].valueAsNumber + 1);
			advancedSearch($('.sidebar-search-input').val(), options, price);
		}

	});

	// Add listeners to checkboxes
	$('.sidebar-input').click(function() {

		var col = $(this).attr('dbcol');
		var val = $(this).attr('value');
		options[col] = val;

	});

});

/**
 * Perform a more specific serach
 * @param  {string} query The search term
 * @param  {obj} options A list of key-value search options
 */
function advancedSearch(query, options, maxPrice) {

	// Clear previous search results
	$('.results').html('');

	// Show loading animations
	$('.products').fadeOut('fast');
	$('.loading').fadeIn('fast');

	// API endpoint
	var url = 'https://cloudplatform.coveo.com/rest/search?access_token=058c85fd-3c79-42a3-9236-b83d35588103&q=';

	// Append search query
	url += query+ ' ';

	// Append max price
	url += '@tpprixnum<' + maxPrice;

	// Append options
	if (options) {
		for (var key in options) {
			url += ' @'+key+'=='+options[key];
		}
	}

	// Send GET request
	$.ajax({
		url: url,
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
	
	// Price rounded to 2 decimal points
	var resultPrice = parseFloat(Math.round(result.raw.tpprixnum * 100) / 100).toFixed(2);
	prettyResult += '<div class="result-price">'+resultPrice+'$<div/>';
	prettyResult += '</div>';

	return prettyResult;

}