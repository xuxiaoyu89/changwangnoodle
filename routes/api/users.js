const express = require('express');
const router = express.Router();
const models = require('../../models');

router.get('/users', (req, res) => {

  console.log(req.get('Cookie'));
  /*let token = req.body.token;
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
  }*/

  models.user.findAll()
  .then(users => {
    res.send({users: users.map((user) => {return user.id})});
  })
});

module.exports = router;