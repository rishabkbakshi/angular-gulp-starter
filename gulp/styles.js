const config = require('./config.json');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');

const mode = require('gulp-mode')({
    modes: ["production", "development"],
    default: "development",
    verbose: false
});

const cssDev = () => {
    return gulp
        .src(config.path.src.sass)
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" })).on('error', sass.logError)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.path.temp.css))
}

const vendorCss = () => {
    return gulp
        .src(config.path.src.vendorCss)
        .pipe(plumber())
        .pipe(concat('vendor.min.css'))
        .pipe(mode.development(gulp.dest(config.path.temp.css)))
        .pipe(mode.production(gulp.dest(config.path.dist.css)))
}

const cssDist = () => {
    return gulp
    .src(config.path.src.sass)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(concat('app.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(config.path.dist.css))
}


gulp.task("styles:dev", gulp.series(vendorCss, cssDev));
gulp.task("styles:dist", gulp.series(vendorCss, cssDist));


