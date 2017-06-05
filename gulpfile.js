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
var jsMain = 'app/scripts/main.js';
var jsOutputDev = 'app/scripts';
var jsOutputProd = 'dist/scripts';

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

// Compile and prefix sass
gulp.task('sass', function() {
	return gulp.src(stylesMain)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer())
	.pipe(rename('styles.css'))
	.pipe(gulp.dest(styleOutputDev))
	.pipe(gulp.dest(styleOutputProd))
	.pipe(browserSync.stream());
});

// Watch files for changes
gulp.task('serve', function() {
	// Initialize BrowserSync
	browserSync.init({
		server: "app"
	});
	
	// Watch all subfiles
	gulp.watch(views, ['pug']);
	gulp.watch(styles, ['sass']); 

	// Reload when index.pug changes
	gulp.watch(viewsMain).on('change', browserSync.reload);
});

// Inital task run 
gulp.task('build', ['pug', 'sass']);

// Default task
gulp.task('default', ['build', 'serve']);