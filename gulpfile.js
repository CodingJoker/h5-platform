/**
* @Author: Jumorzhu
* @Date:   2017-01-09
* @Email:  550928460@qq.com
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-10
*/
var
  gulp = require('gulp')
  ,webpack = require('gulp-webpack')
  ,browserSync = require('browser-sync').create()
  ,webpackConfig = require('./webpack.config')
;

gulp.task('webpack',function(){
  return gulp.src('src/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/'));
});

gulp.task('server',['webpack'], function() {
    browserSync.init({
        open: "local",
        server: {
            baseDir: "src",
            index: "index.html"
        }
    });
    gulp.watch(['src/**']).on('change',browserSync.reload);
});
