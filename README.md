# Number to String Conversion

This repository provides a utility for converting numbers into their written form in multiple languages.  
It supports various locales and allows the user to define a default locale for the conversion.

## Features
- Convert numbers to words in multiple languages.
- Supports localization for several languages (English, Arabic, French, German, Spanish, Turkish, Persian).
- Handles decimal and negative numbers.
- Customizable locale definitions for fine-grained control over formatting.

---

## Installation

You can install the package via npm:

```bash
npm install number-to-locale-text
```

or using yarn:

```bash
yarn add number-to-locale-text
```

Alternatively, include it directly in your project.

---

## Usage

### Setting the Default Locale
Before converting numbers, you need to set the default locale:

```typescript
import { setDefaultLocale, Locales } from 'number-to-locale-text';

// Set default locale to English
await setDefaultLocale(Locales.EN);
```

---

### Converting Numbers to Words
Once a locale is set, you can use `numberToString`:

```typescript
import { numberToString } from 'number-to-locale-text';

const result = numberToString(1234.56);
console.log(result); 
// Output depends on the default locale
```

---

## Available Locales
The available locales are defined in the `Locales` enum:

```typescript
export enum Locales {
    FA = "fa", // Persian
    EN = "en", // English
    AR = "ar", // Arabic
    FR = "fr", // French
    DE = "de", // German
    ES = "es", // Spanish
    TR = "tr", // Turkish
}
```

To use a specific locale, set it with `setDefaultLocale`.

---

## Examples by Locale

Below are example outputs for the same numbers (`25`, `138`, `1205`, `25.34`, `-42`) in different locales:

### 🇮🇷 Persian (fa)
```typescript
await setDefaultLocale(Locales.FA);

console.log(numberToString(25));     // بیست و پنج
console.log(numberToString(138));    // یکصد و سی و هشت
console.log(numberToString(1205));   // یک هزار و دویست و پنج
console.log(numberToString(25.34));  // بیست و پنج و سی و چهار صدم
console.log(numberToString(-42));    // منفی چهل و دو
```

### 🇬🇧 English (en)
```typescript
await setDefaultLocale(Locales.EN);

console.log(numberToString(25));     // twenty five
console.log(numberToString(138));    // one hundred and thirty eight
console.log(numberToString(1205));   // one thousand two hundred and five
console.log(numberToString(25.34));  // twenty five point thirty four
console.log(numberToString(-42));    // minus forty two
```

### 🇸🇦 Arabic (ar)
```typescript
await setDefaultLocale(Locales.AR);

console.log(numberToString(25));     // خمسة و عشرون
console.log(numberToString(138));    // مائة و ثمانية و ثلاثون
console.log(numberToString(1205));   // ألف و مائتان و خمسة
console.log(numberToString(25.34));  // خمسة و عشرون و أربعة و ثلاثون مئة
console.log(numberToString(-42));    // سالب اثنان و أربعون
```

### 🇫🇷 French (fr)
```typescript
await setDefaultLocale(Locales.FR);

console.log(numberToString(25));     // vingt-cinq
console.log(numberToString(138));    // cent trente-huit
console.log(numberToString(1205));   // mille deux cent cinq
console.log(numberToString(25.34));  // vingt-cinq virgule trente-quatre
console.log(numberToString(-42));    // moins quarante-deux
```

### 🇩🇪 German (de)
```typescript
await setDefaultLocale(Locales.DE);

console.log(numberToString(25));     // fünfundzwanzig
console.log(numberToString(138));    // einhundertachtunddreißig
console.log(numberToString(1205));   // eintausendzweihundertfünf
console.log(numberToString(25.34));  // fünfundzwanzig Komma vierunddreißig
console.log(numberToString(-42));    // minus zweiundvierzig
```

### 🇪🇸 Spanish (es)
```typescript
await setDefaultLocale(Locales.ES);

console.log(numberToString(25));     // veinticinco
console.log(numberToString(138));    // ciento treinta y ocho
console.log(numberToString(1205));   // mil doscientos cinco
console.log(numberToString(25.34));  // veinticinco coma treinta y cuatro
console.log(numberToString(-42));    // menos cuarenta y dos
```

### 🇹🇷 Turkish (tr)
```typescript
await setDefaultLocale(Locales.TR);

console.log(numberToString(25));     // yirmi beş
console.log(numberToString(138));    // yüz otuz sekiz
console.log(numberToString(1205));   // bin iki yüz beş
console.log(numberToString(25.34));  // yirmi beş virgül otuz dört
console.log(numberToString(-42));    // eksi kırk iki
```

---

## Custom Locale Files
Locales are loaded dynamically from JSON files inside the `locales/` folder.  
You can modify existing ones or create new locales.

Each JSON must follow the `Locale` interface:

```json
{
  "delimiter": " ",
  "zero": "zero",
  "negative": "minus",
  "letters": [
    ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
    ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    ["", "hundred", "two hundred", "three hundred", "four hundred", "five hundred", "six hundred", "seven hundred", "eight hundred", "nine hundred"],
    ["", "thousand", "million", "billion"]
  ],
  "decimalSuffixes": ["tenth", "hundredth", "thousandth"]
}
```

---

## Handling Negative Numbers and Decimals
- **Negative numbers**: Adds the locale’s `negative` string.
- **Decimals**: Appends fractional part using `decimalSuffixes` if defined, otherwise falls back to `"." + digits`.

---

## Error Handling
- If `numberToString` is called before setting a default locale:
```text
Error: Locale is not set. Please set a default locale using setDefaultLocale.
```

- If you set an unsupported locale:
```text
Error: Locale <locale> is not supported.
```

---

## Locale Configuration
```typescript
export interface Locale {
  delimiter: string;
  zero: string;
  negative: string;
  letters: string[][];
  decimalSuffixes: string[];
}
```

---

## Contributing
Feel free to fork and contribute by adding new locales or improving conversions.

---

## License
This project is licensed under the **MIT License**. See the LICENSE file for details.