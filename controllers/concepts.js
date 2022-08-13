const express = require('express');

const router = express.Router();
const db = require('../models');
const auth = require('../middleware/auth');

const Concept = db.concepts;

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
// @access
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

router.post('/', auth, async (req, res) => {
  const { concept } = req.body;
	console.log("\n\n\n\ntest\n\n\n\n")
  try {
    const newConcept = await Concept.create({
      title: concept.title,
      description: concept.description,
      pathId: concept.pathId,
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
});

router.put('/:id', auth, async (req, res) => {
  const {
    description,
    title,
  } = req.body.concept;
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
});

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
