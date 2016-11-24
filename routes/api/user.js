const express = require('express');
const router = express.Router();
const models = require('../../models');
const cookieUtil = require('../../lib/util/cookie.js');
const TokenService = require('../../lib/token.js');

router.get('/user', (req, res) => {
  let cookie = req.get('Cookie');
  let token = cookieUtil.getKey('access-token', cookie);
  if (!token) {
    res.send({
      error: "not logged in"
    });
  } else {
    token = TokenService.parseToken(token);

    if(token.error) {
      res.send({
        error: token.error
      });
    } else {
      let id = token.info.userId;
      models.user.findById(id)
      .then(user => {
        res.send(user);
      })
    }
  }
});

module.exports = router;