import { defineLocale } from '../define-locale';

/**
 * Turkish (tr) — mostly idiomatic for everyday numbers. One known deviation:
 * Turkish drops the leading "bir" before "bin" (1000 is "bin", not "bir bin");
 * this positional engine keeps it. Otherwise output reads naturally.
 */
export const tr = defineLocale({
  zero: 'sıfır',
  negative: 'eksi',
  ones: ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'],
  teens: ['on', 'on bir', 'on iki', 'on üç', 'on dört', 'on beş', 'on altı', 'on yedi', 'on sekiz', 'on dokuz'],
  tens: ['', '', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'],
  hundreds: ['', 'yüz', 'iki yüz', 'üç yüz', 'dört yüz', 'beş yüz', 'altı yüz', 'yedi yüz', 'sekiz yüz', 'dokuz yüz'],
  scales: ['', 'bin', 'milyon', 'milyar', 'trilyon'],
  decimalSuffixes: ['onda bir', 'yüzde bir', 'binde bir', 'on binde bir', 'yüz binde bir'],
  connectors: {
    tensAndOnes: ' ',
    hundredAndRest: ' ',
    scale: ' ',
    group: ' ',
    negative: ' ',
    decimalPoint: 'virgül',
    fraction: ' ',
  },
});
