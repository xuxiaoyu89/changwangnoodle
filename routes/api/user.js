const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../models');
const cookieUtil = require('../../lib/util/cookie.js');
const fileUtil = require('../../lib/util/file.js');
const TokenService = require('../../lib/token.js');

/*
 * return value: 
 * status: error, valid, refresh, expired
*/

router.get('/user', (req, res) => {
  let cookie = req.get('Cookie');
  let accessToken = cookieUtil.getKey('access-token', cookie);
  let refreshToken = cookieUtil.getKey('refresh-token', cookie);
  let result = null;
  async.waterfall([
    // validate the request: token
    (cb) => {
      TokenService.validateToken(accessToken, refreshToken, (err, data) => {
        if (err) return cb(err);
        result = data;
        cb();
      });
    },
    (cb) => {
      if (result.status === 'REFRESH') {
        TokenService.getAccessToken(result.id, (err, data) => {
          if (err) return cb(err);
          accessToken = data;
          // set res header to set new cookies
          res.cookie('access-token', accessToken, {encode: String});
          res.cookie('refresh-token', refreshToken, {encode: String});
          cb();
        })
      } else {
        cb();
      }
    },
    (cb) => {
      models.user.findById(result.id)
      .then(
      (user) => {
        cb(null, user);
      }, 
      (err) => {
        cb(new Error(`cannot get id ${id} from database`));
      });
      // to do, fail to find id
    }
  ], (err, user) => {
    if (err) res.send({error: err.message});
    else {
      res.send({user: user});
    }
  });
});


router.put('user/updateAvatar', (req, res) => {
  let fileName = req.query['file-name'];
  let fileType = req.query['file-type'];
  fileUtil.getS3SignedUrl(fileName, fileType, (err, data) => {
    if (err) return res.status(500).send('cannot get signed url');
    return res.send(data);
  })

});


module.exports = router;