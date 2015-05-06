'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>


var gulp = require('gulp');
var fs = require('fs');
var less = require('gulp-less');
var concat = require('gulp-concat');
var bump = require('gulp-bump');
var git = require('gulp-git');
var rm = require('gulp-rm');
var rename = require('gulp-rename');
var sync = require('gulp-directory-sync');
var gutil = require('gulp-util');
var template = require('gulp-lazy-tpl');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence').use(gulp);
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var devMode = false;

// 清理之前生成的文件

gulp.task('default', function(callback) {
    runSequence(
        'clean:files',
        'style:less',
        'scripts:build',
        'styles:copy-font',
        'styles:copy-img',
        'watch',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('WATCHING...');
            }
            callback(error);
        });
});

gulp.task('clean:files', function() {
    return gulp.src(['./dist/**', './tmp/**'], {read : false}).pipe(rm({async : true}));
});

// 同步处理好的静态文件
gulp.task('demo:sync', function(callback) {
    runSequence(
        'style:less',
        'scripts:build',
        'styles:copy-font',
        'styles:copy-img',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('WATCHING...');
            }
            callback(error);
        });
    return gulp.src('')
        .pipe(sync('./dist', 'demo/page/assets', {printSummary : true}))
        .on('error', gutil.log);
});

// 处理page目录下的所有样式入口文件
gulp.task('style:less', function() {
    var dirPath = './src/style/page/';
    var pageLess = fs.readdirSync(dirPath);
    while (pageLess.length) {
        var file = pageLess.shift();
        var minFile = file.split('.');
        minFile.splice(minFile.length - 1, -1, 'min');
        minFile[minFile.length - 1] = 'css';
        minFile = minFile.join('.');
        if (file.match(/.+\.less$/)) {
            gulp.src(dirPath + file)
                .pipe(less({'compress' : !devMode}))
                .pipe(gulp.dest('./dist/css'))
                .pipe(gulpif(!devMode, sourcemaps.init()))
                .pipe(minifyCss({compatibility : 'ie8'}))
                .pipe(concat(minFile))
                .pipe(gulpif(!devMode, sourcemaps.write()))
                .pipe(gulp.dest('./dist/css'));
        }
    }
    return gulp;
});

// 处理page目录下的所有脚本入口文件
gulp.task('scripts:build', ['scripts:template'], function() {
    var curDate = new Date();
    var sign = ['/*! Build Date:', curDate.toTimeString(), curDate.toDateString(), '*/'].join(' ');

    var dirPath = './src/js/page/';
    var pageJs = fs.readdirSync(dirPath);
    while (pageJs.length) {
        var file = pageJs.shift();
        var minFile = file.split('.');
        minFile.splice(minFile.length - 1, -1, 'min');
        minFile = minFile.join('.');

        if (file.match(/.+\.js$/)) {
            gulp.src(dirPath + file)
                .pipe(cached('scripts'))
                .pipe(browserify({insertGlobals : true}))
                .pipe(concat(file))
                .pipe(gulp.dest('./dist/js'))
                .pipe(gulpif(!devMode, sourcemaps.init()))
                .pipe(uglify()).on('error', gutil.log)
                .pipe(gulpif(!devMode, replace(/^!f/, sign + '\n!f')))
                .pipe(concat(minFile))
                .pipe(remember('scripts'))
                .pipe(gulpif(!devMode, sourcemaps.write()))
                .pipe(gulp.dest('./dist/js/'));
        }
    }
    return gulp;
});

// 编译脚本文件
gulp.task('scripts:template', function() {
    gulp.src('./src/js/tpl/**/*.js', {read : false})
        .pipe(rm({async : false}));

    return gulp.src('./src/js/tpl/**/*.html')
        .pipe(template('doT', {mode : 'commonjs', commentHeader : true}))
        .pipe(rename({extname : '.js'}))
        .pipe(gulp.dest('./src/js/tpl/'));
});

// 复制所有的字体
gulp.task('styles:copy-font', function() {
    return gulp.src('./src/font/**/*')
        .pipe(gulp.dest('./dist/font'));
});

// 复制所有的图片
gulp.task('styles:copy-img', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', function() {
    var files = gulp.watch(['./src/**/*', '!./src/js/tpl/*.js'], function(event){
        if(event.path.match(/.*src\/tpl\/.*\.js$/)){
            return false;
        }else{
            runSequence('style:less',
                'scripts:build',
                'styles:copy-font',
                'styles:copy-img');
            gulp.src('')
                .pipe(sync('./dist', 'demo/page/assets', {printSummary : true}))
                .on('error', gutil.log);
        }
    });

    files.on('change', function(event) {
        console.log(event.type);
        if (event.type === 'deleted') {
            delete cached.caches.scripts[event.path];
            remember.forget('scripts', event.path);
        }
    });
});

gulp.task('bump-version', function() {
    return gulp.src('./package.json')
        .pipe(bump({type : 'patch'}).on('error', gutil.log))
        .pipe(gulp.dest('./dist'));
});

gulp.task('commit-changes', function() {
    return gulp.src('.').pipe(git.commit('[Prerelease] Bumped version number', {args : '-a'}));
});

gulp.task('push-changes', function(cb) {
    git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function(cb) {
    var version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    git.tag(version, 'Created Tag for version: ' + version, function(error) {
        if (error) {
            return cb(error);
        }
        git.push('origin', 'master', {args : '--tags'}, cb);
    });
});

gulp.task('release', function(callback) {
    runSequence(
        'bump-version',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});
