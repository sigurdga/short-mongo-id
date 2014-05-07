var utils = require('./utils');
var ObjectId = require('bson').ObjectId;

function ObjectIdToShortId(id) {
    if (id) {
        id = new ObjectId(String(id));

    } else {
        id = new ObjectId();
    }
    var _hex = id.toHexString();

    // skipping the first and least variating char, to get the later integer
    // within range. the last six is the internal counter.
    var _str = _hex.slice(1,8) + _hex.slice(-6);

    // base64 is pretty fast working on numbers, as long as the numbers are not
    // larger than max number size (+/- 9007199254740992).
    var _int = parseInt(_str, 16);
    var _base64 = utils.toBase(_int, 64);

    // reverse to get most variating characters first
    return utils.reverse(_base64);
}

module.exports = ObjectIdToShortId;
