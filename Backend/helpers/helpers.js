function getDateTimeNow() {
    return new Date().toLocaleString();
}
function getToday() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
function getTomorrow() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
}
function calculateSumOfArray(sumArray) {
    if (sumArray.length === 0) return 0;
    return sumArray.map(o => o.price).reduce((a, c) => { return a + c });
}
function calculateTotalPriceOfArray(array) {
    if (array.length === 0) return 0;
    return array.map(o => o.totalPrice).reduce((a, c) => { return a + c });
}
function calculateTotalPriceOfItem(item) {
    return item.amount * item.price;
}
function chartDataLineAdapter(label, data, borderColor, backgroundColor) {
    return {
        type: 'line', label, data, borderColor, backgroundColor, fill: false
    }
}
function chartDataBarAdapter(label, treatmentId, data, backgroundColor, stack) {
    return {
        type: 'bar', label, treatmentId, data, borderWidth: 1, backgroundColor, stack
    }
}
module.exports = {
    getDateTimeNow,
    getToday,
    getTomorrow,
    calculateSumOfArray,
    calculateTotalPriceOfArray,
    calculateTotalPriceOfItem,
    chartDataLineAdapter,
    chartDataBarAdapter
}