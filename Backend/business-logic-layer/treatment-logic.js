require("../data-access-layer/dal");
const TreatmentModel = require("../models/treatment-model");
const helpers = require("../helpers/helpers");

function getAllTreatmentsAsync() {
    return TreatmentModel.find({ isActive: true }).exec();
}

function getTreatmentByIdAsync(_id) {
    return TreatmentModel.findById(_id).exec();
}
function addTreatmentAsync(treatment) {
    treatment.createdDate = helpers.getDateTimeNow();
    return treatment.save();
}

function updateTreatmentAsync(treatment) {
    treatment.lastModified = helpers.getDateTimeNow();
    return TreatmentModel.findByIdAndUpdate(treatment._id, treatment, { returnOriginal: false }).exec();
}

async function deleteTreatmentAsync(treatment) {
    treatment.isActive = false;
    return await updateTreatmentAsync(treatment);
}

module.exports = {
    getAllTreatmentsAsync,
    getTreatmentByIdAsync,
    addTreatmentAsync,
    updateTreatmentAsync,
    deleteTreatmentAsync
}