const db = require('../models');

const Path = db.paths;

module.exports = function (req, res) {
  const validUser = req.header('userId');
  if (!validUser) {
    return res.status(401).json({
      message: 'auth denied, not author of path',
    });
  }

  try {
    console.log("Hey look at meee! I'm in a middleware WOOOOOOAAHHHH!!!");
    const { userId } = req.body;
    if (userId === null || userId === undefined) {
      return 'Author not found.';
    }
    const isAuthor = Path.findUnique({
      where: {
        id: userId,
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
