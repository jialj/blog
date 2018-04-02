function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const utils = require('../utils/default.js');

module.exports = class extends Base {
  /**
   * 登录查询
   */
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const sUser = yield _this.session('user');
      let ret = {
        msg: '未登录',
        data: { login: false },
        status: 1
      };
      if (sUser) {
        try {
          let user = yield think.model('user/user').queryUser(sUser);
          if (user[0] && user[0].password === sUser.password) {
            ret.status = 0;
            ret.data.login = true;
            ret.msg = '已登录';
          }
        } catch (error) {
          console.log('验证登陆报错error--', error);
          _this.body = ret;
        }
      }
      _this.body = ret;
    })();
  }
  loginAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let ret = {
        msg: '用户名或密码错误',
        data: {
          login: false
        },
        status: 1
      };
      let post = _this2.post();
      if (post.user_name && post.password) {
        let user = yield think.model('user/user').queryUser(post);
        if (user.length === 1) {
          if (user[0].password + '' === post.password + '') {
            yield _this2.session('user', user[0]);
            ret.status = 0;
            ret.data.login = true;
            ret.msg = '登陆成功';
          }
        }
      }
      _this2.body = ret;
      return _this2.body;
    })();
  }
};
//# sourceMappingURL=login.js.map