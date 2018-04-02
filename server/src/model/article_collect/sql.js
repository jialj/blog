/**
 * 查询列表sql
 * @param {*} params 
 */
let queryArticleCollect = (params) => {
  return `SELECT * FROM article_collect ORDER BY id DESC;`
}

let addArticleCollect = (obj) => {
  return `INSERT INTO article_collect (collect_name, collect_description) VALUES ('${obj.collect_name || ''}', '${obj.collect_description || ''}')`
}

let deleteArticleCollect = (obj) => {
  return `DELETE FROM article_collect WHERE ID = ${obj.id}`
}
let updateArticleCollect = (obj) => {
  let setStr =  (obj.collect_name ? `collect_name = '${obj.collect_name}',` : '' )+
                (obj.collect_description ? `collect_description = '${obj.collect_description}',` : '')
  if (setStr.length>1) {
    setStr= setStr.substring(0,setStr.length-1)
  }
  return `UPDATE article_collect SET ${setStr} WHERE id=${obj.id};`
}

module.exports = {
  queryArticleCollect: queryArticleCollect,
  addArticleCollect: addArticleCollect,
  deleteArticleCollect: deleteArticleCollect,
  updateArticleCollect: updateArticleCollect,
}