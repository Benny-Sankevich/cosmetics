require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const UserModel = require('../models/user-model');
const helpers = require("../helpers/helpers");

function getAllUsersAsync() {
    return UserModel.find().exec();
}

function addUserAsync(user) {
    user.createdDate = helpers.getDateTimeNow();
    return user.save();
}

async function updateUserAsync(user, image) {
    if (image && checkImageExtension(image.name)) {
        await removeOldUserImage(user.imageName);
        user.imageName = getNewImageName(image.name);
        saveImage(image, user.imageName);
    }
    if (user.oldImageName) {
        await removeOldUserImage(user.oldImageName);
        user.oldImageName = undefined;
    }
    user.lastModified = helpers.getDateTimeNow();
    const info = await UserModel.updateOne({ _id: user._id }, user).exec();
    return info.n ? user : null;
}

function checkImageExtension(imageName) {
    const imageExtensionTypes = /\.(gif|jpg|jpeg|tiff|png|ico|xbm|tif|svgz|jif|svg|jfif|webp|bmp|pjpeg|avif)$/i;
    if (!path.extname(imageName).match(imageExtensionTypes)) return false;
    return true;
}

async function removeOldUserImage(imageName) {
    if (imageName !== config.defaultUserImage) {
        await fs.unlinkSync("./assets/upload/" + imageName);
    }
}

function getNewImageName(imageName) {
    const extension = imageName.substr(imageName.lastIndexOf("."));
    return uuid.v4() + extension;
}

async function saveImage(image, imageName) {
    await image.mv("./assets/upload/" + imageName);
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