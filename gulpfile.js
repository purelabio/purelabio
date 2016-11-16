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
  icons: 'src/icons/**/*.svg',
  iconsCss: 'src/icon-templates/icons.css',
  iconsHtml: 'src/icon-templates/icons.html',
  imagesRaster: 'src/images/**/*.{jpg,png}',
  imagesVector: 'src/images/**/*.svg'
}

const out = {
  root: 'dist',
  styles: 'dist/styles',
  icons: 'dist/fonts/iconfont',
  images: 'dist/images'
}

const autoprefixerSettings = {browsers: ['> 1%', 'IE >= 10', 'iOS 7']}

const versionCmd = 'git rev-parse --short HEAD'

const fontName = 'icons'

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
 * Icons
 */

gulp.task('icons:build', () => {
  const iconsD = Promise.defer()
  const cssD = Promise.defer()
  const htmlD = Promise.defer()

  gulp.src(src.icons)
    .pipe($.iconfont({
      fontName,
      prependUnicode: false,
      formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
      normalize: true
    }))
    .on('glyphs', glyphs => {
      const imports = {glyphs, fontName, className: 'icon'}

      gulp.src(src.iconsCss)
        .pipe($.statil({imports}))
        .pipe($.autoprefixer(autoprefixerSettings))
        .pipe(gulp.dest(out.icons))
        .on('error', cssD.reject)
        .on('end', cssD.resolve)

      gulp.src(src.iconsHtml)
        .pipe($.statil({imports}))
        .pipe(gulp.dest(out.icons))
        .on('error', htmlD.reject)
        .on('end', htmlD.resolve)
    })
    .pipe(gulp.dest(out.icons))
    .on('error', iconsD.reject)
    .on('end', iconsD.resolve)

  return Promise.all([iconsD.promise, cssD.promise, htmlD.promise])
})

gulp.task('icons:watch', () => {
  $.watch(src.icons, gulp.series('icons:build'))
  $.watch(src.iconsCss, gulp.series('icons:build'))
  $.watch(src.iconsHtml, gulp.series('icons:build'))
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
  'icons:build',
  'images:build'
))

gulp.task('watch', gulp.parallel(
  'html:watch',
  'styles:watch',
  'icons:watch',
  'images:watch',
  'devserver'
))

gulp.task('default', gulp.series('clear', gulp.parallel('common-tasks', 'watch')))
