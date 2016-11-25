const express = require('express');
const router = express.Router();
const cookieUtil = require('../../lib/util/cookie.js');
const TokenService = require('../../lib/token.js');


// validate an access token
router.get('/token', (req, res) => {
  let cookie = req.get('Cookie');
  let token = cookieUtil.getKey('access-token', cookie);
  let result = TokenService.parseToken(token);
  res.send(result);
});


module.exports = router;
