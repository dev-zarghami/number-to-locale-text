import { defineLocale } from '../define-locale';

/**
 * German (de) — APPROXIMATE. Real German is written as a single compound word
 * with ones before tens (e.g. "fünfundzwanzig" for 25). This engine produces
 * the positional, space-separated form ("zwanzig fünf"); readable, not idiomatic.
 */
export const de = defineLocale({
  zero: 'null',
  negative: 'minus',
  ones: ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'],
  teens: ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'],
  tens: ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'],
  hundreds: [
    '', 'einhundert', 'zweihundert', 'dreihundert', 'vierhundert',
    'fünfhundert', 'sechshundert', 'siebenhundert', 'achthundert', 'neunhundert',
  ],
  scales: ['', 'tausend', 'million', 'milliarde', 'billion'],
  decimalSuffixes: ['zehntel', 'hundertstel', 'tausendstel', 'zehntausendstel', 'hunderttausendstel'],
  connectors: {
    tensAndOnes: ' ',
    hundredAndRest: ' ',
    scale: ' ',
    group: ' ',
    negative: ' ',
    decimalPoint: 'Komma',
    fraction: ' ',
  },
});
