'use strict';

const gulp = require('gulp')
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
  , htmlmin = require('gulp-htmlmin')
  , path = require('path')
  , svgSprite = require('gulp-svg-sprite');

const config = {
  port: 3001,
  devBaseUrl: 'http://localhost',

  paths: {
    html: './src/*'
    , css: [
      './src/assets/css/**/*.styl'
    ]
    , js: [
      './src/assets/js/**/*.js'
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
  return gulp.src(config.paths.html+'.html')
    .pipe(htmlmin({collapseWhitespace: true}))
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

gulp.task('js', () => {
  gulp.src(config.paths.js)
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/assets/js'))
    .pipe(connect.reload())
    .pipe(notify('JS OK!'));;
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
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task ('default',[
  'html'
  , 'js'
  , 'images'
  , 'fonts'
  , 'css'
  , 'open'
  , 'watch'
  ]);
