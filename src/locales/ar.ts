import { defineLocale } from '../define-locale';

/**
 * Arabic (ar) — APPROXIMATE. The positional engine does not model Arabic
 * gender agreement or dual forms; output is intelligible but not fully idiomatic.
 */
export const ar = defineLocale({
  zero: 'صفر',
  negative: 'سالب',
  ones: ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'],
  teens: [
    'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر',
    'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر',
  ],
  tens: ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'],
  hundreds: ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'],
  scales: ['', 'ألف', 'مليون', 'مليار', 'تريليون'],
  decimalSuffixes: ['عشر', 'مئة', 'ألف', 'عشرة آلاف', 'مئة ألف'],
  connectors: {
    tensAndOnes: ' و ',
    hundredAndRest: ' و ',
    scale: ' ',
    group: ' و ',
    negative: ' ',
    decimalPoint: 'فاصلة',
    fraction: ' و ',
  },
});
