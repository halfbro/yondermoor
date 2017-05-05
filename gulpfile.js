var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-ruby-sass')
var eslint = require('gulp-eslint');
var sasslint = require('gulp-sass-lint');

var paths = {
  js: ['js/**/*.js'],
  css: ['css/**/*.scss', 'css/**/*.sass'],
};

gulp.task('js', () => {
  gulp.src(paths.js)
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
    }))
    .pipe(gulp.dest('build.js'))
});

gulp.task('css', () => {
  sass(paths.css)
    .on('error', sass.logError)
    .pipe(gulp.dest('build.css'));
});

gulp.task('lintjs', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lintcss', () => {
  return gulp.src(paths.css)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['lintjs', 'js']);
  gulp.watch(paths.css, ['lintcss', 'css']);
});

gulp.task('lint', ['lintjs', 'lintcss']);
gulp.task('build', ['js', 'css']);
gulp.task('default', ['lint', 'build']);
