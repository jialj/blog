
async function verifySession(self) {
  const sUser = await self.session('user')

  let ret = {
    msg: '未登录',
    data: {login:false},
    status: 1
  }
  if(sUser){
    try {
      let user = await think.model('user/user').queryUser(sUser)
      if(user && user[0].password === sUser.password){
        return true
      }else{
        return ret
      }
    } catch (error) {
     console.log('error--', error)
     return ret
    }
  }else{
    return ret
  }
}
module.exports = class extends think.Controller {
 async __before() {
    if(!this.ctx.controller.startsWith('open/') && this.ctx.controller !== 'login'){
      let data = await verifySession(this)
      if(data !== true){
        this.body = data
        return false
      }
    }
  }
};
