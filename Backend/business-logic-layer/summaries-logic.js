require("../data-access-layer/dal");
const SummariesModel = require("../models/summaries-model");
const summariesHelper = require("../helpers/summaries-helper");

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
        const newSummaries = await summariesHelper.getDefaultSummariesData(dataType, year, treatmentId);
        existingSummary = await addSummaries(newSummaries);
    }
    existingSummary.data[month - 1] = monthlySummary;
    return SummariesModel.findByIdAndUpdate(existingSummary._id, existingSummary, { returnOriginal: false }).exec();
}


module.exports = {
    getAllSummariesByYear,
    updateSummariesData,
    getSummaryByDataType,
    getSummaryByTreatmentId,
    getSummaryByDataTypeOrTreatmentIdAsync
}