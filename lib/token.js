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
  verifyToken: (token) => {
    token = JSON.parse(RSAService.decrypt(token));

    if (!token) {
      console.log('not valid token');
      return false;
    }

    let id = token.userId;
    let expires = token.expires;
    let issued = token.issued;
    let type = token.type;

    if (!id || !expires || !issued || !type) {
      console.log('missing fields');
      return false;
    }

    if ( (new Date()).getTime() > issued + expires) {
      console.log('token expired');
      return false;
    }

    return true;

  }
};

module.exports = TokenService;

/*let origin = {
  id: null,
  expires: expires,
  issued: (new Date()).getTime(),
  type: 'access-token'
}

let signed = RSAService.sign(origin);

console.log('signed: ', signed);

let dest = RSAService.decrypt(signed);
console.log('decrypted: ', dest);*/


