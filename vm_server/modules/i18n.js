const i18next = require('i18next')
const i18nextNodeFsBackend = require('i18next-node-fs-backend')
const { LanguageDetector } = require('i18next-http-middleware')

i18next
    .use(i18nextNodeFsBackend)
    .use(LanguageDetector)
    .init({
        resources: {
            ru: {
                translation: require('../locales/ru/translation.json'),
            },
            kg: {
                translation: require('../locales/kg/translation.json'),
            },
        },
        defaultNS: 'translation',
        detection: {
            order: ['querystring', 'cookie'],
            cache: ['cookie'],
            lookupQuerystring: 'lang',
            lookupCookie: 'lang',
        },
        fallbackLng: ['ru', 'kg'],
        // preload: ['ru'],
    })

module.exports = { i18next }
