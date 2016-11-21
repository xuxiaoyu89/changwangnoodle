const RSAService = require('./util/rsa.js');

const expires = 1*3600*1000; //set 1 hour expire time

const TokenService = {
  getAccessToken: (id) => {
    let token = {
      id: id,
      expires: expires,
      issued: (new Date()).getTime(),
      type: 'access-token'
    };
    return RSAService.sign(token);
  },
  verifyToken: (token) => {
    token = RSAService.decrypt(token);
    if (!token) {
      return false;
    }

    let id = token.id;
    let expires = token.expires;
    let issued = token.issued;
    let type = token.type;
    if (!id || !expires || !issued || !type) {
      return false;
    }

    if ( (new Date()).getTime() > issued + expires) {
      return false;
    }

    return true;

  }
};

module.exports = TokenService;