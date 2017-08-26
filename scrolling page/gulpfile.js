var gulp = require('gulp'),
  yuidoc = require('gulp-yuidoc'),
  uncomment = require('gulp-uncomment');

tasks = [
  'uncomment',
  'yuidoc',
  'options.html changes',
  '_locales',
  'img',
  'manifest.json'
],

  paths = {
    uncomment: ['scripts/**/*.js'],
    scripts: ['scripts/**/*.js'],
    html: ['options.html'],
    _locales: ['_locales/**/*.json'],
    manifest: ['manifest.json'],
    img: ['img/**/']
  };

gulp.task('img', function () {
  gulp.src(paths.img)
    .pipe(gulp.dest('dist/img'))
});

gulp.task('uncomment', function () {
  return gulp.src(paths.uncomment)
    .pipe(uncomment())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('yuidoc', function () {
  return gulp.src(paths.uncomment)
    .pipe(yuidoc())
    .pipe(gulp.dest('./apidocs'))
});

gulp.task('options.html changes', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist'))
});

gulp.task('_locales', function () {
  return gulp.src(paths._locales)
    .pipe(gulp.dest('dist/_locales'))
});

gulp.task('manifest.json', function () {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', tasks, function () {
  gulp.watch(paths.scripts, ['uncomment']);
  gulp.watch(paths.html, ['options.html changes']);
  gulp.watch(paths._locales, ['_locales']);
  gulp.watch(paths.scripts, ['yuidoc']);
  gulp.watch(paths.img, ['img']);
  gulp.watch(paths.manifest, ['manifest.json']);
});
