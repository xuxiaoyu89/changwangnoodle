module.exports = {
  parse: (cookie) => {
    let pairs = cookie.split(';');
    let map = {};
    for (let i=0; i<pairs.length; i++) {
      let pair = pairs[i];
      let result = pair.split('=');
      if (result[0]) {
        map[result[0]] = result[1];
      }
    }
    return map;
  },

	getKey: (key, cookie) => {
    let results = module.exports.parse(cookie);
    return results[key];
  }
}