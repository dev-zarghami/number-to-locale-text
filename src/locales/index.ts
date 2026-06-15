import type { Locale } from '../types';
import { en } from './en';
import { fa } from './fa';
import { ar } from './ar';
import { fr } from './fr';
import { de } from './de';
import { es } from './es';
import { tr } from './tr';

/** All built-in locales, keyed by their ISO 639-1 code. */
export const locales = { en, fa, ar, fr, de, es, tr } satisfies Record<string, Locale>;

/** Union of built-in locale codes — `'en' | 'fa' | 'ar' | …`. */
export type LocaleCode = keyof typeof locales;

/**
 * Enum-like map of locale codes. Kept for backwards compatibility with the v1
 * `Locales` enum: `Locales.EN === 'en'`.
 */
export const Locales = {
  FA: 'fa',
  EN: 'en',
  AR: 'ar',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  TR: 'tr',
} as const satisfies Record<string, LocaleCode>;

export { en, fa, ar, fr, de, es, tr };
