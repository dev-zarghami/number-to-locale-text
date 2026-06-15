/**
 * Connector strings that glue the spoken parts of a number together.
 *
 * Splitting these out (instead of one overloaded `delimiter`) is what lets a
 * single positional engine produce idiomatic output across languages: English
 * hyphenates tens-and-ones ("twenty-five") but spaces groups, whereas Persian
 * uses " و " almost everywhere.
 */
export interface LocaleConnectors {
  /** Between a tens word and a ones word — EN `"-"`, FA `" و "`. */
  readonly tensAndOnes: string;
  /** Between the hundreds word and the rest of a 3-digit group — EN `" "`, BrE `" and "`. */
  readonly hundredAndRest: string;
  /** Between a group's words and its scale word — EN `" "` ("one thousand"). */
  readonly scale: string;
  /** Between consecutive scaled chunks — EN `" "`, FA `" و "`. */
  readonly group: string;
  /** Between the negative word and the number body — usually `" "`. */
  readonly negative: string;
  /** The spoken decimal point used by `'digits'` mode — EN `"point"`, FR `"virgule"`. */
  readonly decimalPoint: string;
  /** Between the integer body and the fraction in `'fraction'` mode — EN `" and "`. */
  readonly fraction: string;
}

/**
 * A complete vocabulary + grammar definition for one language.
 *
 * Index conventions (all positional, no gaps):
 * - `ones[0]` is `""`; `ones[1..9]` are one…nine.
 * - `teens[0..9]` are ten…nineteen.
 * - `tens[0]`, `tens[1]` are `""`; `tens[2..9]` are twenty…ninety.
 * - `hundreds[0]` is `""`; `hundreds[1..9]` are one hundred…nine hundred.
 * - `scales[0]` is `""` (units); `scales[1..]` are thousand, million, … Each
 *   extra entry extends the supported magnitude by three orders of ten.
 */
export interface Locale {
  /** Word for zero. */
  readonly zero: string;
  /** Word placed before negative values (no trailing space — use `connectors.negative`). */
  readonly negative: string;
  readonly ones: readonly string[];
  readonly teens: readonly string[];
  readonly tens: readonly string[];
  readonly hundreds: readonly string[];
  readonly scales: readonly string[];
  /** Ordinal suffixes for `'fraction'` mode — `[tenths, hundredths, …]`. */
  readonly decimalSuffixes: readonly string[];
  /** Optional plural ordinal suffixes (used when the fraction numerator ≠ 1). */
  readonly decimalSuffixesPlural?: readonly string[];
  readonly connectors: LocaleConnectors;
}

/** How the fractional part of a number is verbalised. */
export type DecimalMode = 'digits' | 'fraction';

export interface ConvertOptions {
  /**
   * `'digits'` (default) reads the fraction digit by digit ("point three four").
   * `'fraction'` reads it as a number with an ordinal suffix ("thirty-four hundredths").
   */
  readonly decimals?: DecimalMode;
}
