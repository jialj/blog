/**
 * 查询列表sql
 * @param {*} params 
 */
let queryUser = (params) => {
  return `SELECT * FROM blog_user WHERE user_name='${params.user_name}';`
}

module.exports = {
  queryUser: queryUser
}