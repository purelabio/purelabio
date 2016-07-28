'use strict'

const marked              = require('marked')
const pt                  = require('path')
const execSync            = require('child_process').execSync
const {translations, langs} = require('./i18n-static')

const prod                = process.env.NODE_ENV === 'production'
const sha1                = execSync('git rev-parse --short HEAD').toString().replace(/\n/, '')

const defaultLang = 'ru'

/**
 * Markdown config
 */

marked.setOptions({smartypants: true})

/**
 * Statil config
 */

module.exports = function (lang) {
  return {
    imports: {
      build_sha1: sha1,
      prod,
      lang,
      langs,
      langPath: lang === defaultLang ? '' : `${lang}/`,
      url (path) {
        return pt.join(pt.dirname(path), pt.parse(path).name)
      },
      i18n (key) {
        if (!translations[lang][key]) throw Error (`Key '${key}' not found in the '${lang}' map.`)
        return translations[lang][key] || ''
      }
    },
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
    rename: '$&/index.html',
    ignorePaths: path => (
      /^partials/.test(path)
    ),
    renameExcept: ['index.html', '404.html'],
    pipeline: [
      (content, path) => (
        pt.extname(path) === '.md'? marked(content) : undefined
      )
    ]
  }
}
