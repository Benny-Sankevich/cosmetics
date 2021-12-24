const crypto = require("crypto");

const salt = "ThisWebsiteToOrderCosmetics";
function hash(plainText) {
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};