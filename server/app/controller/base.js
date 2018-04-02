let verifySession = (() => {
  var _ref = _asyncToGenerator(function* (self) {
    const sUser = yield self.session('user');

    let ret = {
      msg: '未登录',
      data: { login: false },
      status: 1
    };
    if (sUser) {
      try {
        let user = yield think.model('user/user').queryUser(sUser);
        if (user && user[0].password === sUser.password) {
          return true;
        } else {
          return ret;
        }
      } catch (error) {
        console.log('error--', error);
        return ret;
      }
    } else {
      return ret;
    }
  });

  return function verifySession(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class extends think.Controller {
  __before() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.ctx.controller.startsWith('open/') && _this.ctx.controller !== 'login') {
        let data = yield verifySession(_this);
        if (data !== true) {
          _this.body = data;
          return false;
        }
      }
    })();
  }
};
//# sourceMappingURL=base.js.map