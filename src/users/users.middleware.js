exports.calculatePercentageDifference = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    const diffInMilliseconds = endTime.getTime() - startTime.getTime();

    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    const findPercentageDifferenceDate = new Date(
      startTime.getTime() - diffInDays * 24 * 60 * 60 * 1000
    );

    req.query = {
      ...req.query,
      findPercentageDifferenceDate
    };

    next();
  } catch (ex) {
    next(ex);
  }
};
