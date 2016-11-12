const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token');

router.post('/signup', (req, res) => {
  console.log(req.body);
  models.user.findOrCreate({
    where: {
      username: req.body.username
    },
    default: {
      password: req.body.password
    }
  }).spread((userModel, created) => {
    if(created) {
      res.status(200).send(`user ${username} already exisits`);
    } else {
      console.log('new user created');
      let token = TokenService.getToken();
      res.status(200).send(token);
    }
  }).catch((err) => {
    console.log(err);
  })
});

module.exports = router;