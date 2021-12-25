require("../data-access-layer/dal");
const ProductModel = require("../models/purchase/product-model");
const helpers = require("../helpers/helpers");

function getAllProductsAsync() {
    return ProductModel.find({ isActive: true }).exec();
}

function addProductAsync(product) {
    product.createdDate = helpers.getDateTimeNow();
    return product.save();
}

async function updateProductAsync(product) {
    product.lastModified = helpers.getDateTimeNow();
    const info = await ProductModel.updateOne({ _id: product._id }, product).exec();
    return info.n ? product : null;
}

async function deleteProductAsync(product) {
    product.isActive = false;
    return await updateProductAsync(product);
}
module.exports = {
    getAllProductsAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync
}