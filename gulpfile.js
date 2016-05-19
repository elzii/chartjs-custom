/**
 * Modules
 */
var gulp       = require('gulp'),
    stylus     = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps');
 
// Get one .styl file and render 
// gulp.task('one', function () {
//   return gulp.src('./css/one.styl')
//     .pipe(stylus())
//     .pipe(gulp.dest('./css/build'))
// })


gulp.task('styles', function () {
  return gulp.src('./css/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'))
})



/**
 * TASK: Watch
 */
gulp.task('watch', function() {
  gulp.watch(['./css/**/*.styl'], ['styles'])
})

gulp.task('default', [
  'styles', 
  'watch'
], function() {
  // Do stuff during default task
})