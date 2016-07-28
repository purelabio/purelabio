'use strict'

/* ***************************** Dependencies ********************************/

const _ = require('lodash')
const $ = require('gulp-load-plugins')()
const {execSync, fork} = require('child_process')
const del = require('del')
const gulp = require('gulp')
const webpack = require('webpack')
const imageminJpegtran = require('imagemin-jpegtran')
const pngquant = require('imagemin-pngquant')
const ghpages = require('gh-pages')

const webpackConfig = require('./webpack.config')
const statilConfig = require('./statil')
const {langs} = require('./i18n-static')

/* ******************************** Globals **********************************/

const src = {
  html: 'src/html/**/*',
  images: 'src/images/**/*',
  icons: 'src/icons/**/*.svg',
  iconsCss: 'src/templates/icons.css',
  fonts: 'src/fonts/**/*',
  fontsSrc: 'src/fonts/*.{ttf,otf}',
  styles: 'src/styles/**/*.scss',
  stylesMain: ['src/styles/app.scss']
}

const out = {
  html: 'dist',
  styles: 'dist/styles',
  icons: 'dist/fonts/iconfont',
  images: 'dist/images',
  fonts: 'dist/fonts'
}

// branch name 'git symbolic-ref --short -q HEAD'
// revision SHA short 'git rev-parse --short HEAD'
const sha1 = execSync('git rev-parse --short HEAD').toString().replace(/\n/, '')

const prod = process.env.NODE_ENV === 'production'
const stage = process.env.NODE_ENV === 'stage'

const deploySettings = {
  analytics: prod,
  developmentMode: !prod,
  minifyCss: prod || stage,
  buildScripts: prod || stage,
  errorTracking: prod
}

const defaultLang = 'ru'

/* ********************************* Tasks ***********************************/

/* --------------------------------- HTML -----------------------------------*/

gulp.task('html:clear', () => (
  del(out.html).catch(_.noop)
))

gulp.task('html:build', () => (
  Promise.all(langs.map(lang => (
    gulp.src(src.html)
      .pipe($.statil(statilConfig(lang)))
      .pipe(gulp.dest(lang === defaultLang ? out.html : `${out.html}/${lang}`))
  )))
))

gulp.task('html:watch', () => {
  $.watch(src.html, gulp.series('html:build'))
})

/* -------------------------------- Scripts ---------------------------------*/

gulp.task('scripts:build', done => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new $.util.PluginError('webpack', err, {showProperties: false})
    }
    $.util.log('[webpack]', stats.toString(webpackConfig.stats))
    if (stats.hasErrors()) {
      throw new $.util.PluginError('webpack', 'plugin error', {showProperties: false})
    }
    done()
  })
})

gulp.task('tar', () => (
  gulp.src(out.html + '/**/*')
    .pipe($.tar(sha1.concat('.tar')))
    .pipe($.gzip())
    .pipe(gulp.dest(out.html))
))

/* -------------------------------- Styles ----------------------------------*/

gulp.task('styles:clear', () => (
  del(out.styles).catch(_.noop)
))

gulp.task('styles:compile', () => (
  gulp.src(src.stylesMain)
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe($.cleanCss({
      keepSpecialComments: 0,
      aggressiveMerging: false,
      advanced: false,
      compatibility: {properties: {colors: false}}
    }))
    .pipe(gulp.dest(out.styles))
))

gulp.task('styles:build',
  gulp.series('styles:clear', 'styles:compile'))

gulp.task('styles:watch', () => {
  $.watch(src.styles, gulp.series('styles:compile'))
})

/* --------------------------------- Fonts ----------------------------------*/

gulp.task('fonts:clear', () => (
  del(out.fonts).catch(_.noop)
))

gulp.task('fonts:build', () => (
  gulp.src(src.fonts).pipe(gulp.dest(out.fonts))
))

gulp.task('fonts:watch', () => (
  $.watch(src.fonts, gulp.series('fonts:build'))
))

/* --------------------------------- Icons ----------------------------------*/

const fontName = 'icons'

gulp.task('icons:build', () => (
  gulp.src(src.icons)
    .pipe($.iconfont({
      fontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
      normalize: true
    }))
    .on('glyphs', function(glyphs) {
      const opts = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return {name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0)}
        }),
        fontName,
        fontPath: './', // set path to font (from your CSS file if relative)
        className: 'icon' // set class name in your CSS
      }

      gulp.src(src.iconsCss)
        .pipe($.consolidate('lodash', opts))
        .pipe($.rename({basename: fontName}))
        .pipe(gulp.dest(out.icons))
    })
    .pipe(gulp.dest(out.icons))
))

gulp.task('icons:watch', () => {
  $.watch(src.icons, gulp.series('icons:build'))
})

/* --------------------------------- Images ----------------------------------*/

gulp.task('images:clear', () => (
  del(out.images).catch(_.noop)
))

gulp.task('images:build', () => (
  gulp.src(src.images)
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant(), imageminJpegtran({progressive: true})]
    }))
    .pipe(gulp.dest(out.images))
))

gulp.task('images:watch', () => {
  $.watch(src.images, gulp.series('images:build'))
})

/* -------------------------------- Server ----------------------------------*/

gulp.task('server', () => {
  let proc

  function restart () {
    if (proc) proc.kill()
    proc = fork('./devserver')
  }

  restart()
  $.watch(['./webpack.config.js', './devserver.js'], restart)
})

/* -------------------------------- Publish ---------------------------------*/

// Deploy from shell
// git subtree push --prefix dist origin gh-pages

gulp.task('deploy', (cb) => (
  ghpages.publish(out.html, cb)
))

/* -------------------------------- Default ---------------------------------*/

const tasks = [
  'html:clear', 'html:build', 'styles:build', 'fonts:build',
  'images:build', 'icons:build'
].concat(deploySettings.buildScripts ? ['scripts:build', 'tar', 'deploy'] : [])

gulp.task('build', gulp.series(tasks))

gulp.task('watch', gulp.parallel(
  'html:watch', 'styles:watch', 'fonts:watch', 'images:watch', 'icons:watch', 'server'
))

gulp.task('default', gulp.series('build', 'watch'))

gulp.task('dev-fast', gulp.series('watch'))
