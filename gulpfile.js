const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-minify-html');
const ngHtml2Js = require('gulp-ng-html2js');
const sequence = require('run-sequence');

const log = {
  green: message => gutil.log(gutil.colors.green(message)),
  blue: message => gutil.log(gutil.colors.blue(message)),
  gray: message => gutil.log(gutil.colors.gray(message)),
  yellow: message => gutil.log(gutil.colors.yellow(message)),
  red: message => gutil.log(gutil.colors.red(message))
};

const RESOURCES = {
  VEASY: {
    js: ['veasy.js']
  },
  VEASY_CALENDAR: {
    templates: ['veasy-calendar/templates/veasy-calendar.html'],
    css: ['veasy-calendar/css/veasy-calendar.css'],
    js: ['veasy-calendar/js/services/*.js', 'veasy-calendar/js/directives/veasy-calendar.js']
  },
  VEASY_MOMENT_FORMAT: {
    js: ['veasy-moment-format/js/services/veasy-moment-format.js', 'veasy-moment-format/js/directives/veasy-moment-format.js']
  },
  VEASY_TABLE: {
    templates: ['veasy-table/templates/veasy-table.html'],
    css: ['veasy-table/css/veasy-table.css'],
    js: ['veasy-table/js/filters/*.js', 'veasy-table/js/services/*.js', 'veasy-table/js/directives/veasy-table.js']
  }
};

// ---------------------------------------------------------------
// Clean
// ---------------------------------------------------------------
gulp.task('clean', function () {
  log.blue('Limpando diretórios');
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean({ force: true }));
});

// ---------------------------------------------------------------
// Veasy
// ---------------------------------------------------------------
gulp.task('VEASY_JS_MIN', function () {
  return gulp.src(RESOURCES.VEASY.js)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify().on('error', log.red))
    .pipe(concat('veasy.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});

// ---------------------------------------------------------------
// Veasy Moment Format
// ---------------------------------------------------------------
gulp.task('VEASY_MOMENT_FORMAT_JS_MIN', function () {
  return gulp.src(RESOURCES.VEASY_MOMENT_FORMAT.js)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify().on('error', log.red))
    .pipe(concat('veasy-moment-format.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});

// ---------------------------------------------------------------
// Veasy Calendar
// ---------------------------------------------------------------
gulp.task('VEASY_CALENDAR_JS_MIN', function () {
  return gulp.src(RESOURCES.VEASY_CALENDAR.js)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify().on('error', log.red))
    .pipe(concat('veasy-calendar.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});
gulp.task('VEASY_CALENDAR_CSS_MIN', function () {
  return gulp.src(RESOURCES.VEASY_CALENDAR.css)
    .pipe(minifyCss().on('error', log.red))
    .pipe(concat('veasy-calendar.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', log.red);
});
gulp.task('VEASY_CALENDAR_TEMPLATE_MIN', function () {
  gulp.src(RESOURCES.VEASY_CALENDAR.templates)
    .pipe(minifyHtml({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: 'veasy.calendar',
    }))
    .pipe(uglify())
    .pipe(concat('veasy-calendar-templates.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});

// ---------------------------------------------------------------
// Veasy Table
// ---------------------------------------------------------------
gulp.task('VEASY_TABLE_JS_MIN', function () {
  return gulp.src(RESOURCES.VEASY_TABLE.js)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify().on('error', log.red))
    .pipe(concat('veasy-table.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});
gulp.task('VEASY_TABLE_CSS_MIN', function () {
  return gulp.src(RESOURCES.VEASY_TABLE.css)
    .pipe(minifyCss().on('error', log.red))
    .pipe(concat('veasy-table.min.css'))
    .pipe(gulp.dest('dist/css'))
    .on('error', log.red);
});
gulp.task('VEASY_TABLE_TEMPLATE_MIN', function () {
  gulp.src(RESOURCES.VEASY_TABLE.templates)
    .pipe(minifyHtml({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: 'veasy.table',
    }))
    .pipe(uglify())
    .pipe(concat('veasy-table-templates.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', log.red);
});

// ---------------------------------------------------------------
// Principal
// ---------------------------------------------------------------
gulp.task('VEASY_MOMENT_FORMAT', function () {
  log.blue('[VEASY MOMENT FORMAT] Building...');
  sequence('VEASY_MOMENT_FORMAT_JS_MIN');
});

gulp.task('VEASY_CALENDAR', function () {
  log.blue('[VEASY CALENDAR] Building...');
  sequence('VEASY_CALENDAR_JS_MIN', 'VEASY_CALENDAR_CSS_MIN', 'VEASY_CALENDAR_TEMPLATE_MIN');
});

gulp.task('VEASY_TABLE', function () {
  log.blue('[VEASY TABLE] Building...');
  sequence('VEASY_TABLE_JS_MIN', 'VEASY_TABLE_CSS_MIN', 'VEASY_TABLE_TEMPLATE_MIN');
});

gulp.task('dist', ['clean'], function () {
  log.blue('Building on distribution mode');
  sequence('VEASY_JS_MIN', 'VEASY_MOMENT_FORMAT', 'VEASY_CALENDAR', 'VEASY_TABLE');
});

gulp.task('dev', function () {
  log.blue('Alterações');
  gulp.watch('veasy-calendar/**/*', ['VEASY_CALENDAR']);
  gulp.watch('veasy-table/**/*', ['VEASY_TABLE']);
  gulp.watch('veasy-moment-format/**/*', ['VEASY_MOMENT_FORMAT']);
});
