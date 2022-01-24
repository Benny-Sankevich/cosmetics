require("../data-access-layer/dal");
const SummariesModel = require("../models/summaries-model");
const treatmentLogic = require("./treatment-logic");
const helpers = require("../helpers/helpers");

function getAllSummariesByYear(year) {
    return SummariesModel.find({ year }).exec()
}
function getSummaryByYear(year, condition) {
    return SummariesModel.findOne({ $and: [{ year }, condition] }).exec();
}
function getSummaryByDataType(dataType) {
    return SummariesModel.findOne({ dataType }).exec();
}
function getSummaryByTreatmentId(treatmentId) {
    return SummariesModel.findOne({ treatmentId }).exec();
}
function getSummaryByDataTypeOrTreatmentIdAsync(parameter, year) {
    return SummariesModel.findOne({ $or: [{ dataType: parameter }, { label: parameter }] }).and({ year }).exec();
}
function addSummaries(summaries) {
    return summaries.save();
}

async function updateSummariesData(dataType, treatmentId, year, month, monthlySummary) {
    let condition = treatmentId ? { treatmentId } : { dataType };
    let existingSummary = await getSummaryByYear(year, condition);
    if (!existingSummary) {
        const newSummaries = await getDefaultSummariesData(dataType, year, treatmentId);
        existingSummary = await addSummaries(newSummaries);
    }
    existingSummary.data[month - 1] = monthlySummary;
    return SummariesModel.findByIdAndUpdate(existingSummary._id, existingSummary, { returnOriginal: false }).exec();
}

function getDefaultSummariesData(dataType, year, treatmentId) {
    if (treatmentId) return getTreatmentSummaryData(year, treatmentId)
    return getSummaryData(dataType, year);
}
async function getTreatmentSummaryData(year, treatmentId) {
    let treatment = await getSummaryByTreatmentId(treatmentId);
    if (treatment) {
        return getDefaultSummaries('treatment', treatment.type, treatment.label, treatmentId, year, treatment.borderWidth, undefined, treatment.backgroundColor, treatment.stack, undefined);
    }
    else {
        treatment = await treatmentLogic.getTreatmentByIdAsync(treatmentId);
        return getDefaultSummaries('treatment', 'bar', treatment.name, treatmentId, year, 1, null, null, 'Stack 3', null);
    }
}
async function getSummaryData(dataType, year) {
    const summary = await getSummaryByDataType(dataType);
    if (summary) {
        return getDefaultSummaries(dataType, summary.type, summary.label, null, year, null, summary.borderColor, summary.backgroundColor, null, false);
    }
    const randomColor = helpers.getRandomColor();
    return getDefaultSummaries(dataType, 'line', dataType, null, year, null, randomColor, randomColor, null, false);

}

function getDefaultSummaries(dataType, type, label, treatmentId, year, borderWidth, borColor, bgColor, stack, fill) {
    return new SummariesModel({
        dataType,
        type,
        label,
        treatmentId,
        year,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderWidth: borderWidth ? borderWidth : undefined,
        borderColor: borColor ? borColor : undefined,
        backgroundColor: bgColor ? bgColor : helpers.getRandomColor(),
        stack: stack ? stack : undefined,
        fill: fill === false ? fill : undefined,
    });
}


module.exports = {
    getAllSummariesByYear,
    updateSummariesData,
    getSummaryByDataTypeOrTreatmentIdAsync
}