const { Suprsend } = require("@suprsend/node-sdk");
const configs = require("../../configs")
const { Workflow } = require("@suprsend/node-sdk")


exports.notificationFunction = async(notificationFunctionDto) => {
const {_id, userId} = notificationFunctionDto
console.log("notificationFunctionDto", notificationFunctionDto)
const supr_client = new Suprsend(
    configs.suprSend.suprWorkSpaceKey,
    configs.suprSend.suprWorkSpaceSeccret
  
)
const workflow_body = {
    "name": "success",
    "template": "Sucess",
    "notification_category": "promotional", //notification category transactional/promotional/system
    "users": [
      {
        "distinct_id": userId.toString(), 
  
      }
    ],
  
        // data can be any json
        "data": {
          "user":userId,
           
        }
  } 
  
  const wf = new Workflow(workflow_body, {brand_id:"default"})
  const response = supr_client.trigger_workflow(wf); // returns promise

  console.log("response", response)
  response.then((res) => console.log("response", res));

}