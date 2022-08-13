const db = require('../models');

const Path = db.paths;

module.exports = function (req, res) {
  try {
    const userId = req.user.id;
    if (userId === null || userId === undefined) {
      return 'Author not found.';
    }
    const isAuthor = Path.findUnique({
      where: {
        userId,
      },
    });
    if (isAuthor === null || isAuthor === undefined) {
      return 'Author not found.';
    }
  } catch (err) {
    const msg = err.message;
    console.error('Problem in isAuthor: ', msg);
    return res.status(500).send({
      status: 500,
      message: msg,
      error: err,
    });
  }
};
