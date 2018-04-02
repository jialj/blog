const sql = require('./sql.js')
module.exports = class extends think.Model {
  queryUser(data) {
    return this.query(sql.queryUser(data))
  }
};