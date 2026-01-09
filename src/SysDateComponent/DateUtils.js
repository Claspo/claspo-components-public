import { normalizeLanguage } from '@claspo/renderer/sdk/TranslationUtils';

export class DateUtils {
    static getDatePartsOrder(locale) {
        const currentLocaleDateFormatParts = new Intl.DateTimeFormat(locale).formatToParts();
        const filteredParts = currentLocaleDateFormatParts.filter(part => ['year', 'month', 'day'].includes(part.type));
        return filteredParts.map(part => part.type);
    }

    static convertMonthToNumeric(month, language) {
        return DateUtils.getAllMonthsByLanguage('short', language)
            .findIndex(monthFromList => monthFromList === month) + 1;
    }

    static convertNumericToMonth(month, language) {
        return DateUtils.getAllMonthsByLanguage('short', language)[month - 1];
    }

    static getAllMonthsByLanguage(outputFormat = 'short', language) {
        const normalizedLanguage = normalizeLanguage(language);
        return new Array(12).fill(0).map((_, i) => {
            // Note: new Date(`${i + 1}/1`) will not work, as ISO 8601 strings are not supported by Safari.
            // E.g.: new Date('1999-2-22') - in Safari will return "Invalid Date".
            return new Date(2000, i, 1).toLocaleDateString(normalizedLanguage, { month: outputFormat })
        }).map(monthName => monthName.charAt(0).toUpperCase() + monthName.slice(1));
    }

    static convertDashedStringDateIntoDate(dateAsString) {
        // Input example: 1999-01-22
        const currentDayValue = +dateAsString.split('-')[2];
        const currentMonthValue = +dateAsString.split('-')[1];
        const currentYearValue = +dateAsString.split('-')[0];

        // Note: Setting full year manually because Date obj handles some years with own logic. We want to allow range 0-3000.
        // When year is not used - it should allow to choose 29 Feb. (which is only for leap years). It will set year to 0000 in this case - it is a leap year.
        return new Date(new Date(2000, currentMonthValue - 1, currentDayValue).setFullYear(currentYearValue));
    }

    static convertToDoubleDigit(value) {
        if (!value) {
            return '00';
        }

        if (+value < 10) {
            return `0${value}`;
        }

        return value;
    }

    static normalizeYearInput(year) {
        if (year === '0') {
            return '0000';
        }

        if (!year) {
            return '';
        }

        //Note: `${+year}` - to convert inputs like 000002345 into 2345
        return `${+year}`.padStart(4, '0');
    }
}
