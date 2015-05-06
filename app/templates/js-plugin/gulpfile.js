'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rm = require('gulp-rm');
var rename = require('gulp-rename');
var sync = require('gulp-directory-sync');
var gutil = require('gulp-util');
var template = require('gulp-lazy-tpl');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var watchify = require('watchify');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');

var devMode = true;

gulp.task('default', ['clean:dist'], function() {});


gulp.task('style:less', function() {
    return gulp.src('./src/style/index.less')
        .pipe(less({'compress' : !devMode}))
        .pipe(gulp.dest('./asset/css'));
});


gulp.task('scripts:template', function() {

    gulp.src('./src/js/tpl/**/*.js', {read : false})
        .pipe(rm({async : false}));

    return gulp.src('./src/js/tpl/**/*.html')
        .pipe(template('doT', {}))
        .pipe(rename({extname : '.js'}))
        .pipe(gulp.dest('./src/js/tpl/'));
});


gulp.task('styles:copy-font', function() {
    return gulp.src('./src/font/**/*')
        .pipe(gulp.dest('./asset/font'));
});


gulp.task('scripts:build', ['scripts:template'], function() {

    var curDate = new Date();
    var sign = ['/*! Build Date:', curDate.toTimeString(), curDate.toDateString(), '*/'].join(' ');

    return gulp.src('./src/js/page/app.js')
        .pipe(browserify({insertGlobals : true}))
        .pipe(gulpif(!devMode, replace(/\n/g, '')))
        .pipe(gulpif(!devMode, replace(/^!f/, sign + '\n!f')))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./asset/js'));
});

gulp.task('demo:sync', ['style:less', 'scripts:build', 'styles:copy-font'], function() {

    return gulp.src('')
        .pipe(sync('./asset', 'demo/page/assets', {printSummary : true}))
        .on('error', gutil.log);

});

gulp.task('demo:sync-scripts', ['scripts:build'], function() {

    return gulp.src('')
        .pipe(sync('./asset/js', 'demo/page/assets/js', {printSummary : true}))
        .on('error', gutil.log);

});

gulp.task('demo:sync-styles', ['style:less', 'styles:copy-font'], function() {

    return gulp.src('')
        .pipe(sync('./asset/css', 'demo/page/assets/css', {printSummary : true}))
        .on('error', gutil.log);

});



gulp.task('clean:dist', ['clean:tmp'], function() {

    return gulp.src('./dist/**', {read : false}).pipe(rm({async : false}));

});

gulp.task('clean:tmp', ['demo:sync'], function() {

    return gulp.src('./tmp/**', {read : false}).pipe(rm({async : false}));

});


gulp.task('watch', function () {
    var jsFiles = gulp.watch('./src/js/**/*', ['demo:sync-scripts']);
    var cssFiles = gulp.watch('./src/style/**/*', ['demo:sync-styles']);

    jsFiles.on('change', function (event) {
        console.log(event.type);
    });
    cssFiles.on('change', function (event) {
        console.log(event.type);
    });


});