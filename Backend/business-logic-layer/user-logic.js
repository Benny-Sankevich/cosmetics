require("../data-access-layer/dal");
const UserModel = require('../models/user-model');
const helpers = require("../helpers/helpers");

function getAllUsersAsync() {
    return UserModel.find().exec();
}

function addUserAsync(user) {
    user.createdDate = helpers.getDateTimeNow();
    return user.save();
}

async function updateUserAsync(user) {
    user.lastModified = helpers.getDateTimeNow();
    const info = await UserModel.updateOne({ _id: user._id }, user).exec();
    return info.n ? user : null;
}

function getCountActiveUsersAsync() {
    return UserModel.countDocuments({ isActive: true }).exec();
}

function getCountUsersCreatedTodayAsync() {
    return UserModel.countDocuments({
        $and: [{ isActive: true }, {
            createdDate: {
                $gte: helpers.getToday(),
                $lt: helpers.getTomorrow()
            }
        }]
    }).exec();
}

module.exports = {
    getAllUsersAsync,
    addUserAsync,
    updateUserAsync,
    getCountActiveUsersAsync,
    getCountUsersCreatedTodayAsync
}