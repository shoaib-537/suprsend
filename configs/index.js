module.exports = {
  database: {
    uri: process.env.DATABASE_URI,
  },
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      ttl: "1d",
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      ttl: "7 days",
      remeberMeTTL: "30 days",
      redisTTL: 7 * 86400, // 7 days
      redisRemeberMeTTL: 30 * 86400, //days
    },
    passwordResetToken: {
      secret: process.env.JWT_PASSWORD_RESET_TOKEN_SECRET,
      ttl: 1800,
    },
    issuer: "tomidop.com",
  },
  redis: {
    host: process.env.REDIS_HOST,
  },
  referralCode: {
    count: 1,
    length: 10,
  },

  sendgrid: {
    // apiKey: process.env.SENDGRID_API_KEY,
    // sender: process.env.SENDGRID_EMAIL_SENDER,
    // senderName: process.env.SENDGRID_EMAIL_SENDER_NAME,
    // loginCredentials:
    //   process.env.SENDGRID_TOMI_DOP_LOGIN_CREDENTIALS_EMAIL_TEMPLATE_ID,
    // passwordResetEmailTemplateId:
    //   process.env.SENDGRID_TOMI_DOP_PASSWORD_RESET_TEMPLATE_ID,
    // passwordResetSuccessEmailTemplateId:
    //   process.env.SENDGRID_TOMI_DOP_PASSWORD_RESET_SUCCESS_TEMPLATE_ID,
    // institutionDopBuyedSuccessfullyTemplatedId:
    //   process.env.SENDGRID_INSTITUTION_DOP_BUY_SUCCESS_TEMPLATE_ID,
    // dopBuyedSuccessfullyTemplatedId:
    //   process.env.SENDGRID_DOP_BUY_SUCCESS_TEMPLATE_ID,
    // tempCreatorSignupTemplatedId:
    //   process.env.SENDGRID_TEMP_CREATOR_SIGNUP_TEMPLATE_ID,
    // tempLeaderSignupTemplatedId:
    //   process.env.SENDGRID_TEMP_LEADER_SIGNUP_TEMPLATE_ID,
  },
  passwordPolicy: {
    minLowercase: 1,
    minUppercase: 1,
    minNumeric: 1,
    minSpecialChars: 1,
    minLength: 8,
  },
  maxEventListeners: 10,

  baseUrl: process.env.BASE_URL,
  frontEndUrl: process.env.FRONT_BASE_URL,
 
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    accessSecret: process.env.AWS_ACCESS_SECRET,
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      bucketRegion: process.env.AWS_S3_BUCKET_REGION,
      bucketBaseUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/`,
    },
    cloudfront: {
      baseUrl: process.env.AWS_S3_CLOUD_FRONT_URL,
    },
  },
  suprSend: {
    suprWorkSpaceKey:process.env.SUPR_WORKSPACE_SECRET,
    suprWorkSpaceSeccret:process.env.SUPR_WORKSPACE_SECRET
  },
};
