const router = require("express").Router();
const { validate } = require("express-validation");
const taskController = require("./tasks.controller");
const JWT = require("../common/auth/jwt");


router.post(
  "/", 
  [
    // JWT.verifyAccessToken,

  ],
  taskController.addTask
)

router.get(
  "/", 
  [
    // JWT.verifyAccessToken,

  ],
  taskController.getAllTasks
)

router.delete(
  "/:id", 
  [
    // JWT.verifyAccessToken,

  ],
  taskController.deleteTask
)


// router.post(
//   "/signin",
//   [validate(authValidation.signin, { keyByField: true })],
//   authController.signin
// );


module.exports = router;
