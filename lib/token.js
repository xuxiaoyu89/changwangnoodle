const async = require('async');
const RSAService = require('./util/rsa.js');
const cookieUtil = require('./util/cookie.js');
const async = require('async');

const EXPIRETIME = 10*1000; //set 1 hour expire time

function __validateAccessToken (token, callback) {
  let id = token.userId;
  let expires = token.expires;
  let issued = token.issued;
  let type = token.type;
  if (!id || !expires || !issued || !type) {
    return callback(new Error('access token not valid'));
  }
  if ((new Date()).getTime() > issued + expires) {
    token.expired = true;
  }
  else token.expired = false;
  callback();
}

function __validateRefreshToken (token, callback) {
  let id = token.userId;
  let expires = token.expires;
  let type = token.type;
  if (!id || !expires || !type) {
    return callback(new Error('refresh token not valid'));
  }
  callback();
}

const TokenService = {
  getAccessToken: (id, callback) => {
    let token = {
      userId: id,
      expires: EXPIRETIME,
      issued: (new Date()).getTime(),
      type: 'access-token'
    };
    return RSAService.sign(token, callback);
  },

  getRefreshToken: (id, callback) => {
    let token = {
      userId: id,
      expires: EXPIRETIME,
      type: 'refresh-token'
    }
    return RSAService.sign(token, callback);
  },

  validateToken: (accessToken, refreshToken, callback) => {
    let at, rt;
    let atValid;
    async.waterfall([
      (cb) => {
        RSAService.decrypt(accessToken, (err, result) =>{
          if (err) return cb(new Error("access token not valid"));
          else {
            at = JSON.parse(result.token);
            cb();
          }
        });
      },
      (cb) => {
        RSAService.decrypt(refreshToken, (err, result) => {
          if (err) return cb(new Error("refresh token not valid"));
          rt = JSON.parse(result.token);
          cb();
        });
      },
      (cb) => {
        __validateAccessToken(at, cb);
      },
      (cb) => {
        __validateRefreshToken(rt, cb);
      }
    ], (err, result) => {
      result = {};
      if (err) callback(err);
      else {
        result.id = at.userId;
        if (!at.expired) {
          result.status = 'VALID';
        } else if((new Date()).getTime() <= at.issued + at.expires + rt.expires) {
          result.status = 'REFRESH';
        } else {
          return callback(new Error('token expired'));
        }
        callback(null, result);
      }
    })
  },

  validateRequest: (req, res, callback) => {
    let cookie = req.get('Cookie');
    let accessToken = cookieUtil.getKey('access-token', cookie);
    let refreshToken = cookieUtil.getKey('refresh-token', cookie);
    let tokenInfo = null;
    async.waterfall([
      cb => {
        TokenService.validateToken(accessToken, refreshToken, (err, info) => {
          if (err) return cb(err);
          tokenInfo = info;
          cb()
        });
      },
      cb => {
        if (tokenInfo.status === 'REFRESH') {
          TokenService.getAccessToken(tokenInfo.id, (err, data) => {
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
    ], (err, result) => {

    })





  }

};

module.exports = TokenService;



