require("../data-access-layer/dal");
const PurchaseOrderModel = require("../models/purchase/purchase-order-model");
const summariesLogic = require("./summaries-logic");
const helpers = require("../helpers/helpers");

function getAllPurchaseOrdersAsync() {
    return PurchaseOrderModel.find({ isActive: true }).populate("supplier").exec();
}

function getPurchaseOrderAsync(_id) {
    return PurchaseOrderModel.findById(_id).populate("supplier").exec();
}

function getCountPurchaseOrderAsync() {
    return PurchaseOrderModel.countDocuments().exec();
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

async function updatePurchaseOrderAsync(purchaseOrder) {
    purchaseOrder.lastModified = helpers.getDateTimeNow();
    const purchaseOrderUpdated = await PurchaseOrderModel.findByIdAndUpdate(purchaseOrder._id, purchaseOrder, { returnOriginal: false }).exec();
    if (purchaseOrderUpdated) {
        updateSummaries(purchaseOrderUpdated.orderDate.getFullYear(), purchaseOrderUpdated.orderDate.getMonth() + 1)
        return await getPurchaseOrderAsync(purchaseOrderUpdated._id);;
    }
    return null;
}

async function deletePurchaseOrderAsync(purchaseOrder) {
    purchaseOrder.isActive = false;
    return await updatePurchaseOrderAsync(purchaseOrder);
}

async function getSumOfPurchaseOrdersBetweenDatesAsync(fromTime, toTime) {
    const lastDayOfMonth = helpers.getLastDayOfMonth(toTime.year, toTime.month - 1);
    const purchaseOrders = await PurchaseOrderModel.find({
        $and: [{ isActive: true }, {
            orderDate: {
                $gte: `${fromTime.year}-${add0(fromTime.month) + fromTime.month}-01T00:00:00.000+00:00`,
                $lt: `${toTime.year}-${add0(toTime.month) + toTime.month}-${add0(lastDayOfMonth) + lastDayOfMonth}T23:59:59.000+00:00`
            }
        }]
    }).select("totalPrice").exec();
    return helpers.calculateTotalPriceOfArray(purchaseOrders);
}



function add0(num) {
    return num < 10 ? '0' : ''
}

async function updateSummaries(year, month) {
    const monthlySummary = await getSumOfPurchaseOrdersBetweenDatesAsync({ year, month }, { year, month });
    summariesLogic.updateSummariesData('purchaseOrders', null, year, month, monthlySummary)
}

module.exports = {
    getAllPurchaseOrdersAsync,
    addPurchaseOrderAsync,
    updatePurchaseOrderAsync,
    deletePurchaseOrderAsync,
    getSumOfPurchaseOrdersBetweenDatesAsync
}