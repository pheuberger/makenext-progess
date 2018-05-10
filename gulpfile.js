var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var sass = require('gulp-sass')

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

})

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./stylesheets/'))

    gulp.src([
        './node_modules/font-awesome/css/*'
      ])
      .pipe(gulp.dest('./stylesheets/font-awesome/css'))


    gulp.src([
        './node_modules/font-awesome/fonts/*'
      ])
      .pipe(gulp.dest('./stylesheets/font-awesome/fonts'))
});

// Default task
gulp.task('default', ['vendor', 'styles']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./stylesheets/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./scripts/bundled.js', browserSync.reload)
  gulp.watch('sass/**/*.scss',['styles']);
});
