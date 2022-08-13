const express = require('express');

const router = express.Router();
const db = require('../models');
const auth = require('../middleware/auth');

const Path = db.paths;

// @route    GET api/paths
// @desc     Get all paths
// @access
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

// @route    GET api/paths/:id
// @desc     Get path by ID
// @access
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
// @access
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
// @access
router.post('/', auth, async (req, res) => {
  const {
    title, description,
  } = req.body.path;
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
});

// @route    PUT api/paths/:id
// @desc     Edit a path
// @access
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const editPath = await Path.update(
      { title, description },
      { where: { id: req.params.id } },
    );

    if (editPath) {
      res.status(201).json({
        message: 'Updated post',
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
});

// @route    DELETE api/paths/:id
// @desc     Delete a path
// @access
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

module.exports = router;
