import React from 'react'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'


class LocalizationService {
    constructor() {

        this.translationGetters = {
            en: () => require('../locales/en.json'),
            es: () => require('../locales/es.json')
        }
    }

    translate = (string) => {
        return i18n.t(string)
    }

    setI18nConfig = () => {
        const fallback = { languageTag: 'en' }
        const { languageTag } =
            RNLocalize.findBestAvailableLanguage(Object.keys(this.translationGetters)) ||
            fallback

        // this.translate.cache.clear()

        i18n.translations = { [languageTag]: this.translationGetters[languageTag]() }
        i18n.locale = languageTag
    }

}


export default LocalizationService