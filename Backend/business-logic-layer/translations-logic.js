require("../data-access-layer/dal");
const TranslationModel = require("../models/translation-model");
const helpers = require("../helpers/helpers");

async function getAllTranslationsByLanguageCodeAsync(languageCode) {
    const dbTranslationList = await TranslationModel.find().select(['code', languageCode]).exec();
    const translations = dbTranslationList.map(translation => helpers.translationAdapter(translation));
    return translations;
}

function addTranslationAsync(translation) {
    translation.createdDate = helpers.getDateTimeNow();
    return translation.save();
}

module.exports = {
    getAllTranslationsByLanguageCodeAsync,
    addTranslationAsync
}