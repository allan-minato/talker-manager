const crypto = require('crypto');

function tokenGenerator() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = tokenGenerator;