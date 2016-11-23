const RSA = require('node-rsa');

const privateKey = new RSA({b: 512});

module.exports = {
  sign: (msg) => {
    return privateKey.encrypt(msg, 'base64');
  },

  decrypt: (msg) => {
  	let result = null;
  	try {
  		result = {"token": privateKey.decrypt(msg, 'utf8')};
  	} catch (err) {
  		result = {"error": err}
  	}
  	return result;
  }
}
