const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
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
const isNull = obj => {
  return (obj === undefined || obj === null || obj === '') ? true : false;
}
const startWith = (origin, str) => {
  var reg = new RegExp("^" + str);
  return reg.test(origin);
}
module.exports = {
  dateToYYYYMMDDHHMMSS: dateToYYYYMMDDHHMMSS,
  dateToYYYYMMDD: dateToYYYYMMDD,
  addDay: addDay,
  isNull: isNull,
  startWith: startWith,
}
