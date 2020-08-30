/*jslint node */
/*globals */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Turn Sass into CSS,
// and reload browser on changes
gulp.task('sass', function () {
    'use strict';

    return gulp.src('src/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy HTML to public,
// and reload browser on changes
gulp.task('html', function () {
    'use strict';

    return gulp.src('src/index.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy JS to public,
// and reload browser on changes
gulp.task('js', function () {
    'use strict';

    return gulp.src('src/main.js')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Serve and watch Sass and HTML
gulp.task('serve', function () {
    'use strict';

    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
});

// Watch for changes
gulp.task('watch', gulp.parallel('serve', function () {
    'use strict';

    gulp.watch('src/main.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch('src/*.js', gulp.series('js'));
}));

// Default task
gulp.task('default', gulp.series('watch'));
