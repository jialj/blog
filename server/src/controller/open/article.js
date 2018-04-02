const Base = require('../base.js');
const utils = require('../../utils/default.js');

module.exports = class extends Base {
  /**
   * 查询文章列表
   */
  async indexAction() {
    let list = await think.model('article/article').queryArticle(this.get())
    let ret = list.map((article) => {
      let art = article.create_time.split(' ')
      article.create_date = art[0]
      article.time = art[1]
      article.content = unescape(article.content)
      return article
    })
    this.body = {
      data: ret,
      status: 0
    }
    return ret;
  }
};
