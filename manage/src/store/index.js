import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

//load all modules
import article from './modules/article.js'
import collect from './modules/collect.js'
import login from './modules/login.js'

//use Vuex
Vue.use(Vuex)

//export
const isInDev = process.env.NODE_ENV !== 'production'
const plugins = isInDev ? [createLogger()] : []
export default new Vuex.Store({
  modules: {
    article,
    collect,
    login,
  },
  strict: isInDev,
  plugins
})