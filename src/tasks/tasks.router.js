const router = require("express").Router();
const { validate } = require("express-validation");
const taskController = require("./tasks.controller");
const JWT = require("../common/auth/jwt");


router.post(
  "/", 
  [
    JWT.verifyAccessToken,

  ],
  taskController.addTask
)


// router.post(
//   "/signin",
//   [validate(authValidation.signin, { keyByField: true })],
//   authController.signin
// );


module.exports = router;
