import { defineLocale } from '../define-locale';

/**
 * French (fr) — APPROXIMATE. Does not implement the vigesimal 70/80/90 rules
 * (e.g. real French "quatre-vingt-quinze" for 95) or the plural "-s" on
 * "cents"/"vingts"; output is positional and readable but not fully idiomatic.
 */
export const fr = defineLocale({
  zero: 'zéro',
  negative: 'moins',
  ones: ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'],
  teens: ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
  tens: ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'],
  hundreds: ['', 'cent', 'deux cents', 'trois cents', 'quatre cents', 'cinq cents', 'six cents', 'sept cents', 'huit cents', 'neuf cents'],
  scales: ['', 'mille', 'million', 'milliard', 'billion'],
  decimalSuffixes: ['dixième', 'centième', 'millième', 'dix-millième', 'cent-millième'],
  connectors: {
    tensAndOnes: '-',
    hundredAndRest: ' ',
    scale: ' ',
    group: ' ',
    negative: ' ',
    decimalPoint: 'virgule',
    fraction: ' et ',
  },
});
