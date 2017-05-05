const gulp = require('gulp');
const browserify = require('gulp-browserify');
const envify = require('gulp-envify');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const sasslint = require('gulp-sass-lint');
const concat = require('gulp-concat');

const process = require('process');
require('dotenv').config();

const paths = {
  js: ['js/**/*.js', 'js/**/*.jsx'],
  css: ['css/**/*.scss', 'css/**/*.sass'],
};

gulp.task('js', () => {
  gulp.src(paths.js)
    .pipe(browserify({
      insertGlobals : true,
      insertGlobalVars: {
        jQuery: () => 'require("jquery")',
        '$': () => 'require("jquery")',
        React: () => 'require("react")',
        ReactDOM: () => 'require("react-dom")',
      },
      debug : true,
    }))
    .pipe(envify(process.env))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('css', () => {
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./'));
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
