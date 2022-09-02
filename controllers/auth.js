const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    console.log(req.body);
    try {
      const user = await User.findOne({
        where: {
          email,
        },
        attributes: ['id', 'password', 'currentPath'],
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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

    const token = usePasswordHashToMakeToken(user.dataValues);
    const url = getPasswordResetURL(user, token);
    const emailTemplate = resetPasswordTemplate(user, url);
    console.log(emailTemplate);
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
        const payload = jwt.decode(token, secret);
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

module.exports = router;
