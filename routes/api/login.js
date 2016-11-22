const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token');

router.post('/login', (req, res) => {
  console.log(req.body);
  models.user.findOne({
    where: {
      "username": req.body.username
    }
  })
  .then(user => {
    data = user.dataValues;
    if (data.password == req.body.password) {
      let token = TokenService.getAccessToken();
      console.log(token);
      res.status(200).send({
        status: 'success',
        accessToken: token,
        id: data.id
      });
    } else {
      res.status(200).send("failed");
    }
  })
});

module.exports = router;