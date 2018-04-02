const sql = require('./sql.js')
module.exports = class extends think.Model {
  queryArticleType(data) {
    return this.query(sql.queryArticleType(query))
  }
  addArticleType(obj) {
    return this.execute(sql.addArticleType(obj))
  }
  deleteArticleType(obj) {
    return this.execute(sql.deleteArticleType(obj))
  }
};