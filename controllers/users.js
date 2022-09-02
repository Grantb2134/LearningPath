const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const db = require('../models');
const auth = require('../middleware/auth');

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
      attributes: {
        exclude: ['password'],
      },
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
// @desc     Create a user
// @access   Public
router.post(
  '/',
  [
    check('username')
      .isLength({ min: 3, max: 30 })
      .matches(/^[a-z0-9_.-]*$/i)
      .withMessage('The username must have minimum length of 3 characters, and have no spaces or special characters'),

    check('email')
      .isEmail()
      .withMessage('invalid email address')
      .normalizeEmail(),

    check('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('Your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('Your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Your password should have at least one sepcial character'),

    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error('Confirm password does not match');
      }
      return true;
    }),
    check('username').custom((value) => User.findOne({
      where: {
        username: value,
      },
    }).then((res) => {
      if (res) {
        throw new Error('Username already exists');
      }
      return true;
    })),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  async (req, res) => {
    const { username, email, password } = req.body;

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
  },
);

// @route    DELETE api/users/:id
// @desc     DELETE user
// @access   Private
router.delete('/:id', auth, async (req, res) => {
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

// @route    PUT api/userId
// @desc     Update user credentials
// @access
router.put('/:id', auth, async (req, res) => {
  const {
    email, twitter, gitHub, website,
  } = req.body.user;
  try {
    const editUser = await User.update(
      {
        email, twitter, gitHub, website,
      },
      { where: { id: req.params.id } },
    );

    if (editUser) {
      res.status(201).json({
        message: 'Updated user',
      });
    } else {
      res.status(404).json({
        message: 'Unable to update user credentials',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// @route    PUT api/user/currentPathId
// @desc     Set current user path
// @access   Private
router.put('/currentPath', auth, async (req, res) => {
  try {
    const currentUserPath = await User.update(
      {
        currentPath: req.body.pathId,
      },
      {
        where: {
          id: req.user.id,
        },
      },
    );

    if (currentUserPath) {
      res.status(201).json({
        message: 'User path set',
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

// @route    PUT api/users/password/
// @desc     Edit user password
// @access   Private
router.put(
  '/password',
  [
    check('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one sepcial character'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error('confirm password does not match');
      }
      return true;
    }),
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
    const { password, currentPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne(
      {
        where: { id: req.user.id },
        attributes: {
          include: ['password'],
        },
      },
    );

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Password doesn't match.",
      });
    }
    try {
      const userPassword = await User.update(
        { password: newHashedPassword },
        { where: { id: req.user.id } },
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
  },
);

// @route    PUT api/users/credentials
// @desc     Update user credentials
// @access   Private
router.put('/credentials', auth, async (req, res) => {
  const {
    email, twitter, gitHub, website,
  } = req.body.user;
  try {
    const editUser = await User.update(
      {
        email, twitter, gitHub, website,
      },
      { where: { id: req.user.id } },
    );

    if (editUser) {
      res.status(201).json({
        message: 'Updated user',
      });
    } else {
      res.status(404).json({
        message: 'Unable to update user credentials',
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
