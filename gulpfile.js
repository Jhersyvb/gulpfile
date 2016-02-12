var gulp = require('gulp');
var args = require('yargs').argv;
var nib = require('nib');
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function() {
	log('Analyzing source with JSHint and JSCS.');

	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function () {
	log('Compiling Stylus -> CSS');

	return gulp
		.src(config.stylus)
		.pipe($.stylus({
			compress: true,
			use: nib()
		}))
		.pipe(gulp.dest(config.temp));
});

function log(msg) {
	if (typeof(msg)==='object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
