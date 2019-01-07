const config = require('./config.json')
const styles = require('./styles')

const gulp = require('gulp')
const del = require("del")

const clean = () => del([config.path.temp.root + '**/*']);

gulp.task('clean:dev', clean);

gulp.task("build:dev", gulp.series(
    // 'clean:dev',
    "styles:dev"
));