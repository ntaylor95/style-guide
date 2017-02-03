var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var fs = require('fs');
var watchLess = require('gulp-watch-less');
var resources = require('gulp-resources');

gulp.task('less', function() {
  if (fs.existsSync('./app/assets/css/styles.less')) {
    console.log("File exists");
  } else {
    console.log("File does not exist.");
  }

  return gulp.src('./app/assets/css/*.less')
  //.pipe(watchLess(['./app/assets/css/*.less', './app/assets/css/less-varaibles/*.less']))
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('less:watch', function() {
  //gulp.watch(['./app/assets/css/*.less', './app/assets/css/less-varaibles/*.less'],['less']);
});

/**gulp.task('default', ['less','less:watch']);**/

gulp.task('default', ['watch']);

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
  gulp.watch(["./app/*.ts"], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['./app/assets/css/*.less', './app/assets/css/less-varaibles/*.less'],['less']);
  gulp.watch(["./app/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});
