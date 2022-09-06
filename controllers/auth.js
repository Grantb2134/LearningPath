const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('../models');
const { transporter, getPasswordResetURL, resetPasswordTemplate } = require('../modules/email');

const User = db.users;

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
        attributes: ['id', 'password', 'currentPath'],
      });
      // CHeck if user was found
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Compare password from the request to the one in the DB with bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // Encrypt users session
      jwt.sign(
        payload,
        process.env.jwtSecurity,
        { expiresIn: '2 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: { id: user.id, currentPath: user.currentPath } });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

// Makes a token for the reset password route
const usePasswordHashToMakeToken = ({
  password,
  id,
  createdAt,
}) => {
  const secret = `${password}-${createdAt}`;
  const token = jwt.sign({ id }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

// @route    POST api/auth/reset/:email
// @desc     Send a reset email to a user
// @access   Public
router.post(
  '/reset/:email',
  async (req, res) => {
    const { email } = req.params;
    let user;
    try {
      user = await User.findOne({
        where: {
          email,
        },
        attributes: ['id', 'email', 'password', 'createdAt'],
      });
    } catch (err) {
      res.status(404).json('No user with that email');
    }
    // Make a token
    const token = usePasswordHashToMakeToken(user.dataValues);
    // Generate password reset URL
    const url = getPasswordResetURL(user, token);
    // Email template
    const emailTemplate = resetPasswordTemplate(user, url);
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err) => {
        if (err) {
          return res.status(500).json('Error sending email');
        }
        return res.status(201).json('Reset link was sent to your email.');
      });
    };
    sendEmail();
  },
);

// @route    POST api/auth/reset/:email
// @desc     Reset user password
// @access   Public
router.post(
  '/reset/:id/:token',
  [
    check('password')
      .isLength({ min: 8, max: 35 })
      .withMessage('Your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('Your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Your password should have at least one sepcial character'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password does not match');
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
  async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    User.findOne({
      where: {
        id,
      },
      attributes: ['id', 'password', 'createdAt'],
    })
      .then((user) => {
        const secret = `${user.password}-${user.createdAt}`;
        // Decode using the secret generate from the response user and token passed in params
        const payload = jwt.decode(token, secret);
        // Verify if decoded payload ID matches the user ID in the database
        if (payload.id === user.id) {
          bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) return;
            bcrypt.hash(password, salt, (hashError, hash) => {
              if (hashError) return;
              User.update({ password: hash }, { where: { id } })
                .then(() => res.status(202).json('Password changed accepted'))
                .catch((changeError) => res.status(500).json(changeError));
            });
          });
        }
      })

      .catch(() => {
        res.status(404).json('Invalid user');
      });
  },
);

// @route    PUT api/auth/currentPathId
// @desc     Set current user path
// @access   Private
router.put('/currentPath/:id', auth, async (req, res) => {
  try {
    const currentUserPath = await User.update(
      {
        currentPath: req.params.id,
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
        id: req.params.id,
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
