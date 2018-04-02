const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 查询文章集合
   */
  async queryAction() {
    const list = await think.model('article_collect/article_collect').queryArticleCollect(this.get())
    this.body = {
      data: list,
      status: 0
    }
    return list;
  }
  /**
   * 新增文集
   */
  async addAction() {
    const obj = this.post()
    const res = await think.model('article_collect/article_collect').addArticleCollect(obj)
    if( res == 1){
      const list = await think.model('article_collect/article_collect').queryArticleCollect()
      this.body = {
        data: list,
        status: 0
      }
      return list;
    }else{
      this.body = {
        data: '新增失败',
        status: 0
      }
      return
    }
  }
  /**
   * 删除文集
   */
  async deleteAction() {
    const obj = this.post()
    const res = await think.model('article_collect/article_collect').deleteArticleCollect(obj)
    this.body = {
      data: res,
      status: 0
    }
  }
  /**
   * 修改文集
   */
  async updateAction() {
    const obj = this.post()
    const res = await think.model('article_collect/article_collect').updateArticleCollect(obj)
    this.body = {
      data: res,
      status: 0
    }
  }
  
};
