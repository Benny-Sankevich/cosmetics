require("../data-access-layer/dal");
const ReportModel = require("../models/report-model");
const summariesLogic = require("./summaries-logic");
const helpers = require("../helpers/helpers");

function getReportsListAsync() {
    return ReportModel.find({ isActive: true }).select(['title', 'description', 'letter']).exec();
}

function getReportDataByReportIdAsync(_id) {
    return ReportModel.findOne({ $and: [{ _id }, { isActive: true }] }).exec();
}

async function getReportDataAsync(_id, year) {
    const reportData = await getReportDataByReportIdAsync(_id);
    if (!reportData) return null;
    reportData.rows = await getReportRows(reportData.visibleColumns, reportData.parameters, year);
    return reportData;
}

async function getReportRows(visibleColumns, parameters, year) {
    const rows = [];
    for (const parameter of parameters) {
        const yearlySummary = await summariesLogic.getSummaryByDataTypeOrTreatmentIdAsync(parameter.name, year);
        if (yearlySummary) {
            rows.push(getObjReportRow(visibleColumns, yearlySummary.label, yearlySummary.data));
        }
    }
    return rows;
}

function getObjReportRow(visibleColumns, label, yearlySumData) {
    let rowObject = {};
    rowObject['name'] = label;
    for (let i = 0; i < visibleColumns.length; i++) {
        rowObject[visibleColumns[i]] = yearlySumData[i];
    }
    return rowObject;
}

function addReportAsync(report) {
    report.createdDate = helpers.getDateTimeNow();
    return report.save()
}

module.exports = {
    addReportAsync,
    getReportsListAsync,
    getReportDataAsync
}