
import { nav } from "./sections/nav";
import { hero } from "./sections/hero";
import { services } from "./sections/services";
import { about } from "./sections/about";
import { contact } from "./sections/contact";
import { faq } from "./sections/faq";
import { footer } from "./sections/footer";
import { founder } from "./sections/founder";
import { market } from "./sections/market";

export const translations = {
  en: {
    ...nav.en,
    ...hero.en,
    ...services.en,
    ...about.en,
    ...contact.en,
    ...faq.en,
    ...footer.en,
    ...founder.en,
    ...market.en,
  },
  fr: {
    ...nav.fr,
    ...hero.fr,
    ...services.fr,
    ...about.fr,
    ...contact.fr,
    ...faq.fr,
    ...footer.fr,
    ...founder.fr,
    ...market.fr,
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
