import i18next from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        debug: true,
        detection: {
            order: ['localStorage', 'cookie', 'querystring'],
            caches: ['localStorage'],
            lookupQuerystring: 'lang',
            lookupCookie: 'lang',
            lookupLocalStorage: 'lang'
        },
        fallbackLng: ['ru', 'kg', 'en'],
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/{{lng}}/translation.json'
        }
    })
