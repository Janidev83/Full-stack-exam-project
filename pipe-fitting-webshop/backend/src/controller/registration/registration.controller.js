const express = require('express');
const registrationController = express.Router();
const registrationService = require('../registration/registration.service');

registrationController.post('/', (req, res, next) => {
    return registrationService.create(req, res, next);
});

module.exports = registrationController;