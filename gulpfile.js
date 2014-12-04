var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
	gulp.watch('*.js', ['lint', 'test']);
});

gulp.task('lint', function () {
	return gulp.src('*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
	global.expect = require('chai').expect;
	return gulp.src('test.js', {
			read: false
		})
		.pipe(mocha({
			reporter: 'spec',
			globals: 'expect'
		}));
});