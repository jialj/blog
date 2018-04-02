function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('../base.js');
const utils = require('../../utils/default.js');

module.exports = class extends Base {
  /**
   * 查询文章列表
   */
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let list = yield think.model('article/article').queryArticle(_this.get());
      let ret = list.map(function (article) {
        let art = article.create_time.split(' ');
        article.create_date = art[0];
        article.time = art[1];
        article.content = unescape(article.content);
        return article;
      });
      _this.body = {
        data: ret,
        status: 0
      };
      return ret;
    })();
  }
};
//# sourceMappingURL=article.js.map