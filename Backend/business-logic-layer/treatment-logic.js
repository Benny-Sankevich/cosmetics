require("../data-access-layer/dal");
const TreatmentModel = require("../models/treatment-model");
const helpers = require("../helpers/helpers");

function getAllTreatmentsAsync() {
    return TreatmentModel.find({ isActive: true }).exec();
}

function getTreatmentByIdAsync(_id) {
    return TreatmentModel.findOne({ _id }).exec();
}
function addTreatmentAsync(treatment) {
    treatment.createdDate = helpers.getDateTimeNow();
    return treatment.save();
}

async function updateTreatmentAsync(treatment) {
    treatment.lastModified = helpers.getDateTimeNow();
    const info = await TreatmentModel.updateOne({ _id: treatment._id }, treatment).exec();
    return info.n ? treatment : null;
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