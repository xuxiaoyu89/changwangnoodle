const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../models');
const TokenService = require('../../lib/token');

router.post('/login', (req, res) => {
  let user = null;
  let accessToken = null;
  let refreshToken = null;
  async.waterfall([
    (cb) => {
      console.log('in querying database');
      models.user.findOne({where: {
        username: req.body.username
      }})
      .then(
        userModel => {
          user = userModel;
          cb();
        },
        err => {
          cb(err);
        }
      )
    },
    // validate password
    (cb) => {
      //console.log('in validate password');
      //console.log('req.body: ', req.body);
      if(user.password === req.body.password) {
        cb();
      } else {
        //console.log('Incorrect password');
        cb(new Error("Incorrect Password"));
      }
    },
    // create access token and refresh token
    (cb) => {
      TokenService.getAccessToken(user.id, (err, result) => {
        if (err) return cb(err);
        else {
          accessToken = result;
          cb();
        }
      })
    },
    (cb) => {
      TokenService.getRefreshToken(user.id, (err, result) => {
        if (err) return cb(err);
        else {
          refreshToken = result;
          cb();
        }
      })
    }
  ], (err, result) => {
    if (err) return res.send({error: err});
    else {
      //console.log("in login, accessToken: ", accessToken);
      res.cookie('access-token', accessToken, {encode: String});
      res.cookie('refresh-token', refreshToken, {encode: String});
      //console.log('sending back response with token');
      res.status(200).send({status: 'success'});
    }

  });
});

module.exports = router;