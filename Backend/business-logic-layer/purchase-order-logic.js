require("../data-access-layer/dal");
const PurchaseOrderModel = require("../models/purchase/purchase-order-model");
const helpers = require("../helpers/helpers");

async function getAllPurchaseOrdersAsync() {
    return PurchaseOrderModel.find({ isActive: true }).populate("supplier").exec();
}

async function addPurchaseOrderAsync(purchaseOrder) {
    purchaseOrder.orderNumber = await createNewOrderNumberAsync(purchaseOrder)
    purchaseOrder.createdDate = helpers.getDateTimeNow();
    return purchaseOrder.save();
}

async function createNewOrderNumberAsync(purchaseOrder) {
    const ordersCount = await getCountPurchaseOrderAsync();
    return `PO${purchaseOrder.orderDate.getFullYear()}0${ordersCount + 1}`;
}

function getCountPurchaseOrderAsync() {
    return PurchaseOrderModel.countDocuments().exec();
}

async function updatePurchaseOrderAsync(purchaseOrder) {
    purchaseOrder.lastModified = helpers.getDateTimeNow();
    const info = await PurchaseOrderModel.updateOne({ _id: purchaseOrder._id }, purchaseOrder).exec();
    return info.n ? purchaseOrder : null;
}

async function deletePurchaseOrderAsync(purchaseOrder) {
    purchaseOrder.isActive = false;
    return await updatePurchaseOrderAsync(purchaseOrder);
}

async function getSumOfPurchaseOrdersBetweenDatesAsync(fromTime, toTime) {
    const purchaseOrders = await PurchaseOrderModel.find({
        $and: [{ isActive: true }, {
            createdDate: {
                $gte: fromTime,
                $lt: toTime
            }
        }]
    }).select("totalPrice").exec();
    return helpers.calculateTotalPriceOfArray(purchaseOrders);
}

module.exports = {
    getAllPurchaseOrdersAsync,
    addPurchaseOrderAsync,
    updatePurchaseOrderAsync,
    deletePurchaseOrderAsync,
    getSumOfPurchaseOrdersBetweenDatesAsync
}