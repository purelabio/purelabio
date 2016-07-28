const {patch} = require('prax')

module.exports.translations = patch({}, {
  en: require('./src/js/translations/en.json'),
  ru: require('./src/js/translations/ru.json'),
})

module.exports.langs = ['en', 'ru']
