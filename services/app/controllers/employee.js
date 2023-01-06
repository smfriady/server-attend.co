const getEmployees = async (_req, res, next) => {
  try {
    res.status(200).json({
      msg: "oke",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getEmployees };
