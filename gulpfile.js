'use strict';

/* eslint no-var:0 */
var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var cssmin = require('gulp-cssmin');
var data = require('gulp-data');
var eslint = require('gulp-eslint');
var fs = require('fs');
var ignore = require('gulp-ignore');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
// var stylemod = require('gulp-style-modules');
// var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var through = require('through-gulp');

var compiled = {};

var compiler = function(minjs) {
  return through(
    function(file, encoding, callback) {
      if (!minjs || file.relative.indexOf('.spec.js') === -1) {
        compiled[file.relative + (minjs ? '-min' : '')] = file.contents.toString();
        this.push(file);
      }

      callback();
    },
    function(callback) {
      callback();
    }
  );
};

var jadedata = function(minjs) {
  return data(function(file) {
    var comp = false;
    var location = _.filter(file.path.split('/'), function(p) {
      if (comp && p.indexOf('.jade') === -1) {
        return true;
      }

      if (p.indexOf('src') === 0) {
        comp = true;
      }
    }).join('/');

    return {
      readCompiled: function(_name) {
        var name = path.join(location, _name);
        var namemin = name + '-min';

        if (minjs && name.slice(-3) === '.js') {
          if (compiled[namemin]) {
            return compiled[namemin];
          }
        }

        return compiled[name];
      },
      readFile: function(name) {
        return fs.readFileSync(path.join(location, name), 'utf-8');
      }
    };
  });
};

var errcb = function(err) {
  console.error(err.stack || err.message || err);
  this.emit('end');
};

gulp.task('js-spec', function() {
  return gulp
    .src(['src/**/*.spec.js'])
    .pipe(babel({
      retainLines: true
    }))
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

gulp.task('lint', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('md', function() {
  return gulp
    .src(['src/**/*.md'])
    .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
  var nm = path.join(__dirname, '/node_modules'); // eslint-disable-line no-undef

  return gulp
    .src(['src/**/*.scss'])
    .pipe(sass({
      indentedSyntax: false,
      sourceComments: 'normal',
      outputStyle: 'nested',
      includePaths: [
        path.join(nm, '/bourbon/app/assets/stylesheets'),
        path.join(nm, '/bourbon-neat/app/assets/stylesheets')
      ]
    }))
    .on('error', errcb)
    .pipe(ignore.exclude('*.css.map'))
    .pipe(cssmin({ keepBreaks: true }))
    .pipe(compiler());
});

gulp.task('js', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .on('error', errcb)
    .pipe(compiler())
    .pipe(uglify())
    .pipe(compiler(true));
});

gulp.task('minhtml', ['css', 'js'], function() {
  return gulp
    .src(['src/**/*.jade', '!src/**/*.spec.jade'])
    .pipe(jadedata(true))
    .pipe(jade())
    .on('error', errcb)
    .pipe(replace(/\"import\" href=\"\.\.\/([A-Za-z0-9_\-]*)\/([A-Za-z0-9_\-]*)\.html\"/g, '"import" href="../$1/$2.min.html"'))
    .pipe(rename({
      extname: '.min.html'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('html', ['minhtml'], function() {
  return gulp
    .src(['src/**/*.jade'])
    .pipe(jadedata())
    .pipe(jade())
    .on('error', errcb)
    .pipe(gulp.dest('.'));
});

require('web-component-tester').gulp.init(gulp, ['html']);

gulp.task('build', ['lint', 'html', 'md']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['src/**/*.scss'], ['css']);
  gulp.watch(['src/**/*.md'], ['md']);
  gulp.watch(['src/**/*.{jade,js,scss}'], ['html']);
});

gulp.task('default', ['build']);

gulp.task('play', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .pipe(through.obj(function(file, encoding, cb) {
      console.log(file.contents.toString());
      cb();
    }));
});
