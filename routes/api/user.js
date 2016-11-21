const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token.js');

router.get('/user', (req, res) => {
  // validate access token
  let token = req.body.token;
  if (!token) {
    res.send({
      error: "not logged in"
    });
  }

  token = TokenService.verifyToken(token);
  if(!token) {
    res.send({
      error: "not logged in"
    });
  }

  models.user.findById(token.id)
  .then(user => {
    res.send(user);
  })
});

module.exports = router;