const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/users', (req, res) => {
  models.user.findAll()
  .then(users => {
    res.send({users: users.map((user) => {return user.id})});
  })
});

module.exports = router;