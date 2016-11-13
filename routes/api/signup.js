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
    defaults: {
      password: req.body.password
    }
  }).spread((userModel, created) => {
    if(created) {
      console.log('new user created');
      let token = TokenService.getToken();
      res.status(200).send(token);
    } else {
      res.status(200).send(`user ${req.body.username} already exisits`);
    }
  }).catch((err) => {
    console.log(err);
  })
});

module.exports = router;