import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'da', label: '🇩🇰' },
  { code: 'en', label: '🇬🇧' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem('i18nextLng', lang);
      window.location.reload();
    });
  };

  React.useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          style={{
            fontSize: 24,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: currentLang === code ? 1 : 0.5,
            transition: 'opacity 0.2s',
          }}
          aria-label={code === 'da' ? 'Skift til dansk' : 'Switch to English'}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
