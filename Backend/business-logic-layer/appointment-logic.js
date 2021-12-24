require("../data-access-layer/dal");
const AppointmentModel = require("../models/appointment-model");
const helpers = require("../helpers/helpers");

function getAllAppointmentsAsync() {
    return AppointmentModel.find({ isActive: true }).populate('user', ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']).populate('treatment', ['_id', 'name']).exec();
}

function getAllAppointmentsTodayAsync() {
    return AppointmentModel.find({
        $and: [{ isActive: true }, {
            dateTimeStart: {
                $gte: helpers.getToday(),
                $lt: helpers.getTomorrow()
            }
        }]
    }).populate('user', ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']).populate('treatment', ['_id', 'name']).exec();
}

function getAllAppointmentsByUserAsync(userId) {
    return AppointmentModel.find({ $and: [{ userId }, { isActive: true }] }).exec();
}

function getAllAppointmentsAwaitingApprovalAsync() {
    return AppointmentModel.find({ $and: [{ isConfirmed: false }, { isActive: true }] }).populate('user', ['_id', 'firstName', 'lastName', 'email', 'phoneNumber']).populate('treatment', ['_id', 'name']).exec();
}

function addAppointmentAsync(appointment) {
    appointment.createdDate = helpers.getDateTimeNow();
    return appointment.save();
}

async function updateAppointmentAsync(appointment) {
    appointment.lastModified = helpers.getDateTimeNow();
    const info = await AppointmentModel.updateOne({ _id: appointment._id }, appointment).exec();
    return info.n ? appointment : null;
}

async function deleteAppointmentAsync(appointment) {
    appointment.isActive = false;
    return await updateAppointmentAsync(appointment);
}

async function getSumOfOrdersBetweenDatesAsync(fromTime, toTime, condition) {
    const sumOfOrdersArr = await AppointmentModel.find({
        $and: [{ isActive: true }, condition, {
            dateTimeStart: {
                $gte: fromTime,
                $lt: toTime
            }
        }]
    }).select("price").exec();
    return helpers.calculateSumOfArray(sumOfOrdersArr);
}

async function approveAwaitingAppointmentAsync(appointments) {
    const appointmentsApproved = [];
    for (const item of appointments) {
        item.isConfirmed = true;
        const appointmentUpdated = await updateAppointmentAsync(item);
        appointmentsApproved.push(appointmentUpdated)
    }
    return appointmentsApproved;
}

module.exports = {
    getAllAppointmentsAsync,
    getAllAppointmentsTodayAsync,
    getAllAppointmentsByUserAsync,
    addAppointmentAsync,
    updateAppointmentAsync,
    deleteAppointmentAsync,
    getSumOfOrdersBetweenDatesAsync,
    getAllAppointmentsAwaitingApprovalAsync,
    approveAwaitingAppointmentAsync
}