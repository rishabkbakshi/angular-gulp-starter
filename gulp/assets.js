
const config = require('./config.json')

const gulp = require('gulp')
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");

// Optimize Images
const optimizeImages = () => {
    return gulp
        .src(config.path.src.assets + "**/*")
        .pipe(newer(config.path.temp.assets))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest(config.path.temp.assets));
}

const copyDev = () => {
    return gulp
        .src(config.path.src.assets + "**/*")
        .pipe(gulp.dest(config.path.temp.assets))
}

const copyDist = () => {
    return gulp
        .src(config.path.temp.assets + "**/*")
        .pipe(gulp.dest(config.path.dist.assets))
}

gulp.task('assets:dev', gulp.series(copyDev))
gulp.task('assets:dist', gulp.series(optimizeImages, copyDist))