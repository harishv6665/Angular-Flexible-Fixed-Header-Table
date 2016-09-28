var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    flatten = require('gulp-flatten'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('js', function () {
    return gulp.src([
        'src/app.js',
        'src/app.controller.js',
        '!src/**/*.compiled.js',
        'src/**/*.js',
        'libs/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist'));
});


gulp.task('css', function () {
    return gulp.src([
        'src/**/*.css'
    ])
        .pipe(concat("app.css"))
        .pipe(autoprefixer({
            browser: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('assets', function () {
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));

    gulp.src(['src/directives/**/*.html', 'src/components/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/views'));

    gulp.src(['src/**/*.json'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/json'));

    gulp.src(['src/images/**/*'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/images'));

    gulp.src(['src/fonts/**/*'])
        .pipe(flatten())
        .pipe(gulp.src('dist/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch([
        'src/**/*.html',
        'src/**/*.json',
        'src/images/**/*',
        'src/fonts/**/*'
    ], ['assets']);
});

gulp.task('clean', function (cb) {
    del(['dist/**'], cb);
});

gulp.task('default', ['js', 'css', 'assets', 'watch']);