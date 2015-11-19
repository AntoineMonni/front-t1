var gulp       = require('gulp'),
    handlebars = require('gulp-handlebars'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    concat     = require('gulp-concat'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    plumber    = require('gulp-plumber');

// Listen to changes
gulp.task('default', function() {
  gulp.watch( 'js/vendor/**/*.js', ['js_libs']);
  gulp.watch( 'js/app/**/*.js', ['js_app']);
  gulp.watch( 'sass/**/*.scss', ['sass']);
  gulp.watch( 'templates/**/*.tpl', ['handlebars']);
});

// JS Vendors
gulp.task('js_libs', function() {
  return gulp.src('js/vendor/**/*.js')
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(concat("vendors.js"))
        .pipe(gulp.dest('js/dist/'))
});

// JS App
gulp.task('js_app', function() {
  return gulp.src('js/app/**/*.js')
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(concat("app.js"))
        .pipe(gulp.dest('js/dist/'))
});

// Sass
gulp.task('sass', function(){
  return gulp.src( 'sass/**/*.scss' )
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(sass({
          indentedSyntax: false
        }))
        .pipe(gulp.dest( 'stylesheets/' ))
});

// Templates
gulp.task('handlebars', function(){
  gulp.src('templates/**/*.tpl')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'app_templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('js/dist/'));
});