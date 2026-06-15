# number-to-locale-text

> Convert numbers into their **written words** across multiple locales — zero dependencies, fully typed, tree-shakeable, and shipped as both ESM and CommonJS.

```ts
numberToWords(1205, 'en');        // "one thousand two hundred five"
numberToWords(1205, 'fa');        // "یک هزار و دویست و پنج"
numberToWords(25.34, 'en');       // "twenty-five point three four"
```

---

## Features

- 🔢 **Numbers → words** for integers, decimals, and negatives.
- 🌍 **7 built-in locales** — English, Persian, Arabic, French, German, Spanish, Turkish.
- 🧩 **Custom locales** — bring your own vocabulary with a typed, validated schema.
- 🟢 **Synchronous & side-effect-free** — no global state, no `await`, safe under concurrency.
- 🔠 **Two decimal styles** — digit-by-digit (`"point three four"`) or fractional (`"thirty-four hundredths"`).
- 🛡️ **Robust by default** — strict input validation, precise large-number handling via strings, no silent wrong answers.
- 📦 **Dual ESM + CJS**, first-class TypeScript types, **zero runtime dependencies**.

---

## Installation

```bash
npm install number-to-locale-text
# or
pnpm add number-to-locale-text
# or
yarn add number-to-locale-text
```

Requires **Node ≥ 18**. Works in any modern bundler (Vite, webpack, Rollup, esbuild) and in the browser.

---

## Quick start

```ts
import { numberToWords } from 'number-to-locale-text';

numberToWords(42, 'en');   // "forty-two"
numberToWords(-42, 'en');  // "minus forty-two"
numberToWords(1000000, 'en'); // "one million"
```

No setup, no `await`, no global state — just call it.

---

## API

### `numberToWords(value, locale, options?)`

The primary, stateless converter.

