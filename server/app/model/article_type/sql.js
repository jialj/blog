/**
 * 查询列表sql
 * @param {*} params 
 */
let queryArticleType = params => {
  return `SELECT * FROM article_type;`;
};

let addArticleType = obj => {
  return `INSERT INTO article_type (type_name, type_description) VALUES ('${obj.type_name}', '${obj.type_description}')`;
};

let deleteArticleType = obj => {
  return `DELETE FROM article_type WHERE ID = ${obj.id}`;
};

module.exports = {
  queryArticleType: queryArticleType,
  addArticleType: addArticleType,
  deleteArticleType: deleteArticleType
};