import { createI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";

import zh from "./zh";
import en from "./en";

export default createI18n({
  // Use Composition API, Set to false
  allowComposition: true,
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    zh,
    en,
  },
});
