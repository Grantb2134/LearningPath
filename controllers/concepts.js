const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../models');
const auth = require('../middleware/auth');
const isAuthor = require('../middleware/isAuthor');

const Concept = db.concepts;

// @route    GET api/concepts
// @desc     Get concept all concepts
// @access   Public
router.get('/', async (req, res) => {
  try {
    const allConcepts = await Concept.findAll();
    if (allConcepts) {
      res.status(201).json(allConcepts);
    } else {
      res.status(404).json({
        message: 'No Concept found in DB',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/concepts/:id
// @desc     Get concept by ID
// @access   Public
router.get('/:conceptId', async (req, res) => {
  try {
    const getConcept = await Concept.findOne({
      where: {
        id: req.params.conceptId,
      },
    });

    if (getConcept) {
      res.status(201).json(getConcept);
    } else {
      res.status(404).json({
        message: 'No Concept found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/concepts/path/:pathId
// @desc     Get concept that belongs to a single path
// @access   Public
router.get('/path/:pathId', async (req, res) => {
  try {
    const concepts = await Concept.findAll({
      where: {
        pathId: req.params.pathId,
      },
    });

    if (concepts) {
      res.status(201).json(concepts);
    } else {
      res.status(404).json({
        message: 'No Concept found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    POST api/concepts
// @desc     Create a concept
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
    const { title, description, pathId } = req.body;
    try {
      const newConcept = await Concept.create({
        title,
        description,
        pathId,
        userId: req.user.id,
      });
      if (newConcept) {
        res.status(201).json({
          message: 'New Concept Added',
          newConcept,
        });
      } else {
        res.status(400).json({
          message: 'Error Creating concept!',
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

// @route    PUT api/concepts/:id
// @desc     Edit a concept
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
  isAuthor,
  async (req, res) => {
    const {
      description,
      title,
    } = req.body;
    console.log(req.body);
    try {
      const editConcept = await Concept.update(
        { title, description },
        { where: { id: req.params.id } },
      );
      if (editConcept) {
        res.status(201).json({
          message: 'Updated concept',
        });
      } else {
        res.status(404).json({
          message: 'Unable to concept',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
);

// @route    DELETE api/concepts/:id
// @desc     Delete a concept
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const concept = await Concept.destroy({
      where: { id: req.params.id },
    });
    if (concept) {
      res.status(201).json({
        message: 'Concept was deleted',
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        message: 'Unable to delete concept',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
