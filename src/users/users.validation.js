const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  createGodAgents: {
    body: Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      walletAddress: Joi.string().trim().length(42).required(),
      specialAccess: Joi.array().items(Joi.objectId()).optional(),
      myProjects: Joi.array().items(Joi.string().required()),

    })
  },
  getAllExistingLeaders: {
    query: Joi.object({
      limit: Joi.number().positive().required(),
      offset: Joi.number().positive().required(),

    })
  },

};
