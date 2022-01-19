require("../data-access-layer/dal");
const SummariesModel = require("../models/summaries-model");
const summariesLogic = require("../business-logic-layer/summaries-logic");
const treatmentLogic = require("../business-logic-layer/treatment-logic");
const helpers = require("./helpers");

// need transfer to main logic
function getSummaryByTreatmentId(treatmentId) {
    return SummariesModel.findOne({ treatmentId }).exec();
}
function getSummaryByDataType(dataType) {
    return SummariesModel.findOne({ dataType }).exec();
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
        fill: fill ? fill : undefined,
    });
}

module.exports = {
    getDefaultSummariesData,
    getDefaultSummaries
}