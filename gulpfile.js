var gulp = require('gulp');
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
    watch = require('gulp-watch')
    gutil = require('gulp-util')

//默认执行default任务，并执行监听任务
gulp.task('default', ['watch'], function() { 
    // gulp.start('styles', 'scripts', 'images');
});

//watch任务：侦听js文件执行 build 任务
gulp.task('watch', function () {
   gulp.watch('src/*.js', ['build']);//侦听js文件执行 build 任务
});

//build任务：压缩js | js重命名 | 压缩
gulp.task('build', function() { 
    gulp.src('./src/iNotify.js')
        .pipe(uglify())
        .on('error',gutil.log)//这里捕获错误
        .pipe(rename({
            extname:'.min.js'
        }))
        .pipe(gulp.dest('./build/'));
});