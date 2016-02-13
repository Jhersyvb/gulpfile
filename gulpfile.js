var gulp   = require('gulp');
var args   = require('yargs').argv;
var del    = require('del');
var nib    = require('nib');
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

gulp.task('styles', ['clean-styles'], function () {
	log('Compiling Stylus -> CSS');

	return gulp
		.src(config.stylus)
		.pipe($.plumber())
		.pipe($.stylus({
			compress: true,
			use: nib()
		}))
		.pipe(gulp.dest(config.styles));
});

gulp.task('clean-styles', function () {
	var files = config.styles + '*.css';
	clean(files);
});

gulp.task('stylus-watcher', function () {
	gulp.watch([config.stylus], ['styles']);
});

function clean (path) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path);
}

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
