
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const tasksService = require("./tasks.service")
exports.addTask = async (req, res, next) => {
    try {
      const addTaskDto = { ...req.body, };
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

exports.getAllTasks = async (req, res, next) => {
    try {
      const result = await tasksService.getAllTasks();
      if (result.ex) throw result.ex;
  
    
  
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: " Task  Listing",
        data: result.data,
      });
    } catch (ex) {
      next(ex);
    }
  };
exports.deleteTask = async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await tasksService.deleteTask(id);
      if (result.ex) throw result.ex;
  
    
  
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: " Task  Deleted",
      });
    } catch (ex) {
      next(ex);
    }
  };