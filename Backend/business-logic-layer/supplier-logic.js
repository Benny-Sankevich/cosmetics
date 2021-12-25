require("../data-access-layer/dal");
const SupplierModel = require("../models/purchase/supplier-model");
const helpers = require("../helpers/helpers");

function getAllSuppliersAsync() {
    return SupplierModel.find({ isActive: true }).exec();
}

function addSupplierAsync(supplier) {
    supplier.createdDate = helpers.getDateTimeNow();
    return supplier.save();
}

async function updateSupplierAsync(supplier) {
    supplier.lastModified = helpers.getDateTimeNow();
    const info = await SupplierModel.updateOne({ _id: supplier._id }, supplier).exec();
    return info.n ? supplier : null;
}

async function deleteSupplierAsync(supplier) {
    supplier.isActive = false;
    return await updateSupplierAsync(supplier);
}

module.exports = {
    getAllSuppliersAsync,
    addSupplierAsync,
    updateSupplierAsync,
    deleteSupplierAsync
}