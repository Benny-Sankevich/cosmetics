require("../data-access-layer/dal");
const treatmentLogic = require("./treatment-logic");
const appointmentsLogic = require("./appointment-logic");
const purchaseOrderLogic = require("./purchase-order-logic");
const helpers = require("../helpers/helpers");

async function getDataReportByYearAsync(year) {
    const yearReportData = [];
    const treatmentReportData = await getTreatmentYearDataAsync(year)
    yearReportData.push(...treatmentReportData);
    yearReportData.push(await getOrdersYearDataAsync(year));
    yearReportData.push(await getPurchaseOrdersYearDataAsync(year));
    return yearReportData;
}
async function getTreatmentYearDataAsync(year) {
    const treatmentYearData = [];
    const treatments = await treatmentLogic.getAllTreatmentsAsync();
    for (const [index, treatment] of treatments.entries()) {
        const treatmentsYearSum = await calculateYearDataAsync(year, appointmentsLogic.getSumOfOrdersBetweenDatesAsync, { treatmentId: treatment._id });
        treatmentYearData.push(await helpers.chartDataBarAdapter(treatment.name, treatment._id, treatmentsYearSum, treatment.backgroundColor, `Stack ${index}`))
    }
    return treatmentYearData;
}
async function getOrdersYearDataAsync(year) {
    const ordersYearSum = await calculateYearDataAsync(year, appointmentsLogic.getSumOfOrdersBetweenDatesAsync, {});
    return await helpers.chartDataLineAdapter('Orders', ordersYearSum, '#228B22', '#228B22');
}
async function getPurchaseOrdersYearDataAsync(year) {
    const purchaseYearSum = await calculateYearDataAsync(year, purchaseOrderLogic.getSumOfPurchaseOrdersBetweenDatesAsync, {});
    return await helpers.chartDataLineAdapter('Purchase orders', purchaseYearSum, '#DC143C', '#DC143C')
}
async function calculateYearDataAsync(year, functionName, condition) {
    const yearSum = [];
    for (let i = 1; i <= 12; i++) {
        const itemSum = await functionName(`${year}-${i}-01`, `${year}-${i}-31`, condition);
        yearSum.push(itemSum);
    }
    return yearSum;
}
module.exports = {
    getDataReportByYearAsync
}