const Tasks = require("./tasks.model");
const taskNotification = require("./tasks.notifications");

exports.addTask = async (addTaskDto, result = {}) => {
  try {
    const response = await Tasks.create({
      ...addTaskDto,
    });
    const send = taskNotification.notificationFunction(response);
    const sendReeminder1d = taskNotification.notificationReminderFunction(response);
    const sendReeminder2h = taskNotification.notificationReminderHourFunction(response);
    result.data = response;
  } catch (ex) {
    if (
      ex.name === CONSTANTS.DATABASE_ERROR_NAMES.MONGO_SERVER_ERROR &&
      ex.code === CONSTANTS.DATABASE_ERROR_CODES.UNIQUE_VIOLATION
    ) {
      const uniqueViolaterMessage = ex.message.split("{ ")[1];
      const uniqueViolaterField = uniqueViolaterMessage.split(":")[0];
      result.conflictMessage = `${uniqueViolaterField} already exist`;
      result.conflictField = uniqueViolaterField;
      result.hasConflict = true;
    }
  } finally {
    return result;
  }
};
exports.getAllTasks = async (result = {}) => {
  try {
    const response = await Tasks.find();
    result.data = response;
  } catch (ex) {
    result(ex);
  } finally {
    return result;
  }
};

exports.deleteTask = async (deleteTaskDto, result = {}) => {
  try {
    const { id } = deleteTaskDto;
    const response = await Tasks.findByIdAndDelete(deleteTaskDto);
    if(response){

      const send = taskNotification.deleteNotificationFunction(response);
    }
    result.data = response;
  } catch (ex) {
    result(ex);
  } finally {
    return result;
  }
};
