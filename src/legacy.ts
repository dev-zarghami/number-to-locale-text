import type { Locale } from './types';
import { locales, type LocaleCode } from './locales';
import { numberToWords, type LocaleInput } from './converter';

let current: Locale | null = null;

/**
 * Set the process-wide default locale used by {@link numberToString}.
 *
 * @deprecated Prefer `createConverter(locale)` or `numberToWords(value, locale)`,
 * which avoid shared mutable state (safer under concurrency). This shim now runs
 * synchronously; awaiting it remains harmless.
 */
export const setDefaultLocale = (locale: LocaleInput): void => {
  current = typeof locale === 'string' ? locales[locale as LocaleCode] ?? null : locale;
  if (!current) {
    throw new RangeError(
      `Unknown locale "${locale}". Built-in locales: ${Object.keys(locales).join(', ')}.`,
    );
  }
};

/**
 * Convert a number to words using the locale set by {@link setDefaultLocale}.
 *
 * @deprecated Prefer `numberToWords(value, locale)`.
 * @throws {Error} if no default locale has been set.
 */
export const numberToString = (value: number | string): string => {
  if (!current) {
    throw new Error(
      'No default locale set. Call setDefaultLocale(code) first, ' +
        'or use numberToWords(value, locale) / createConverter(locale).',
    );
  }
  return numberToWords(value, current);
};
