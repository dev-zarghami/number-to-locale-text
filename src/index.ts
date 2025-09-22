export enum Locales {
    FA = "fa",
    EN = "en",
    AR = "ar",
    FR = "fr",
    DE = "de",
    ES = "es",
    TR = "tr",
}

export interface Locale {
    delimiter: string;
    zero: string;
    negative: string;
    letters: string[][];
    decimalSuffixes: string[];
}

let defaultLocale: Locale | null = null;

/**
 * Set the default locale.
 */
export const setDefaultLocale = async (localeKey: Locales): Promise<void> => {
    defaultLocale = await loadLocale(localeKey);
};

/**
 * Dynamically import locale JSON file.
 */
const loadLocale = async (locale: Locales): Promise<Locale> => {
    try {
        const module = await import(`./locales/${locale}.json`);
        return module.default ?? module;
    } catch (e) {
        throw new Error(`Locale ${locale} is not supported or missing file.`);
    }
};

const prepareNumber = (num: number | string): string[] => {
    let out = num.toString();

    if (out.length % 3 === 1) {
        out = `00${out}`;
    } else if (out.length % 3 === 2) {
        out = `0${out}`;
    }

    return out.replace(/\d{3}(?=\d)/g, "$&*").split("*");
};

const tinyNumToWord = (num: string, locale: Locale): string => {
    const {letters, delimiter} = locale;

    if (parseInt(num, 10) === 0) return "";

    const parsedInt = parseInt(num, 10);

    if (parsedInt < 10) return letters[0][parsedInt];
    if (parsedInt <= 20) return letters[1][parsedInt - 10];

    if (parsedInt < 100) {
        const one = parsedInt % 10;
        const ten = Math.floor(parsedInt / 10);
        return one > 0
            ? letters[2][ten] + delimiter + letters[0][one]
            : letters[2][ten];
    }

    const one = parsedInt % 10;
    const hundreds = Math.floor(parsedInt / 100);
    const ten = Math.floor((parsedInt % 100) / 10);

    const out = [letters[3][hundreds]];
    const secondPart = ten * 10 + one;

    if (secondPart === 0) return out.join(delimiter);

    if (secondPart < 10) {
        out.push(letters[0][secondPart]);
    } else if (secondPart <= 20) {
        out.push(letters[1][secondPart - 10]);
    } else {
        out.push(letters[2][ten]);
        if (one > 0) out.push(letters[0][one]);
    }

    return out.join(delimiter);
};

/**
 * Convert number to words using default locale
 */
export const numberToString = (input: number | string): string => {
    if (!defaultLocale) {
        throw new Error("Locale is not set. Please call setDefaultLocale first.");
    }

    const {zero, negative, delimiter, letters, decimalSuffixes} = defaultLocale;

    input = input.toString().replace(/[^0-9.-]/g, "");
    let isNegative = false;

    const floatParse = parseFloat(input);
    if (isNaN(floatParse)) return zero;
    if (floatParse === 0) return zero;

    if (floatParse < 0) {
        isNegative = true;
        input = input.replace(/-/g, "");
    }

    let decimalPart = "";
    let integerPart = input;
    const pointIndex = input.indexOf(".");
    if (pointIndex > -1) {
        integerPart = input.substring(0, pointIndex);
        decimalPart = input.substring(pointIndex + 1);
    }

    const slicedNumber = prepareNumber(integerPart);
    const out: string[] = [];

    for (let i = 0; i < slicedNumber.length; i++) {
        const converted = tinyNumToWord(slicedNumber[i], defaultLocale);
        if (converted !== "") {
            out.push(converted + letters[4][slicedNumber.length - (i + 1)]);
        }
    }

    let result = (isNegative ? negative + delimiter : "") + out.join(delimiter);

    if (decimalPart) {
        decimalPart = decimalPart.replace(/0*$/, "");
        if (decimalPart.length > 0) {
            const decimalAsNumber = parseInt(decimalPart, 10);
            const decimalWord = tinyNumToWord(decimalPart, defaultLocale);

            const suffix = decimalSuffixes[decimalPart.length - 1];

            if (suffix && decimalWord) {
                result += delimiter + decimalWord + " " + suffix;
            } else {
                result += " . " + decimalPart;
            }
        }
    }

    return result;
};
