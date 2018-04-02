//博客列表页
import Article from '../views/article/index.vue'
import Main from '../views/main/index.vue'
import Read from '../views/read/index.vue'

/**
* 路由配置
*/
const routers = [{
    path: '',
    component: Main
  },{
    path: '/index/main',
    component: Main
  },{
    path: '/index/article',
    component: Article
  },{
    path: '/index/read/:id',
    component: Read
  }]
export default routers;