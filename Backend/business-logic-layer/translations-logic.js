require("../data-access-layer/dal");
const TranslationModel = require("../models/translation-model");

function getAllTranslationsByLanguageCodeAsync(languageCode) {
    return TranslationModel.find({ languageCode }).exec();
}

function addTranslationAsync(translation) {
    return translation.save();
}

module.exports = {
    getAllTranslationsByLanguageCodeAsync,
    addTranslationAsync
}