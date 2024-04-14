const userSubscriber = require("../src/users/subscribers/users.subscriber");
// const emailSubscriber = require("../src/email-stats/subscribers/email-stats.subscriber");
// const tempSubscriber = require("../src/temp/subscribers/temp.subscriber")

exports.registerSubscribers = function () {
userSubscriber.registerListeners();
// tempSubscriber.registerListeners();
// emailSubscriber.registerListeners();
};
