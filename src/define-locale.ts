import type { Locale } from './types';

/**
 * Identity helper that gives you full type-checking and autocompletion when
 * authoring a custom locale, while preserving the literal type.
 *
 * @example
 * const klingon = defineLocale({ zero: 'pagh', ... });
 * numberToWords(42, klingon);
 */
export const defineLocale = <const T extends Locale>(locale: T): T => locale;
