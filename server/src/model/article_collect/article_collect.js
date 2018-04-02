const sql = require('./sql.js')
module.exports = class extends think.Model {
  queryArticleCollect(data) {
    return this.query(sql.queryArticleCollect(data))
  }
  addArticleCollect(obj) {
    return this.execute(sql.addArticleCollect(obj))
  }
  deleteArticleCollect(obj) {
    return this.execute(sql.deleteArticleCollect(obj))
  }
  updateArticleCollect(obj) {
    return this.execute(sql.updateArticleCollect(obj))
  }
};