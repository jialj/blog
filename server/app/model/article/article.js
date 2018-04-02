const sql = require('./sql.js');
module.exports = class extends think.Model {
  queryArticle(data) {
    const query = Object.assign({
      orderBy: 'create_time',
      limit: 0,
      offset: 10,
      order: 'desc'
    }, data);
    return this.query(sql.queryList(query));
  }
  addArticle(obj) {
    return this.execute(sql.addArticle(obj));
  }
  deleteArticle(obj) {
    return this.execute(sql.deleteArticle(obj));
  }
  updateArticle(obj) {
    return this.execute(sql.updateArticle(obj));
  }
};
//# sourceMappingURL=article.js.map