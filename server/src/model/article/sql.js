/**
 * 查询列表sql
 * @param {*} params 
 */
let queryList = (params) => {
  return `SELECT a.id id, a.type_id type_id,c.id collect_id, b.type_name type_name, a.title title, a.content content, a.create_time create_time, a.art_from art_from, a.author author,d.photo photo 
  FROM article a
  JOIN article_collect c
  ON a.collect_id = c.id
  LEFT JOIN article_type b 
  ON a.type_id = b.id 
  LEFT JOIN blog_user d 
  ON a.user_id = d.id
  WHERE 1=1 `+
  (params.collect_id ? `AND a.collect_id = ${params.collect_id}` : "") +
  (params.id ? `AND a.id = ${params.id}` : "") +
  ` ORDER BY a.${params.orderBy} ${params.order}
  LIMIT ${params.limit}, ${params.offset};`
}

let addArticle = (obj) => {
  return `INSERT INTO article (collect_id, type_id, title, content, create_time, art_from, author) VALUES (${obj.collect_id || '' },${obj.type_id || 0 }, '${obj.title || '' }', '${escape(obj.content) || '' }', '${obj.create_time || '' }', '${obj.from || '' }', '${obj.author || '' }')`
}

let deleteArticle = (obj) => {
  return `DELETE FROM article WHERE ID = ${obj.id}`
}

let updateArticle = (obj) => {
  let setStr =  (obj.type_id ? `type_id = ${obj.type_id},` : '' )+
                (obj.title ? `title = '${obj.title}',` : '') +
                (obj.content ? `content = '${escape(obj.content)}',` : '') +
                (obj.create_time ? `create_time = '${obj.create_time}',` : '') +
                (obj.from ? `from = '${obj.from}',` : '') +
                (obj.author ? `author = '${obj.author}',` : '')
  if (setStr.length>1) {
    setStr= setStr.substring(0,setStr.length-1)
  }
  return `UPDATE article SET ${setStr} WHERE id=${obj.id};`
}

module.exports = {
  queryList: queryList,
  addArticle: addArticle,
  deleteArticle: deleteArticle,
  updateArticle: updateArticle,
}