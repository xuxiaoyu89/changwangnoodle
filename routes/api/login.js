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
      let token = TokenService.getToken();
      res.status(200).send(token);
    } else {
      res.status(200).send("failed");
    }
  })
});

module.exports = router;