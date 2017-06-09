/**
 * Constants
 */

// Sidebar
var sidebarHidden = '-250px';
var sidebarShowing = '0';

// Searchbar
var searchbarInitial = '100px';
var searchbarOffset = '350px';

// Hamburger menu button
var hamburgerInitial = '15px';
var hamburgerOffset = '275px';

// SAQ logo
var logoInitial = '45%';
var logoOffset = '50%';

// Page body
var bodyInitial = '0';

// Animation duration
var slideDuration = '500';

// Sidebar status (initially hidden)
var sidebarShowing = false;

/**
 * On page load
 */
$(document).ready(function() {

	// Add listener to hamburger menu button
	$('.hamburger').click(function(event) {
		toggleSidebar(event);
	});

	// Set price label
	$('#price').on('mousemove', function() {
		$(".price-value").text($('#price').val() + '$');
	});

});

/**
 * Toggle the sidebar
 */
function toggleSidebar(event) {

	event.preventDefault();

	// Show the sidebar
	if (!sidebarShowing) {

		// Move hamburger
		$('.hamburger').animate({
			'left': hamburgerOffset
		}, slideDuration);

		// Move searchbar and body over
		$('.searchbar, .container').animate({
			'padding-left': searchbarOffset
		}, slideDuration);

		// Move logo
		$('.overlay-logo').animate({
			'left': logoOffset
		}, slideDuration);

		// Animate sidebar
		$('.sidebar').animate({
			'left': sidebarShowing
		}, slideDuration);

		// Toggle state
		sidebarShowing = true;

	} else { // Hide the sidebar

		// Animate sidebar
		$('.sidebar').animate({
			'left': sidebarHidden
		}, slideDuration);

		// Re-position hamburger to inital
		$('.hamburger').animate({
			'left': hamburgerInitial
		}, slideDuration);

		// Re-position searchbar to inital
		$('.searchbar').animate({
			'padding-left': searchbarInitial
		}, slideDuration);

		// Re-position body to inital
		$('.container').animate({
			'padding-left': bodyInitial
		}, slideDuration);

		// Re-position logo to inital
		$('.overlay-logo').animate({
			'left': logoInitial
		}, slideDuration);

		// Toggle state
		sidebarShowing = false;

	}

}