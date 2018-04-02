const Base = require('./base.js');
const utils = require('../utils/default.js');

module.exports = class extends Base {
  /**
   * 查询文章列表
   */
  async indexAction() {
    const list = await think.model('article/article').queryArticle(this.get())
    for(let i=0,j=list.length; i<j; i++){
      list[i].content = unescape(list[i].content)
    }
    this.body = {
      data: list,
      status: 0
    }
    return list;
  }
  /**
   * 新增文章
   */
  async addAction() {
    const obj = this.post()
    const date = utils.getStandardDate(new Date())
    obj.create_time = date
    const res = await think.model('article/article').addArticle(obj)
    if(res == 1){
      let query = {
        collect_id: obj.collect_id
      }
      const list = await think.model('article/article').queryArticle(query)
      this.body = {
        data: list,
        status: 0
      }
      return list;
    }else{
      this.body = {
        msg: '新增失败',
        data: [],
        status: 1
      }
      return
    }
  }
  /**
   * 删除文章
   */
  async deleteAction() {
    const obj = this.post()
    const res = await think.model('article/article').deleteArticle(obj)
    this.body = {
      data: res,
      status: 0
    }
  }
  /**
   * 修改文章
   */
  async updateAction() {
    const obj = this.post()
    const res = await think.model('article/article').updateArticle(obj)
    this.body = {
      data: res,
      status: 0
    }
  }
  
};
