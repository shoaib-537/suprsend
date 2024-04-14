const router = require("express").Router();
const { validate } = require("express-validation");
const usersValidation = require("./users.validation");
const userController = require('./users.controller')
const JWT = require("../common/auth/jwt");




module.exports = router;
