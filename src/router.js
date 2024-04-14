const usersRouter = require("./users/users.router");
const authRouter = require("./auth/auth.router");
// const projectRouter = require('./projects/projects.router')
// const tokenRouter = require('./tokens/tokens.router');
// const metadataRouter = require('./metadata/metadata.router');
// const tempRouter = require("./temp/temp.signup.router")
// const invitationRouter = require("./invitations/invitations.router")
const tasksRouter = require("./tasks/tasks.router")
// const buyingRouter = require("./buying/buying.router")

exports.initRoutes = (app) => {
  authRouter.initRoutes(app);
  app.use("/tasks", tasksRouter);
  // app.use('/projects', projectRouter);
  // app.use('/tokens', tokenRouter);
  // app.use('/metadata', metadataRouter);
  // app.use("/temp", tempRouter)
  // app.use("/invitation", invitationRouter )
  // app.use("/buying", buyingRouter )

};
