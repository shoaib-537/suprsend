const { Suprsend } = require("@suprsend/node-sdk");
const configs = require("../../configs");
const { Workflow } = require("@suprsend/node-sdk");

exports.notificationFunction = async (notificationFunctionDto) => {
  const { _id, userId , title} = notificationFunctionDto;
  const supr_client = new Suprsend(
    "taJqjSoneQP1JqYXiz7F",
    "SS.WSS.6q1DAJ0k4HagEsFdZ1ceVS5Y_aGe6M-t0cKU-g5h"
  );

  const workflow_body = {
    name: "suprpush",
    template: "suprpush",
    notification_category: "promotional", 
    users: [
      {
        distinct_id: "kasipi4810@rartg.com",
      },
    ],

    data: {
      user: "userId",
      title:title
    },
  };

  const wf = new Workflow(workflow_body, { brand_id: "default" });
  const response = supr_client.trigger_workflow(wf); 

  response.then((res) => console.log("response", res));
};

exports.notificationReminderFunction = async (notificationFunctionDto) => {
  const { _id, userId , title, date} = notificationFunctionDto;
const datee = new Date(date)
datee.setDate(datee.getDate() - 1);

  const supr_client = new Suprsend(
    "taJqjSoneQP1JqYXiz7F",
    "SS.WSS.6q1DAJ0k4HagEsFdZ1ceVS5Y_aGe6M-t0cKU-g5h"
  );

  const workflow_body = {
    name: "reminder24",
    template: "reminder24",
    notification_category: "promotional", 
    users: [
      {
        distinct_id: "kasipi4810@rartg.com",
      },
    ],

    data: {
      user: "userId",
      task:title,
      expiry_time:datee
    },
  };

  const wf = new Workflow(workflow_body, { brand_id: "default" });
  const response = supr_client.trigger_workflow(wf); 

  response.then((res) => console.log("response", res));
};

exports.notificationReminderHourFunction = async (notificationFunctionDto) => {
  const { _id, userId , title, date} = notificationFunctionDto;
const datee = new Date(date)
datee.setHours(datee.getHours() - 2);
  const supr_client = new Suprsend(
    "taJqjSoneQP1JqYXiz7F",
    "SS.WSS.6q1DAJ0k4HagEsFdZ1ceVS5Y_aGe6M-t0cKU-g5h"
  );

  const workflow_body = {
    name: "reminder2h",
    template: "reminder2h",
    notification_category: "promotional", 
    users: [
      {
        distinct_id: "kasipi4810@rartg.com",
      },
    ],

    data: {
      user: "userId",
      task:title,
      expiry_time:datee
    },
  };

  const wf = new Workflow(workflow_body, { brand_id: "default" });
  const response = supr_client.trigger_workflow(wf); 

  response.then((res) => console.log("response", res));
};

exports.deleteNotificationFunction = async (notificationFunctionDto) => {
  const {  title} = notificationFunctionDto;
  const supr_client = new Suprsend(
    "taJqjSoneQP1JqYXiz7F",
    "SS.WSS.6q1DAJ0k4HagEsFdZ1ceVS5Y_aGe6M-t0cKU-g5h"
  );

  const workflow_body = {
    name: "suprdelete",
    template: "suprdelete",
    notification_category: "promotional", 
    users: [
      {
        distinct_id: "kasipi4810@rartg.com",
      },
    ],

    data: {
      user: "userId",
      title:title
    },
  };

  const wf = new Workflow(workflow_body, { brand_id: "default" });
  const response = supr_client.trigger_workflow(wf); 

  response.then((res) => console.log("response", res));
};
