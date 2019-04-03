const gulp  = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

var sass    = require("gulp-sass");


//  Watch folders for changes
gulp.task("watch", function() {
  gulp.watch('./assets/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./assets/js/**/*.js', gulp.parallel('js'));
});


gulp.task('js', function() {
  return gulp.src("./assets/js/**/*.js")
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./_includes/js'));
});

gulp.task('css', function() {
  return gulp.src('assets/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })
  .on('error', sass.logError))
  .pipe(gulp.dest('./_includes/css'));
});

gulp.task('images', () =>
  gulp.src('assets/images/*')
  .pipe(imagemin({
    optimizationLevel: 8
  }))
  .pipe(gulp.dest('_site/assets/images'))
  );

// BUILD
gulp.task('build', gulp.parallel(
  'css',
  'js',
  'images'
  ));

// BUILD AND WATCH
gulp.task('dev', gulp.series(
  'build',
  'watch'
  ));