const db = require('../models');

const Path = db.paths;
module.exports = async function (req, res) {
  try {
    const userId = req.user.id;
    if (userId === null || userId === undefined) {
      return 'Author not found.';
    }
    const isAuthor = await Path.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (isAuthor === null || isAuthor === undefined || isAuthor.userId !== req.user.id) {
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
