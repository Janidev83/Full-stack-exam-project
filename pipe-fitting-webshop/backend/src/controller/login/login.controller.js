const express = require('express');
const loginController = express.Router();
const loginService = require('../login/login.service');

loginController.post('/', (req, res, next) => {
    return loginService.findByEmail(req, res, next);
});

module.exports = loginController;