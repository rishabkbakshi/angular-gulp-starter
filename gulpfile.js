"use strict";

const gulp = require('gulp')

const dev = require('./gulp/gulp-dev')
const production = require('./gulp/gulp-dist')

gulp.task('serve', gulp.series('build:dev'));
gulp.task('build', gulp.series('build:dist'));