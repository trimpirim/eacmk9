var gulp = require('gulp');
var webpack = require('gulp-webpack');
var feConfiguration = require('./config.frontend.js');
var beConfiguration = require('./config.backend.js');
var scss2Css = require('./gulps/scss-to-css.js');
var browserSync = require('browser-sync');
var config = require('./gulps/config')

gulp.task('webpack:frontend', function() {
  return gulp.src(feConfiguration.APP_DIR + '/' + feConfiguration.ENTRY_FILE)
    .pipe(webpack(require('./webpack.frontend.config.js')))
    .pipe(gulp.dest(feConfiguration.BUILD_DIR));
    // .pipe(browserSync.reload({stream: true}));
});

gulp.task('webpack:backend', function() {
  return gulp.src(beConfiguration.APP_DIR + '/' + beConfiguration.ENTRY_FILE)
    .pipe(webpack(require('./webpack.backend.config.js')))
    .pipe(gulp.dest(beConfiguration.BUILD_DIR));
    // .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss-to-css:backend', scss2Css({
    source: './src/backend/public/scss/admin.scss',
    dest: './public/css/'
}));

gulp.task('watch', ['webpack:frontend', 'webpack:backend', 'scss-to-css:backend'], function () {
    gulp.watch('src/backend/public/scss/**/*.scss', ['scss-to-css:backend']);
    gulp.watch(['src/frontend/**/*.js', 'src/frontend/**/*.vue'], ['webpack:frontend']);
    gulp.watch(['src/backend/public/js/**/*.js'], ['webpack:backend']);
});

gulp.task('browser-sync', function () {
    browserSync({
        proxy: config.browserSyncProxy
    });
});

gulp.task('default', ['watch', 'browser-sync']);