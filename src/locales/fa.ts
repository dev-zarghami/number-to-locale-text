import { defineLocale } from '../define-locale';

/** Persian (fa) — well supported; " و " joins virtually every part. */
export const fa = defineLocale({
  zero: 'صفر',
  negative: 'منفی',
  ones: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  teens: ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
  tens: ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  hundreds: ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  scales: ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیون', 'بیلیارد'],
  decimalSuffixes: ['دهم', 'صدم', 'هزارم', 'ده‌هزارم', 'صد‌هزارم'],
  connectors: {
    tensAndOnes: ' و ',
    hundredAndRest: ' و ',
    scale: ' ',
    group: ' و ',
    negative: ' ',
    decimalPoint: 'ممیز',
    fraction: ' و ',
  },
});
