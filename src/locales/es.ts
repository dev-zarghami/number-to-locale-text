import { defineLocale } from '../define-locale';

/**
 * Spanish (es) — APPROXIMATE. Does not implement the 21–29 contractions
 * ("veinticinco") or the "ciento"/gender-agreement rules; produces "veinte y
 * cinco" instead. Readable, not fully idiomatic.
 */
export const es = defineLocale({
  zero: 'cero',
  negative: 'menos',
  ones: ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'],
  teens: ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'],
  tens: ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
  hundreds: ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'],
  scales: ['', 'mil', 'millón', 'mil millones', 'billón'],
  decimalSuffixes: ['décimo', 'centésimo', 'milésimo', 'diezmilésimo', 'cienmilésimo'],
  connectors: {
    tensAndOnes: ' y ',
    hundredAndRest: ' ',
    scale: ' ',
    group: ' ',
    negative: ' ',
    decimalPoint: 'coma',
    fraction: ' con ',
  },
});
