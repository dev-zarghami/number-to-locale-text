import { defineLocale } from '../define-locale';

/** English (en) — the reference locale; output is linguistically correct. */
export const en = defineLocale({
  zero: 'zero',
  negative: 'minus',
  ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  teens: [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  ],
  tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
  hundreds: [
    '', 'one hundred', 'two hundred', 'three hundred', 'four hundred',
    'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred',
  ],
  scales: ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'],
  decimalSuffixes: ['tenth', 'hundredth', 'thousandth', 'ten-thousandth', 'hundred-thousandth'],
  decimalSuffixesPlural: ['tenths', 'hundredths', 'thousandths', 'ten-thousandths', 'hundred-thousandths'],
  connectors: {
    tensAndOnes: '-',
    hundredAndRest: ' ',
    scale: ' ',
    group: ' ',
    negative: ' ',
    decimalPoint: 'point',
    fraction: ' and ',
  },
});
