'use strict';

var gulp = require('gulp')
  , connect = require('gulp-connect')
  , open = require('gulp-open')
  , concat = require('gulp-concat')
  , lint = require('gulp-eslint')
  , imagemin = require('gulp-imagemin')
  , pngquant = require('imagemin-pngquant')
  , uglify = require('gulp-uglify')
  , stylus = require('gulp-stylus')
  , minifycss = require('gulp-minify-css')
  , nib = require('nib')
  , header = require('gulp-header')
  , notify = require('gulp-notify')
  , ghPages = require('gulp-gh-pages');

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',

  paths: {
    html: './src/*'
    , css: [
      './src/assets/css/**/*.styl'
    ]
    , img: './src/assets/images/**/*'
    , fonts: './src/assets/fonts/**/*'
    , dist: './'
  }
}

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], () => {
  gulp.src('./index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload())
    .pipe(notify('HTML OK!'));
});

gulp.task('css', () => {
  gulp.src(config.paths.css)
    .pipe(stylus({ use: nib(), compress: true }))
    .pipe(minifycss())
    .pipe(concat('bundle.css'))
    .pipe(connect.reload())
    .pipe(gulp.dest(config.paths.dist + '/assets/css'))
    .pipe(notify('CSS OK!'));
});

gulp.task('images', () => {
  return gulp.src(config.paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.paths.dist + '/assets/images'));
});

gulp.task('fonts', () => {
  return gulp.src([config.paths.fonts])
    .pipe(gulp.dest(config.paths.dist + '/assets/fonts'));
});

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task ('default',[
  'html'
  , 'images'
  , 'fonts'
  , 'css'
  , 'open'
  , 'watch'
  ]);