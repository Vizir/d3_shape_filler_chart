var gulp = require('gulp'),
    connect = require('gulp-connect');
    uglify = require('gulp-uglify');
    less = require('gulp-less');
    rename = require('gulp-rename');

gulp.task('connect', ['html', 'js', 'less', 'img'],function() {
  connect.server({
    root: "dist",
    port: 8989
  });
});

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src(['./src/d3_shape_filler_chart.js', './bower_components/d3/d3.min.js'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('less', function() {
  return gulp.src('./src/d3_shape_filler_chart.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
  return gulp.src(['./src/*.svg'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/d3_shape_filler_chart.js'], ['js']);
  gulp.watch(['./src/d3_shape_filler_chart.less'], ['less']);
  gulp.watch(['./index.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
