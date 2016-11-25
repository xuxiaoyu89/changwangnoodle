const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token');

router.post('/login', (req, res) => {
  models.user.findOne({
    where: {
      "username": req.body.username
    }
  })
  .then(user => {
    data = user.dataValues;
    if (data.password == req.body.password) {
      let token = TokenService.getAccessToken(data.id);
      res.status(200).send({
        status: 'success',
        accessToken: token,
      });
    } else {
      res.status(200).send({
        status: "fail"
      });
    }
  })
});

module.exports = router;