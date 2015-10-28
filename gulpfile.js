var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var reload = require("gulp-livereload");
var rimraf = require("rimraf");

function dest() {
  return gulp.dest("./dist");
}

function minRename() {
  return rename(function(path) { path.extname = ".min" + path.extname; });
}

gulp.task("dev", ["build"], function() {
  reload.listen()
  gulp.watch("./src/**/*", ["build"]);
  gulp.watch("./dist/**/*", reload.changed);
});

gulp.task("build", ["clean", "js", "sass"]);

gulp.task("clean", function(cb) {
  rimraf.sync("./dist");
  cb();
});

gulp.task("js", function() {
  return gulp.src("./src/**/*.js")
    .pipe(dest())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on("error", console.error.bind(console))
    .pipe(minRename())
    .pipe(sourcemaps.write())
    .pipe(dest());
});

gulp.task("sass", function() {
  return gulp.src("./src/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest())
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(minRename())
    .pipe(sourcemaps.write())
    .pipe(dest());
});
