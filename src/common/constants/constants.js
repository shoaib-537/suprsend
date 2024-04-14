module.exports = {
  DATABASE_ERROR_CODES: {
    UNIQUE_VIOLATION: 11000
  },
  DATABASE_ERROR_NAMES: {
    MONGO_SERVER_ERROR: "MongoServerError"
  },
  ROLES: {
    USER: "user",
    ADMIN: "admin",
    CREATOR: "creator",
    GOD_AGENT: "god_agent",
    MEGA_AGENT: "mega_agent",
    SUPER_AGENT: "super_agent",
    AGENT: "agent",
    MINI_AGENT: "mini_agent",
    INSTITUTION: "institution"
  },
  LEADER: {
    GOD_AGENT: "God Leader",
    MEGA_AGENT: "Mega Leader",
    SUPER_AGENT: "Super Leader",
    AGENT: "Leader",
    MINI_AGENT: "Ambassador",
    INSTITUTION: "Institution"
  },
  INVITATION_STATUS:{
    PENDING: "pending",
    ACCEPTED: "accepted",
    DECLINED: "declined",
  }
};
