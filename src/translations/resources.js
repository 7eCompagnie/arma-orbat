import translationFR from './fr.json';
import translationEN from './en.json';
import translationES from './es.json';
import i18n from "i18next";
import {reactI18nextModule} from "react-i18next";
import detector from "i18next-browser-languagedetector";

const resources = {
    fr: {
        translation: translationFR
    },
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

i18n
    .use(detector)
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "fr",

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;