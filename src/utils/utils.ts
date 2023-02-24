function formatLoanMoney(number: string) {
    if (!number) {
        return '';
    }
    return (
        `${parseInt(number.replace(/\./g, ''), 10)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    );
}
function formatMoney(number: string | number | undefined) {
    if (!number) {
        return '0 đ';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`
    );
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatForEachWordCase(str: string) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function formatUpperCaseCharacter(str: string) {
    return str = str.toUpperCase?.();
}

export default {
    formatLoanMoney,
    formatMoney,
    capitalizeFirstLetter,
    formatForEachWordCase,
    formatUpperCaseCharacter
};
