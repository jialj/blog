function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 查询文章集合
   */
  queryAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const list = yield think.model('article_collect/article_collect').queryArticleCollect(_this.get());
      _this.body = {
        data: list,
        status: 0
      };
      return list;
    })();
  }
  /**
   * 新增文集
   */
  addAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const obj = _this2.post();
      const res = yield think.model('article_collect/article_collect').addArticleCollect(obj);
      if (res == 1) {
        const list = yield think.model('article_collect/article_collect').queryArticleCollect();
        _this2.body = {
          data: list,
          status: 0
        };
        return list;
      } else {
        _this2.body = {
          data: '新增失败',
          status: 0
        };
        return;
      }
    })();
  }
  /**
   * 删除文集
   */
  deleteAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const obj = _this3.post();
      const res = yield think.model('article_collect/article_collect').deleteArticleCollect(obj);
      _this3.body = {
        data: res,
        status: 0
      };
    })();
  }
  /**
   * 修改文集
   */
  updateAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const obj = _this4.post();
      const res = yield think.model('article_collect/article_collect').updateArticleCollect(obj);
      _this4.body = {
        data: res,
        status: 0
      };
    })();
  }

};
//# sourceMappingURL=article_collect.js.map