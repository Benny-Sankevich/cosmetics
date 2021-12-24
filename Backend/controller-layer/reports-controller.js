const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const reportsLogic = require("../business-logic-layer/reports-logic");
const verifyIsAdmin = require("../middleware/verify-isAdmin");

const router = express.Router();
router.use(verifyIsAdmin);

router.post("/get-year-data-report", async (request, response) => {
    try {
        const { year } = request.body;
        if (typeof year !== 'number') return response.status(400).send(`Year must be type number.`);
        const reportData = await reportsLogic.getDataReportByYearAsync(year);
        response.json(reportData);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;