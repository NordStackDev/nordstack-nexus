import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import da from './locales/da/translation.json';
import en from './locales/en/translation.json';

const resources = {
  da: { translation: da },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'da', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
