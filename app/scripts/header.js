/**
 * Constants
 */
var sidebarHidden = '-250px';
var sidebarShowing = '0';
var searchbarInitial = '100px';
var searchbarOffset = '350px';
var hamburgerInitial = '15px';
var hamburgerOffset = '275px';
var logoInitial = '45%';
var logoOffset = '50%';
var bodyInitial = '0';
var slideDuration = '500';

$(document).ready(function() {

	// Add listener to hamburger menu
	$('.hamburger').click(function(event) {
		showSidebar(event);
	});

	// Add listener to close button
	$('.close-btn').click(function(event) {
		hideSidebar(event);
	});

});

/**
 * Sidebar slide-out animation
 */
function showSidebar(event) {

	event.preventDefault();

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
	}, slideDuration)

}

/**
 * Sidebar slide-in animation
 */
function hideSidebar(event) {

	event.preventDefault();		
	
	// Animate sidebar
	$('.sidebar').animate({
		'left': sidebarHidden
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

	// Change close back to hamburger button
	$('.close-btn').hide();
	$('.hamburger').show();

}