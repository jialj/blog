//博客列表页
const Article = () => import('../views/article/index.vue')
const Main = () => import('../views/main/index.vue')
const Read = () => import('../views/read/index.vue')
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