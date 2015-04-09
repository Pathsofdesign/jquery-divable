var gulp = require('gulp'),
    concat = require('gulp-concat'),
    subtree = require('gulp-subtree'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify');

var SRC = './src/',
    BUILD = './build/';

gulp.task('minifyjs', function() {
    return gulp.src(SRC + 'js/jquery-divable.js')
        .pipe(streamify(uglify()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(SRC + 'js'));
    });


/**
 * Master Tasks
 **/
gulp.task('build', function(callback) {
    // runSequence runs tasks in sequence to keep things straight forward
    return runSequence(['minifyjs'], callback);
});


// Just build it
gulp.task('default', ['build']);

// Deploy to GH pages
gulp.task('temp', ['build'], function() {
    return gulp.src(SRC + '/**/*')
        .pipe(gulp.dest(BUILD));
});

gulp.task('deploy', ['temp'], function() {
    return gulp.src(BUILD)
        .pipe(subtree())
        .pipe(clean());
});
