var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var gulpWebpack = require('gulp-webpack');



var src = {
    html: 'src/html/*.html',
    style: 'style/index.less',
    js: 'src/*'
}

var dist = {
    root: 'dist/',
    html: 'dist/',
    style: 'dist/'
}

gulp.task('less', function() {
    return gulp.src(src.style)
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(gulp.dest(dist.style));
})

gulp.task('webpack', function() {
    return gulp.src(src.style)
        .pipe(gulpWebpack(require('./webpack.config')))
        .pipe(gulp.dest(dist.root));
});


gulp.task('default', function() {
    gulp.run('less', 'webpack');

    gulp.watch(src.js, function  () {
        gulp.run('less', 'webpack');
    })

    gulp.watch(src.style, function  () {
        gulp.run('less', 'webpack');
    })

})