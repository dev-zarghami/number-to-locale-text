import type { ConvertOptions, DecimalMode, Locale } from './types';
import { locales, type LocaleCode } from './locales';

/** Accepts either a built-in locale code or a fully-defined custom locale. */
export type LocaleInput = LocaleCode | Locale;

/** A reusable converter bound to a locale (and optional default options). */
export interface Converter {
  /** Convert a number (or numeric string) to words. */
  convert(value: number | string, options?: ConvertOptions): string;
  /** The resolved locale this converter is bound to. */
  readonly locale: Locale;
}

const NUMERIC = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;

const resolveLocale = (locale: LocaleInput): Locale => {
  if (typeof locale !== 'string') return locale;
  const found = locales[locale as LocaleCode];
  if (!found) {
    throw new RangeError(
      `Unknown locale "${locale}". Built-in locales: ${Object.keys(locales).join(', ')}.`,
    );
  }
  return found;
};

interface Parsed {
  readonly negative: boolean;
  /** Integer digits, no sign, leading zeros stripped (at least "0"). */
  readonly integer: string;
  /** Fraction digits, no trailing zeros (may be empty). */
  readonly fraction: string;
}

const parse = (value: number | string): Parsed => {
  let text: string;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new RangeError(`Cannot convert a non-finite number: ${value}.`);
    }
    text = String(value);
    if (/e/i.test(text)) {
      throw new RangeError(
        `"${value}" is in exponential notation; pass it as a string to preserve precision.`,
      );
    }
  } else {
    text = value.trim();
  }

  if (!NUMERIC.test(text)) {
    throw new TypeError(`Invalid numeric input: ${JSON.stringify(value)}.`);
  }

  let negative = false;
  if (text[0] === '+') text = text.slice(1);
  else if (text[0] === '-') ((negative = true), (text = text.slice(1)));

  const dot = text.indexOf('.');
  const integer = (dot === -1 ? text : text.slice(0, dot)).replace(/^0+(?=\d)/, '') || '0';
  const fraction = (dot === -1 ? '' : text.slice(dot + 1)).replace(/0+$/, '');

  return { negative, integer, fraction };
};

/** Convert 1–99 to words. */
const twoDigits = (n: number, l: Locale): string => {
  if (n < 10) return l.ones[n];
  if (n < 20) return l.teens[n - 10];
  const tens = l.tens[Math.floor(n / 10)];
  const ones = n % 10;
  return ones === 0 ? tens : tens + l.connectors.tensAndOnes + l.ones[ones];
};

/** Convert 1–999 to words. */
const threeDigits = (n: number, l: Locale): string => {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  if (hundreds === 0) return twoDigits(rest, l);
  const head = l.hundreds[hundreds];
  return rest === 0 ? head : head + l.connectors.hundredAndRest + twoDigits(rest, l);
};

/** Convert an arbitrary-length string of digits to words (no sign, no fraction). */
const integerToWords = (digits: string, l: Locale): string => {
  if (/^0*$/.test(digits)) return l.zero;

  const chunks: string[] = [];
  const groupCount = Math.ceil(digits.length / 3);

  for (let g = 0; g < groupCount; g++) {
    const end = digits.length - g * 3;
    const value = parseInt(digits.slice(Math.max(0, end - 3), end), 10);
    if (value === 0) continue;

    if (g >= l.scales.length) {
      throw new RangeError(
        `Number is too large for locale "${l.zero}": no scale word for 10^${g * 3}. ` +
          `Add more entries to the locale's "scales" array to extend the range.`,
      );
    }

    const words = threeDigits(value, l);
    const chunk = g === 0 ? words : words + l.connectors.scale + l.scales[g];
    chunks.unshift(chunk);
  }

  return chunks.join(l.connectors.group);
};

/** Read a string of digits one at a time ("305" → "three zero five"). */
const spellDigits = (digits: string, l: Locale): string =>
  [...digits].map((d) => (d === '0' ? l.zero : l.ones[Number(d)])).join(' ');

const fractionToWords = (fraction: string, l: Locale, mode: DecimalMode): string => {
  if (mode === 'digits') {
    return `${l.connectors.decimalPoint} ${spellDigits(fraction, l)}`;
  }

  // 'fraction' mode: read as a number + ordinal suffix.
  const index = fraction.length - 1;
  const numerator = parseInt(fraction, 10);
  const plural = numerator !== 1 ? l.decimalSuffixesPlural : undefined;
  const suffix = plural?.[index] ?? l.decimalSuffixes[index];

  // No suffix defined for this precision → fall back to digit-by-digit.
  if (!suffix) return `${l.connectors.decimalPoint} ${spellDigits(fraction, l)}`;

  return `${integerToWords(fraction, l)} ${suffix}`;
};

/**
 * Convert a number (or numeric string) to its written form in the given locale.
 *
 * Pass very large integers or exact decimals as **strings** to avoid the
 * precision limits of JavaScript's `number` type.
 *
 * @throws {TypeError} when the input is not a valid number.
 * @throws {RangeError} for non-finite numbers, exponential notation, or
 *   magnitudes beyond the locale's defined scale words.
 */
export const numberToWords = (
  value: number | string,
  locale: LocaleInput,
  options: ConvertOptions = {},
): string => {
  const l = resolveLocale(locale);
  const { negative, integer, fraction } = parse(value);
  const mode: DecimalMode = options.decimals ?? 'digits';

  const integerWords = integerToWords(integer, l);
  const isZero = integer === '0' && fraction === '';

  let body = integerWords;
  if (fraction !== '') {
    const joiner = mode === 'fraction' ? l.connectors.fraction : ' ';
    body += joiner + fractionToWords(fraction, l, mode);
  }

  if (negative && !isZero) {
    return l.negative + l.connectors.negative + body;
  }
  return body;
};

/**
 * Create a converter bound to a locale, with optional default options.
 *
 * @example
 * const fa = createConverter('fa');
 * fa.convert(1205); // "یک هزار و دویست و پنج"
 *
 * const money = createConverter('en', { decimals: 'fraction' });
 * money.convert(25.34); // "twenty-five and thirty-four hundredths"
 */
export const createConverter = (
  locale: LocaleInput,
  defaults: ConvertOptions = {},
): Converter => {
  const resolved = resolveLocale(locale);
  return {
    locale: resolved,
    convert: (value, options) =>
      numberToWords(value, resolved, { ...defaults, ...options }),
  };
};
