var gulp       = require('gulp');
var config     = require('./gulp.config')();

var args       = require('yargs').argv;
var del        = require('del');
var koutoSwiss = require('kouto-swiss');
var nib        = require('nib');

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

gulp.task('scripts', ['compile-scripts'], function () {
	log('Build Javascripts *.js -> ' + config.optimized.script.name);

	return gulp
		.src(config.temp + config.scripts.dest + '*.js')
		.pipe($.concat(config.optimized.script.name))
		.pipe(gulp.dest(config.dest + config.scripts.dest));
});

gulp.task('compile-scripts', ['clean-scripts'], function () {
	log('Compiling Javascripts -> *.js');

	var files = config.dest + config.scripts.dest + '*.js';
	clean(files);

	return gulp
		.src(config.src + config.scripts.src)
		.pipe($.if('*.js', $.uglify()))
		.pipe(gulp.dest(config.temp + config.scripts.dest));
});

gulp.task('clean-scripts', function () {
	var files = config.temp + config.scripts.dest + '*.js';
	clean(files);
});

gulp.task('watch-scripts', function () {
	gulp.watch([config.src + config.scripts.src], ['scripts']);
});

gulp.task('styles', ['compile-styles'], function () {
	log('Build Styles *.css -> ' + config.optimized.style.name);

	return gulp
		.src(config.temp + config.styles.dest + '*.css')
		.pipe($.concat(config.optimized.style.name))
		.pipe(gulp.dest(config.dest + config.styles.dest));
});

gulp.task('compile-styles', ['clean-styles'], function () {
	log('Compiling Stylus -> CSS');

	var files = config.dest + config.styles.dest + '*.css';
	clean(files);

	return gulp
		.src(config.src + config.styles.src)
		.pipe($.plumber())
		.pipe($.stylus({
			compress: true,
			use: [
				nib(),
				koutoSwiss()
			]
		}))
		.pipe(gulp.dest(config.temp + config.styles.dest));
});

gulp.task('clean-styles', function () {
	var files = config.temp + config.styles.dest + '*.css';
	clean(files);
});

gulp.task('watch-styles', function () {
	gulp.watch([config.src + config.styles.src], ['compile-styles']);
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
