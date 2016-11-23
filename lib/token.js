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
    let result = RSAService.decrypt(token);
    let info = null;

    if (result.error) {
      return {"error": "not valid token"};
    }

    console.log()
    info = JSON.parse(result.token);

    let id = info.userId;
    let expires = info.expires;
    let issued = info.issued;
    let type = info.type;

    if (!id || !expires || !issued || !type) {
      return {"error": "missing fields"};
    }

    if ( (new Date()).getTime() > issued + expires) {
      return {"error": "token expired"};
    }

    return {"info": info};

  }
};

module.exports = TokenService;



