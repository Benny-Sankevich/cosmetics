const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const TreatmentModel = require("../models/treatment-model");
const treatmentLogic = require("../business-logic-layer/treatment-logic");
const verifyIsAdmin = require("../middleware/verify-isAdmin");
const verifyIsLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.post("/get-treatments", verifyIsLoggedIn, async (request, response) => {
    try {
        const treatments = await treatmentLogic.getAllTreatmentsAsync();
        response.json(treatments);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-treatment", verifyIsAdmin, async (request, response) => {
    try {
        const treatment = new TreatmentModel(request.body);
        const error = treatment.validateSync();
        if (error) return response.status(400).send(error.message);
        const treatmentAdded = await treatmentLogic.addTreatmentAsync(treatment);
        response.status(201).json(treatmentAdded);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/update-treatment", verifyIsAdmin, async (request, response) => {
    try {
        const treatment = new TreatmentModel(request.body);
        const error = treatment.validateSync();
        if (error) return response.status(400).send(error.message);
        const treatmentUpdated = await treatmentLogic.updateTreatmentAsync(treatment);
        if (!treatmentUpdated) return response.status(404).send(`_id ${treatmentUpdated._id} not found.`);
        response.status(201).json(treatmentUpdated);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/delete-treatment", verifyIsAdmin, async (request, response) => {
    try {
        const treatment = new TreatmentModel(request.body);
        const error = treatment.validateSync();
        if (error) return response.status(400).send(error.message);
        await treatmentLogic.deleteTreatmentAsync(treatment);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;