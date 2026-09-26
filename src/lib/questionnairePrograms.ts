import { translations, type Locale } from '../i18n/translations';

// Keep existing program IDs and English submission values; labels may change locale.
const programIds = ['targeted-reading', 'early-learners', 'elementary', 'unique-needs', 'homeschool'];
export function questionnaireService(value?: string): string {
  if (!value) return translations.en.questionnaire.serviceOptions[0];
  for (const locale of ['en', 'es'] as const) {
    const t = translations[locale];
    const index = t.questionnaire.serviceOptions.indexOf(value);
    if (index >= 0) return translations.en.questionnaire.serviceOptions[index];
    const program = t.programsPage.programs.find(p => p.id === value || p.title === value);
    if (program) return translations.en.questionnaire.serviceOptions[programIds.indexOf(program.id)];
  }
  return value;
}
export function questionnaireOptions(locale: Locale) {
  return translations[locale].questionnaire.serviceOptions.map((label, index) => ({
    value: translations.en.questionnaire.serviceOptions[index], label,
  }));
}
