require("../data-access-layer/dal");
const ReportModel = require("../models/report-model");
const summariesLogic = require("./summaries-logic");
const usersLogic = require("./user-logic");
const appointmentLogic = require("./appointment-logic");
const helpers = require("../helpers/helpers");

function getReportsListAsync() {
    return ReportModel.find({ isActive: true }).select(['title', 'description', 'letter', 'isYearly', 'isMonthly']).exec();
}

function getReportDataByReportIdAsync(_id) {
    return ReportModel.findOne({ $and: [{ _id }, { isActive: true }] }).exec();
}

function addReportAsync(report) {
    report.createdDate = helpers.getDateTimeNow();
    return report.save()
}

async function getReportDataAsync(_id, year, month) {
    const reportData = await getReportDataByReportIdAsync(_id);
    if (!reportData) return null;
    reportData.rows = await getReportRows(reportData, year, month);
    return reportData;
}

async function getReportRows(reportData, year, month) {
    switch (reportData.key) {
        case 'customersYearlyReport':
            return await getRowsReportKeyCustomersYearlyReport(reportData, year);
        case 'yearReport':
            return await getRowsReportKeyYearReport(reportData, year);
        case 'yearsOrdersAndPurchaseSum':
            return await getRowsReportKeyYearsOrdersAndPurchaseSum(reportData);
        case 'customersMonthlyReport':
            return await getRowsReportKeyMonthlyCustomersOrdersSum(year, month);
    }
    return []
}

async function getRowsReportKeyCustomersYearlyReport(reportData, year) {
    const rows = [];
    const customersList = await usersLogic.getAllUsersAsync();
    for (const customer of customersList) {
        const yearlySumData = [];
        for (let month = 1; month <= 12; month++) {
            yearlySumData.push(await appointmentLogic.getSumOfOrdersBetweenDatesAsync({ year, month }, { year, month }, { userId: customer._id }));
        }
        rows.push(getObjReportRow(reportData.visibleColumns, `${customer.firstName} ${customer.lastName}`, yearlySumData));
    }
    return rows;
}

async function getRowsReportKeyYearReport(reportData, year) {
    const rows = [];
    for (const parameter of reportData.parameters) {
        const yearlySummary = await summariesLogic.getSummaryByDataTypeOrTreatmentIdAsync(parameter.name, year);
        if (yearlySummary) {
            rows.push(getObjReportRow(reportData.visibleColumns, yearlySummary.label, yearlySummary.data));
        }
    }
    return rows;
}

async function getRowsReportKeyYearsOrdersAndPurchaseSum(reportData) {
    const rows = [];
    reportData.visibleColumns = helpers.getVisibleColumnsYearsList();
    reportData.columns.push(...reportData.visibleColumns.map((year) => createColumn(year.toString())));
    for (const parameter of reportData.parameters) {
        const yearlySummary = [];
        for (const visibleColumnYear of reportData.visibleColumns) {
            const yearlySumArray = await summariesLogic.getSummaryByDataTypeOrTreatmentIdAsync(parameter.name, visibleColumnYear);
            yearlySummary.push(helpers.calculateSumInArray(yearlySumArray?.data));
        }
        if (yearlySummary) {
            rows.push(getObjReportRow(reportData.visibleColumns, parameter.name, yearlySummary));
        }
    }
    return rows;
}

async function getRowsReportKeyMonthlyCustomersOrdersSum(year, month) {
    const lastDayOfMonth = helpers.getLastDayOfMonth(year, month - 1);
    var appointments = await appointmentLogic.getAppointmentsBetweenDatesAsync(
        new Date(year, month - 1, 1, 00, 00, 01),
        new Date(year, month - 1, lastDayOfMonth, 23, 59, 00)
    );

    let rows = [];
    for (const appointment of appointments) {
        rows.push({
            'firstName': appointment.user.firstName,
            'lastName': appointment.user.lastName,
            'dateTimeStart': dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString(),
            'treatmentName': appointment.treatment.name,
            'phoneNumber': appointment.user.phoneNumber,
            'price': appointment.price,
            'note': appointment.note,
        })
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

function createColumn(key) {
    return {
        name: key,
        label: key,
        field: key,
        sortable: true
    }
}

module.exports = {
    addReportAsync,
    getReportsListAsync,
    getReportDataAsync
}