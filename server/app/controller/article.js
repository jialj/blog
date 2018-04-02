function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const utils = require('../utils/default.js');

module.exports = class extends Base {
  /**
   * 查询文章列表
   */
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const list = yield think.model('article/article').queryArticle(_this.get());
      for (let i = 0, j = list.length; i < j; i++) {
        list[i].content = unescape(list[i].content);
      }
      _this.body = {
        data: list,
        status: 0
      };
      return list;
    })();
  }
  /**
   * 新增文章
   */
  addAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const obj = _this2.post();
      const date = utils.getStandardDate(new Date());
      obj.create_time = date;
      const res = yield think.model('article/article').addArticle(obj);
      if (res == 1) {
        let query = {
          collect_id: obj.collect_id
        };
        const list = yield think.model('article/article').queryArticle(query);
        for (let i = 0, j = list.length; i < j; i++) {
          list[i].content = unescape(list[i].content);
        }
        _this2.body = {
          data: list,
          status: 0
        };
        return list;
      } else {
        _this2.body = {
          msg: '新增失败',
          data: [],
          status: 1
        };
        return;
      }
    })();
  }
  /**
   * 删除文章
   */
  deleteAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const obj = _this3.post();
      const res = yield think.model('article/article').deleteArticle(obj);
      _this3.body = {
        data: res,
        status: 0
      };
    })();
  }
  /**
   * 修改文章
   */
  updateAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const obj = _this4.post();
      const res = yield think.model('article/article').updateArticle(obj);
      _this4.body = {
        data: res,
        status: 0
      };
    })();
  }

};
//# sourceMappingURL=article.js.map