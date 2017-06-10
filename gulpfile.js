/**
 * Gulp modules
 */
var gulp = require('gulp');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

/**
 * Location constants
 */

// Views
var views = 'app/pugfiles/*.pug';
var viewsMain = 'app/pugfiles/index.pug';
var viewOutputDev = 'app';
var viewOutputProd = 'dist';

// Styles
var styles = 'app/sass/*.sass';
var stylesMain = 'app/sass/main.sass';
var styleOutputDev = 'app/css';
var styleOutputProd = 'dist/css';

// Javascript
var js = 'app/scripts/*.js';
var jsOutputDev = 'app';
var jsOutputProd = 'dist';

// Images
var images = 'app/images/*';
var imageOutput = 'dist/images';

/**
 * Gulp tasks
 */

// Compile and minify pugfiles
gulp.task('pug', function() {
	return gulp.src(viewsMain)
	.pipe(pug({}))
	.pipe(gulp.dest(viewOutputDev))
	.pipe(gulp.dest(viewOutputProd))
	.pipe(browserSync.stream());
});

// Compile, minify and prefix sass
gulp.task('sass', function() {
	return gulp.src(stylesMain)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer())
	.pipe(rename('styles.css'))
	.pipe(gulp.dest(styleOutputDev))
	.pipe(gulp.dest(styleOutputProd))
	.pipe(browserSync.stream());
});

// Minify and concat javascript
gulp.task('js', function() {
	return gulp.src(js)
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(jsOutputDev))
	.pipe(gulp.dest(jsOutputProd))
});

// Copy images to dist
gulp.task('images', function() {
	return gulp.src(images)
	.pipe(gulp.dest(imageOutput));
});

// Watch files for changes
gulp.task('serve', function() {

	// Initialize BrowserSync
	browserSync.init({
		server: "app"
	});
	
	// Run scripts on change
	gulp.watch(views, ['pug']);
	gulp.watch(styles, ['sass']);
	gulp.watch(js, ['js']);

	// Reload when index.pug changes
	gulp.watch(viewsMain).on('change', browserSync.reload);

});

// Inital task run 
gulp.task('build', ['pug', 'sass', 'js', 'images']);

// Default task
gulp.task('default', ['build', 'serve']);