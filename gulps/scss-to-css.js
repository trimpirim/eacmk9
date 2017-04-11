var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var scss2Css = function(options) {
    var parseOptions = function(options) {
        options = options || {};
        options.source = options.source || helper.getArg('--source') || './public/scss/**/*.scss';
        options.dest = options.dest || helper.getArg('--dest') || './public/css';
        return options;
    };

    return function() {
        options = parseOptions(options);
        var stream = gulp.src(options.source)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: [
                    'Android >= 4',
                    'Chrome >= 35',
                    'Firefox >= 40',
                    'Explorer >= 9',
                    'iOS >= 9',
                    'Opera >= 30',
                    'Safari >= 9'
                ]
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.dest))
            .pipe(browserSync.reload({stream: true}));
        return stream;
    }
}

module.exports = scss2Css;