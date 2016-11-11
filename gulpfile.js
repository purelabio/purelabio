'use strict'

/* ****************************** Dependencies ***************************** */

const $ = require('gulp-load-plugins')()
const del = require('del')
const gulp = require('gulp')
const {execSync, fork} = require('child_process')

/* ******************************** Globals ******************************** */

const src = {
  root: 'src',
  html: 'src/html/**/*',
  styleEntryFiles: [
    'src/styles/main.scss'
  ],
  styleGlobs: [
    'src/styles/**/*.scss',
    'node_modules/stylebox/**/*.scss'
  ],
  imagesRaster: 'src/images/**/*.{jpg,png}',
  imagesVector: 'src/images/**/*.svg'
}

const out = {
  root: 'dist',
  styles: 'dist/styles',
  images: 'dist/images'
}

const autoprefixerSettings = {browsers: ['> 1%', 'IE >= 10', 'iOS 7']}

const versionCmd = 'git rev-parse --short HEAD'

function noop () {}

/* ********************************* Tasks ********************************* */

/**
 * Clear
 */

gulp.task('clear', () => (
  del(out.root, {read: false}).catch(noop)
))

/**
 * HTML
 */

gulp.task('html:build', () => {
  const version = execSync(versionCmd).toString().replace(/\n/, '')

  return gulp.src(src.html)
    .pipe($.statil({
      imports: {version}
    }))
    .pipe(gulp.dest(out.root))
})

gulp.task('html:watch', () => {
  $.watch(src.html, gulp.series('html:build'))
})

/**
 * Styles
 */

gulp.task('styles:build', () => (
  gulp.src(src.styleEntryFiles)
    .pipe($.sass({includePaths: [src.root]}))
    .pipe($.autoprefixer(autoprefixerSettings))
    .pipe(gulp.dest(out.styles))
))

gulp.task('styles:watch', () => {
  $.watch(src.styleGlobs, gulp.series('styles:build'))
})

/**
 * Images
 */

gulp.task('images:raster', () => (
  gulp.src(src.imagesRaster)
    // Requires `graphicsmagick` or `imagemagick`. Install via Homebrew.
    .pipe($.imageResize({quality: 1}))
    .pipe(gulp.dest(out.images))
))

gulp.task('images:vector', () => (
  gulp.src(src.imagesVector)
    .pipe($.svgo())
    .pipe(gulp.dest(out.images))
))

gulp.task('images:build', gulp.parallel('images:raster', 'images:vector'))

gulp.task('images:watch', () => {
  $.watch(src.imagesRaster, gulp.series('images:raster'))
  $.watch(src.imagesVector, gulp.series('images:vector'))
})

/**
 * Devserver + Scripts
 */

gulp.task('devserver', () => {
  let proc

  process.on('exit', () => {
    if (proc) proc.kill()
  })

  function restart () {
    if (proc) proc.kill()
    proc = fork('./devserver')
  }

  restart()
  $.watch(['./webpack.config.js', './devserver.js'], restart)
})

/**
 * Default
 */

gulp.task('common-tasks', gulp.parallel(
  'html:build',
  'styles:build',
  'images:build'
))

gulp.task('watch', gulp.parallel(
  'html:watch',
  'styles:watch',
  'images:watch',
  'devserver'
))

gulp.task('default', gulp.series('clear', gulp.parallel('common-tasks', 'watch')))
