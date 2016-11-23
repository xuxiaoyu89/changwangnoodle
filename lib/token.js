const RSAService = require('./util/rsa.js');

const expires = 1*3600*1000; //set 1 hour expire time

const TokenService = {
  getAccessToken: (id) => {
    console.log('id: ', id);
    let token = {
      userId: id,
      expires: expires,
      issued: (new Date()).getTime(),
      type: 'access-token'
    };
    return RSAService.sign(token);
  },
  parseToken: (token) => {
    token = JSON.parse(RSAService.decrypt(token));

    if (!token) {
      return {"error": "not valid token"};
    }

    let id = token.userId;
    let expires = token.expires;
    let issued = token.issued;
    let type = token.type;

    if (!id || !expires || !issued || !type) {
      return {"error": "missing fields"};
    }

    if ( (new Date()).getTime() > issued + expires) {
      return {"error": "token expired"};
    }

    return {"info": token};

  }
};

module.exports = TokenService;



