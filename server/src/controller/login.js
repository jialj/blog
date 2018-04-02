const Base = require('./base.js');
const utils = require('../utils/default.js');

module.exports = class extends Base {
  /**
   * 登录查询
   */
  async indexAction() {
    const sUser = await this.session('user')
    let ret = {
      msg: '未登录',
      data: {login:false},
      status: 1
    }
    if(sUser){
      try {
        let user = await think.model('user/user').queryUser(sUser)
        if(user[0] && user[0].password === sUser.password){
          ret.status = 0
          ret.data.login = true
          ret.msg = '已登录'
        }
      } catch (error) {
        console.log('验证登陆报错error--', error)
        this.body = ret
      }
    }
    this.body = ret
  }
  async loginAction() {
    let ret = {
      msg: '用户名或密码错误',
      data: {
        login:false
      },
      status: 1
    }
    let post = this.post()
    if(post.user_name && post.password){
      let user = await think.model('user/user').queryUser(post)
      if(user.length === 1){
        if(user[0].password+'' === post.password+''){
          await this.session('user', user[0]);
          ret.status = 0
          ret.data.login = true
          ret.msg = '登陆成功'
        }
      }
    }
    this.body = ret
    return this.body
  }
};
