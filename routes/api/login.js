const express = require('express');
const router = express.Router();
const models = require('../../models');

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
      res.status(200).send("logged in successfully");
    } else {
      res.status(200).send("failed");
    }
  })
});

module.exports = router;