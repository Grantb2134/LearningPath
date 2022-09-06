const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models');
const auth = require('../middleware/auth');

const Path = db.paths;

// @route    GET api/paths
// @desc     Get all paths
// @access   Public   Public
router.get('/', async (req, res) => {
  try {
    const allPaths = await Path.findAll();
    if (allPaths) {
      res.status(201).json(allPaths);
    } else {
      res.status(404).json({
        message: 'No Paths found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/paths/featured
// @desc     Get featured paths
// @access   Public   Public
router.get('/featured', async (req, res) => {
  try {
    const allPaths = await Path.findAll({
      where: { featured: true },
      limit: 3,
    });
    if (allPaths) {
      res.status(201).json(allPaths);
    } else {
      res.status(404).json({
        message: 'No Paths found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/paths/:id
// @desc     Get path by ID
// @access   Public   Public
router.get('/:pathId', async (req, res) => {
  try {
    const getPath = await Path.findOne({
      where: {
        id: req.params.pathId,
      },
    });

    if (getPath) {
      res.status(201).json(getPath);
    } else {
      res.status(404).json({
        message: 'No Path found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/paths/user/:id
// @desc     Get all paths created by a user
// @access   Public   Public
router.get('/user/:userId', async (req, res) => {
  try {
    const userPaths = await Path.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    if (userPaths) {
      res.status(201).json(userPaths);
    } else {
      res.status(404).json({
        message: 'No Path found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    POST api/paths
// @desc     Create a path
// @access   Private
router.post(
  '/',
  [
    check('title')
      .notEmpty()
      .withMessage('The title can not be empty'),

    check('description')
      .notEmpty()
      .withMessage('The description can not be empty'),

  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  auth,
  async (req, res) => {
    const {
      title, description,
    } = req.body;
    try {
      const newPath = await Path.create(
        { title, description, userId: req.user.id },
      );
      if (newPath) {
        res.status(201).json({
          message: 'New Path Added',
          newPath,
        });
      } else {
        res.status(400).json({
          message: 'Error Creating New Path!',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);

// @route    PUT api/paths/:id
// @desc     Edit a path
// @access   Private
router.put(
  '/:id',
  [
    check('title')
      .notEmpty()
      .withMessage('The title can not be empty'),

    check('description')
      .notEmpty()
      .withMessage('The description can not be empty'),

  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  auth,

  async (req, res) => {
    const { title, description } = req.body;
    try {
      const editPath = await Path.update(
        { title, description },
        { where: { id: req.params.id } },
      );
      if (editPath) {
        res.status(201).json({
          message: 'Updated Path',
        });
      } else {
        res.status(404).json({
          message: 'Unable to title and description',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);

// @route    DELETE api/paths/:id
// @desc     Delete a path
// @access   Private   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const path = await Path.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (path) {
      res.status(201).json({
        message: 'Path was deleted',
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        message: 'Unable to delete path',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    PUT api/paths/feature/:id
// @desc     Set featured path by path ID
// @access   Private
router.put('/feature/:id', auth, async (req, res) => {
  try {
    const setFeatured = await Path.update(
      {
        featured: true,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (setFeatured) {
      res.status(201).json({
        message: 'Path is set as featured',
      });
    } else {
      res.status(404).json({
        message: 'Current path not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    PUT api/paths/exclude/:id
// @desc     Unset featured path by path ID
// @access   Private
router.put('/exclude/:id', auth, async (req, res) => {
  try {
    const setFeatured = await Path.update(
      {
        featured: false,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (setFeatured) {
      res.status(201).json({
        message: 'Path is unset as featured',
      });
    } else {
      res.status(404).json({
        message: 'Current path not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
