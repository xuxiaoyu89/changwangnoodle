const RSA = require('node-rsa');

const privateKey = new RSA({b: 512});

module.exports = {
  sign: (msg) => {
    return privateKey.encrypt(msg, 'base64');
  },

  decrypt: (msg) => {
    return privateKey.decrypt(msg, 'utf8');
  }
}
