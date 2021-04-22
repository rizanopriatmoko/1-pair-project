const bcrypt = require('bcryptjs');

class BcryptPassword {
  static hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
  }

  static checkHash(password, hash) {
    let check = bcrypt.compareSync(password, hash)
    return check
  }
}

module.exports = BcryptPassword