| Param     | Type                          | Description |
|-----------|-------------------------------|-------------|
| `value`   | `number \| string`            | The number to convert. **Pass a string** for very large integers or exact decimals (see [Precision](#precision--large-numbers)). |
| `locale`  | `LocaleCode \| Locale`        | A built-in code (`'en'`, `'fa'`, …) or a [custom locale object](#custom-locales). |
| `options` | `ConvertOptions` _(optional)_ | See [Options](#options). |

Returns the number in words as a `string`.

```ts
import { numberToWords } from 'number-to-locale-text';

numberToWords(138, 'en');                         // "one hundred thirty-eight"
numberToWords(25.34, 'en');                       // "twenty-five point three four"
numberToWords(25.34, 'en', { decimals: 'fraction' }); // "twenty-five and thirty-four hundredths"
```

### `createConverter(locale, defaults?)`

Returns a reusable converter bound to a locale (and optional default options). Ideal when you convert many values for the same locale.

```ts
import { createConverter } from 'number-to-locale-text';

const fa = createConverter('fa');
fa.convert(25);    // "بیست و پنج"
fa.convert(1205);  // "یک هزار و دویست و پنج"

// Bind default options too:
const money = createConverter('en', { decimals: 'fraction' });
money.convert(25.34);                  // "twenty-five and thirty-four hundredths"
money.convert(25.34, { decimals: 'digits' }); // per-call override → "twenty-five point three four"

money.locale; // the resolved Locale object
```

### Options

```ts
interface ConvertOptions {
  /** How the fractional part is read. Default: 'digits'. */
  decimals?: 'digits' | 'fraction';
}
```

| `decimals`   | `25.34` →                                  |
|--------------|--------------------------------------------|
| `'digits'`   | `twenty-five point three four`             |
| `'fraction'` | `twenty-five and thirty-four hundredths`   |

---

## Locales

| Code | Language | Quality |
|------|----------|---------|
| `en` | English  | ✅ Fully idiomatic |
| `fa` | Persian  | ✅ Fully idiomatic |
| `tr` | Turkish  | ✅ Idiomatic (except `1000` reads as `bir bin`) |
| `ar` | Arabic   | ⚠️ Approximate — no gender/dual agreement |
| `fr` | French   | ⚠️ Approximate — no vigesimal 70/80/90 rules |
| `de` | German   | ⚠️ Approximate — not compounded (`zwanzig fünf`, not `fünfundzwanzig`) |
| `es` | Spanish  | ⚠️ Approximate — no `veinti-` contractions |

> The built-in engine is **positional**: it composes ones/tens/hundreds/scales with per-locale connectors. This is fully correct for English and Persian and intelligible everywhere, but it does **not** model language-specific morphology (German compounding, French vigesimal counting, Spanish/Arabic agreement). Contributions implementing per-language rules are very welcome.

Codes are also available as a typed constant (back-compatible with the v1 enum):

```ts
import { Locales, locales } from 'number-to-locale-text';

Locales.EN; // 'en'
locales.en; // the English Locale object
```

### Examples by locale

```ts
numberToWords(25, 'en');   // "twenty-five"
numberToWords(25, 'fa');   // "بیست و پنج"
numberToWords(25, 'tr');   // "yirmi beş"
numberToWords(25, 'ar');   // "عشرون و خمسة"   (approximate)
numberToWords(25, 'fr');   // "vingt-cinq"
numberToWords(25, 'de');   // "zwanzig fünf"   (approximate)
numberToWords(25, 'es');   // "veinte y cinco" (approximate)
```

---

## Custom locales

Pass a `Locale` object anywhere a code is accepted. Use `defineLocale` for type-checking and autocompletion:

```ts
import { defineLocale, numberToWords } from 'number-to-locale-text';

const pirate = defineLocale({
  zero: 'naught',
  negative: 'minus',
  ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  teens: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
  tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
  hundreds: ['', 'one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'],
  scales: ['', 'thousand', 'million', 'billion'],
  decimalSuffixes: ['tenth', 'hundredth', 'thousandth'],
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

numberToWords(1234, pirate); // "one thousand two hundred thirty-four"
```

### The `Locale` schema

```ts
interface Locale {
  zero: string;                       // "zero"
  negative: string;                   // "minus" (no trailing space)
  ones: string[];                     // index 0 = ""; 1..9 = one..nine
  teens: string[];                    // 0..9 = ten..nineteen
  tens: string[];                     // index 0,1 = ""; 2..9 = twenty..ninety
  hundreds: string[];                 // index 0 = ""; 1..9 = one hundred..nine hundred
  scales: string[];                   // index 0 = ""; then thousand, million, …
  decimalSuffixes: string[];          // for 'fraction' mode: tenths, hundredths, …
  decimalSuffixesPlural?: string[];   // optional plurals (used when numerator ≠ 1)
  connectors: LocaleConnectors;
}

interface LocaleConnectors {
  tensAndOnes: string;     // tens ↔ ones      — EN "-"   FA " و "
  hundredAndRest: string;  // hundreds ↔ rest  — EN " "   BrE " and "
  scale: string;           // group ↔ scale    — EN " "   ("one thousand")
  group: string;           // chunk ↔ chunk    — EN " "   FA " و "
  negative: string;        // negative ↔ body  — usually " "
  decimalPoint: string;    // spoken "point"   — EN "point"  FR "virgule"
  fraction: string;        // integer ↔ fraction in 'fraction' mode — EN " and "
}
```

Each extra entry in `scales` extends the supported magnitude by three orders of ten.

---

## Precision & large numbers

JavaScript's `number` type loses integer precision above 2⁵³ and represents big values in exponential notation. To convert beyond that range exactly, **pass a string**:

```ts
numberToWords('1000000000000000', 'en');
// "one quadrillion"

numberToWords(1e21, 'en');
// ❌ RangeError: exponential notation — pass it as a string instead
```

Built-in locales support magnitudes up to their largest `scales` entry (English reaches **quintillion**, i.e. up to 10²¹ − 1). Beyond that a `RangeError` is thrown — extend the locale's `scales` array to go further.

---

## Error handling

The library **fails loudly** instead of returning a wrong answer:

```ts
numberToWords('abc', 'en');     // TypeError: Invalid numeric input: "abc".
numberToWords(Infinity, 'en');  // RangeError: Cannot convert a non-finite number.
numberToWords(5, 'xx');         // RangeError: Unknown locale "xx".
```

---

## Legacy API (deprecated)

The original stateful API still works for backwards compatibility, but is **deprecated** — it relies on shared mutable state, which is unsafe under concurrency. Prefer `numberToWords` / `createConverter`.

```ts
import { setDefaultLocale, numberToString } from 'number-to-locale-text';

setDefaultLocale('en');     // now synchronous (awaiting it is harmless)
numberToString(1205);       // "one thousand two hundred five"
```

> **Migrating from v1:** `setDefaultLocale` is now synchronous (drop the `await`), and output strings are corrected — v1 produced malformed results such as `"twenty and five"` and crashed on 4+ digit decimals and very large integers. Replace `setDefaultLocale(x)` + `numberToString(n)` with `numberToWords(n, x)`.

---

## Contributing

Contributions are welcome — especially:

- **Per-language morphology** for the locales currently marked _approximate_ (de, fr, es, ar).
- **New locales** (add a file under `src/locales/`, register it in `src/locales/index.ts`).

```bash
npm install
npm run build       # tsup → dist (ESM + CJS + .d.ts)
npm run typecheck   # tsc --noEmit
```

---

## License

[MIT](./LICENSE) © dev.zarghami
