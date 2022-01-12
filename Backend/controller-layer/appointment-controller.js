const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const AppointmentModel = require("../models/appointment-model");
const appointmentLogic = require("../business-logic-layer/appointment-logic");
const verifyIsAdmin = require("../middleware/verify-isAdmin");

const router = express.Router();
router.use(verifyIsAdmin);

router.post("/get-appointments", async (request, response) => {
    try {
        const appointments = await appointmentLogic.getAllAppointmentsAsync();
        response.json(appointments);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-appointments-by-user", async (request, response) => {
    try {
        const { userId } = request.body;
        const appointments = await appointmentLogic.getAllAppointmentsByUserAsync(userId);
        response.json(appointments);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-appointments-awaiting-approval", async (request, response) => {
    try {
        const appointmentsAwaitingApproval = await appointmentLogic.getAllAppointmentsAwaitingApprovalAsync();
        response.json(appointmentsAwaitingApproval);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-appointments-today", async (request, response) => {
    try {
        const appointmentsToday = await appointmentLogic.getAllAppointmentsTodayAsync();
        response.json(appointmentsToday);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/get-sum-between-date", async (request, response) => {
    try {
        const date = request.body;
        const sum = await appointmentLogic.getSumOfOrdersBetweenDatesAsync(date.fromTime, date.toTime, {});
        response.json(sum);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-appointment", async (request, response) => {
    try {
        const appointment = new AppointmentModel(request.body);
        const error = appointment.validateSync();
        if (error) return response.status(400).send(errorHelper.getError(error));
        const addedAppointment = await appointmentLogic.addAppointmentAsync(appointment);
        response.status(201).json(addedAppointment);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/approve-appointments", async (request, response) => {
    try {
        const appointmentsToApprove = request.body;
        let errorMessage = null;
        appointmentsToApprove.forEach((item) => {
            if (item._id == undefined) {
                errorMessage = `Missing id`;
                return;
            }
            const appointment = new AppointmentModel(item);
            const error = appointment.validateSync();
            if (error) {
                errorMessage = `Id: ${appointment._id} - ${error.message}`;
                return;
            }
        })
        if (errorMessage) return response.status(400).send(errorMessage);
        const approvedAppointment = await appointmentLogic.approveAwaitingAppointmentAsync(appointmentsToApprove);
        response.status(201).json(approvedAppointment);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/update-appointment", async (request, response) => {
    try {
        const appointment = new AppointmentModel(request.body);
        const error = appointment.validateSync();
        if (error) return response.status(400).send(errorHelper.getError(error));
        const updatedAppointment = await appointmentLogic.updateAppointmentAsync(appointment);
        if (!updatedAppointment) return response.status(404).send('Appointment has not found please try again');
        response.status(201).json(updatedAppointment);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/delete-appointment", async (request, response) => {
    try {
        const appointment = request.body;
        await appointmentLogic.deleteAppointmentAsync(appointment);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;