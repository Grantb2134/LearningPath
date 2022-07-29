const express = require('express');

const router = express.Router();
const db = require('../models');
const auth = require('../middleware/auth');

const Content = db.contents;

router.get('/', async (req, res) => {
  try {
    const allContents = await Content.findAll();
    if (allContents) {
      res.status(201).json(allContents);
    } else {
      res.status(404).json({
        message: 'No Content found in DB',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/contents/:id
// @desc     Get content by ID
// @access   Public
router.get('/:contentId', async (req, res) => {
  try {
    const getContent = await Content.findOne({
      where: {
        id: req.params.contentId,
      },
    });

    if (getContent) {
      res.status(201).json(getContent);
    } else {
      res.status(404).json({
        message: 'No Content found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/content/concept/:conceptId
// @desc     Get content that belongs to a single concept
// @access
router.get('/concept/:conceptId', async (req, res) => {
  try {
    const content = await Content.findAll({
      where: {
        conceptId: req.params.conceptId,
      },
    });

    if (content) {
      res.status(201).json(content);
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
  const { content } = req.body;
  try {
    const newContent = await Content.create({
      title: content.title,
      description: content.description,
      link: content.link,
      conceptId: content.conceptId,
    });
    if (newContent) {
      res.status(201).json({
        message: 'New Content Added',
        newContent,
      });
    } else {
      res.status(400).json({
        message: 'Error Creating content!',
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
    link,
    conceptId,
  } = req.body;
  try {
    const editContent = await Content.update(
      {
        title, description, conceptId, link,
      },
      { where: { id: req.params.id } },
    );
    if (editContent) {
      res.status(201).json({
        message: 'Updated content',
      });
    } else {
      res.status(404).json({
        message: 'Unable to content',
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
    const content = await Content.destroy({
      where: { id: req.params.id },
    });
    if (content) {
      res.status(201).json({
        message: 'Content was deleted',
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        message: 'Unable to delete content',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
