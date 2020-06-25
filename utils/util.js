const dateToYYYYMMDDHHMMSS = date => {
    var y = date.getFullYear();
    var M = ((date.getMonth() + 1) >= 10 ? '' : '0') + (date.getMonth() + 1);
    var d = (date.getDate() >= 10 ? '' : '0') + date.getDate();
    var h = (date.getHours() >= 10 ? '' : '0') + date.getHours();
    var m = (date.getMinutes() >= 10 ? '' : '0') + date.getMinutes();
    var s = (date.getSeconds() >= 10 ? '' : '0') + date.getSeconds();
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}
const dateToYYYYMMDD = date => {
    var y = date.getFullYear();
    var M = ((date.getMonth() + 1) >= 10 ? '' : '0') + (date.getMonth() + 1);
    var d = (date.getDate() >= 10 ? '' : '0') + date.getDate();
    return y + '-' + M + '-' + d;
}
const addDay = (date, day) => {
    var d = date.getDate();
    return new Date(date.setDate(d + day));
}
const dateToWeekDay = (date) => {
    var days = '日一二三四五六';
    return '星期' + days.charAt(date.getDay());
}
const stringToDate = (str) => {
    var date = new Date(str.replace(/-/g, '/'));
    return date;
}
const isNull = obj => {
    return (obj === undefined || obj === null || obj === '') ? true : false;
}
const startWith = (origin, str) => {
    var reg = new RegExp("^" + str);
    return reg.test(origin);
}
const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}
module.exports = {
    dateToYYYYMMDDHHMMSS: dateToYYYYMMDDHHMMSS,
    dateToYYYYMMDD: dateToYYYYMMDD,
    addDay: addDay,
    dateToWeekDay: dateToWeekDay,
    stringToDate: stringToDate,
    isNull: isNull,
    startWith: startWith,
    copyObject: copyObject,
}