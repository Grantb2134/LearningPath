const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.users;

// @route    GET api/users
// @desc     Get users
// @access   Public
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    if (allUsers) {
      res.status(201).json(allUsers);
    } else {
      res.status(404).json({
        message: 'No Users found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findOne({
      where: {
        id,
      },
      attributes: ['email', 'username'],
    });
    if (getUser) {
      res.status(201).json(getUser);
    } else {
      res.status(404).json({
        message: 'No User found in DB',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    POST api/users
// @desc     POST user
// @access   Private
router.post('/', async (req, res) => {
  const { username, email, password } = req.body.user;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists' }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(400).json({
        message: 'Error Creating New Person!',
      });
    }

    const payload = {
      id: newUser.id,
    };

    jwt.sign(payload, process.env.jwtSecurity, { expiresIn: '2 days' }, (error, token) => {
      if (error) throw error;
      res.json({
        token,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    DELETE api/users/:id
// @desc     DELETE user
// @access   Private
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      res.status(201).json({
        message: 'User was deleted',
        id: req.params.id,
      });
    } else {
      res.status(404).json({
        message: 'Unable to delete user',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    PUT api/users/password/:id
// @desc     PUT user password
// @access   Private
router.put('/password/:id', async (req, res) => {
  try {
    const { user } = req.body;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const userPassword = await User.update(
      { password: user.password },
      { where: { id: req.params.id } },
    );
    if (userPassword) {
      res.status(201).json({
        message: 'Password was changed',
      });
    } else {
      res.status(404).json({
        message: 'Unable to change password',
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
