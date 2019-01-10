const config = require('./config.json')
const styles = require('./styles')

const gulp = require('gulp')
const del = require("del")

const clean = () => del([config.path.dist.root + "**/*"]);

gulp.task('clean:dist', clean);

gulp.task("build:dist", gulp.series(
    'clean:dist',
    "styles:dist",
    "assets:dist"
));