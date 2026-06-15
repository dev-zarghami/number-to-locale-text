// Core API
export { numberToWords, createConverter } from './converter';
export type { Converter, LocaleInput } from './converter';

// Locales & custom-locale authoring
export { defineLocale } from './define-locale';
export { locales, Locales } from './locales';
export type { LocaleCode } from './locales';

// Types
export type { Locale, LocaleConnectors, ConvertOptions, DecimalMode } from './types';

// Legacy (deprecated) stateful API — kept for backwards compatibility
export { setDefaultLocale, numberToString } from './legacy';
