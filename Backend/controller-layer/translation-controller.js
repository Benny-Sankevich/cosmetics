const express = require("express");
const translationsLogic = require("../business-logic-layer/translations-logic");
const TranslationModel = require("../models/translation-model");
const errorHelper = require("../helpers/errors-helper");
const verifyIsAdmin = require("../middleware/verify-isAdmin");

const router = express.Router();

router.post("/get-translations", async (request, response) => {
    try {
        const { languageCode } = request.body;
        const translations = await translationsLogic.getAllTranslationsByLanguageCodeAsync(languageCode);
        response.json(translations);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-translation", verifyIsAdmin, async (request, response) => {
    try {
        const translation = new TranslationModel(request.body);
        const error = translation.validateSync();
        if (error) return response.status(400).send(errorHelper.getError(error));
        const addedTranslation = await translationsLogic.addTranslationAsync(translation)
        response.status(201).json(addedTranslation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;