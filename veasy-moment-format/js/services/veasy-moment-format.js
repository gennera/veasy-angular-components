angular.module('veasy.momentFormat').service('vMomentFormatService', function () {
    const SEPARATORS = ['/', '-', ':', '.', ',', ' '];
    const SEPARATORS_REGEX = /[^\/-:.,\s]/gm;

    const getOptions = function (format) {
        const separatorsAndRegex = extractSeparatorsAndRegex(format);
        return { format, size: format.length, ...separatorsAndRegex };
    };

    const getFieldPlaceholder = function (format) {
        return format.replace(SEPARATORS_REGEX, '_');
    };

    const extractSeparatorsAndRegex = function (format) {
        const separators = [];
        let regex = '';
        let storage = '';
        for (let index = 0; index < format.length; index++) {
            const character = format[index];
            if (isSeparatorCharacter(character)) {
                if (storage.length) {
                    regex += getOnlyNumbersRegex(storage.length);
                    storage = '';
                }
                separators.push({ index, character });
                regex += getSeparatorRegex(character);
            } else {
                storage += character;
            }
        }
        if (storage.length) {
            regex += getOnlyNumbersRegex(storage.length);
        }
        regex = new RegExp(`(${regex})$`);
        return { separators, regex };
    };

    const isSeparatorCharacter = function (character) {
        return !!SEPARATORS.find(separator => separator === character);
    };

    const getOnlyNumbersRegex = function (totalOfNumbers) {
        return `[0-9]{${totalOfNumbers}}`
    };

    const getSeparatorRegex = function (character) {
        return `[${character}]`
    };

    const isValid = function (text, regex, format) {
        return isValidByRegex(text, regex) && isValidMoment(text, format);
    };

    const isValidByRegex = function (text, regex) {
        return regex.test(text);
    };

    const isValidMoment = function (text, format) {
        return moment(text, format).isValid();
    };

    const isValidKeyCode = function (keyCode, shiftKey) {
        return isNumberKeyCode(keyCode, shiftKey) || isAnotherValidKeyCode(keyCode);
    };

    const isNumberKeyCode = function (keyCode, shiftKey) {
        return ((keyCode > 47 && keyCode < 58) && !shiftKey) || ((keyCode > 95 && keyCode < 106) && !shiftKey); // 0-9 and numpad 0-9
    };

    const isAnotherValidKeyCode = function (keyCode) {
        return !!([37, 39, 91, 8, 46, 32].find(code => code === keyCode)); // arrows, meta, backspace, delete, etc.
    };

    const defineInputSize = function (text, OPTIONS) {
        if (text.length >= OPTIONS.size) text = text.slice(0, OPTIONS.size);
        return text;
    };

    const applySeparators = function (text, OPTIONS) {
        const separators = OPTIONS.separators.filter(separator => separator.index <= (text.length - 1));
        for (let separator of separators) {
            text = applySeparator(text, separator);
        }
        return text;
    };

    const applySeparator = function (text, separator) {
        const textArray = text.split('');
        if (textArray[separator.index] !== separator.character) textArray.splice(separator.index, 0, separator.character);
        return textArray.join('');
    };

    return { getOptions, isValid, isValidKeyCode, getFieldPlaceholder, defineInputSize, applySeparators };
});