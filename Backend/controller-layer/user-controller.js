const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const UserModel = require("../models/user-model");
const userLogic = require("../business-logic-layer/user-logic");
const verifyIsAdmin = require("../middleware/verify-isAdmin");
const verifyIsLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.post("/get-users", verifyIsAdmin, async (request, response) => {
    try {
        const users = await userLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-total-users", verifyIsAdmin, async (request, response) => {
    try {
        const totalUsers = await userLogic.getCountActiveUsersAsync();
        response.json(totalUsers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-new-users-today", verifyIsAdmin, async (request, response) => {
    try {
        const countNewUsersToday = await userLogic.getCountUsersCreatedTodayAsync();
        response.json(countNewUsersToday);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-user", verifyIsAdmin, async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const error = user.validateSync();
        if (error) return response.status(400).send(error.message);
        const userAdded = await userLogic.addUserAsync(user);
        response.status(201).json(userAdded);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/update-user", verifyIsLoggedIn, async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const error = user.validateSync();
        if (error) return response.status(400).send(error.message);
        const userUpdated = await userLogic.updateUserAsync(user);
        if (!userUpdated) return response.status(404).send(`_id ${userUpdated._id} not found.`);
        response.status(201).json(userUpdated);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;