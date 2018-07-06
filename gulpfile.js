const gulp = require('gulp')
const sass = require('gulp-sass')
const nano = require('gulp-cssnano')

const merge = require('merge-stream')

gulp.task('sass', () => {
  return gulp.src('./Content/Styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest('./Content/Styles'))
})

gulp.task('lib', () => {
  const bootstrapCss = gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.css.map',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map',
  ]).pipe(gulp.dest('./wwwroot/lib/bootstrap/dist/css'))

  const bootstrapJs = gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.js.map',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
  ]).pipe(gulp.dest('./wwwroot/lib/bootstrap/dist/js'))

  const jquery = gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.map'
  ]).pipe(gulp.dest('./wwwroot/lib/jquery/dist'))

  const fontawesomeCss = gulp.src([
    './node_modules/font-awesome/css/**.*'
  ]).pipe(gulp.dest('./wwwroot/lib/font-awesome/css'))
  
  const fontawesomeFonts = gulp.src([
    './node_modules/font-awesome/fonts/**.*'
  ]).pipe(gulp.dest('./wwwroot/lib/font-awesome/fonts'))

  return merge(bootstrapCss, bootstrapJs, jquery, fontawesomeCss, fontawesomeFonts)
})

gulp.task('sass:watch', () => {
  gulp.watch('./Content/Styles/**/*.scss', gulp.parallel('sass'))
})