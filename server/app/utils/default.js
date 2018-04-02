exports.__esModule = true;
exports.getStandardDate = getStandardDate;
// YYYY-MM-DD HH:MM:SS
function getStandardDate(date) {
  let year = date.getFullYear;
  let Month = date.getMonth() + 1;
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}