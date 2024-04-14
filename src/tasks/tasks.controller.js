
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const tasksService = require("./tasks.service")
exports.addTask = async (req, res, next) => {
    try {
      const addTaskDto = { ...req.body, userId:req.user.id };
      const result = await tasksService.addTask(addTaskDto);
      if (result.ex) throw result.ex;
  
    
  
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: " Task added Successful",
        data: result.data,
      });
    } catch (ex) {
      next(ex);
    }
  };