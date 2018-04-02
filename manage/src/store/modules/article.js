import Vue from 'vue';
import fetch,{isOk} from '../../helpers/api.js';
import {ARTICLE_LIST,ARTICLE_FETCH,CURRENT_ARTICLE,ADD_ARTICLE,UPDATE_ARTICLE,UPDATE_ARTICLE_LIST,DELETE_ARTICLE,OPEN_ARTICLE_LIST,OPEN_CUR_ARTICLE} from '../types';
const state = {
  isFetching: false,
  article_list: [],
  open_article_list: [],
  open_cur_article:{},
  current_article: {}
};
const mutations = {
  [ARTICLE_FETCH](state,data){
    state.isFetching = true
  },
  [ARTICLE_LIST](state,data){
    state.isFetching = false
    state.article_list = data
    if(state.article_list.length === 0){
      state.current_article = {}
    }else{
      state.current_article = state.article_list[0]
    }
  },
  [OPEN_ARTICLE_LIST](state,data){
    state.open_article_list = data
  },
  [OPEN_CUR_ARTICLE](state,data){
    state.open_cur_article = data
  },
  [UPDATE_ARTICLE_LIST](state,data){
    for( let i=0,j=state.article_list.length; i<j; i++){
      if(state.article_list[i].id === data.id){
        state.article_list[i] = data
        break
      }
    }
  },
  [CURRENT_ARTICLE](state,data){
    state.current_article = data
  },
  [ADD_ARTICLE](state,data){
    state.current_article = data
    state.article_list.unshift(state.current_article)
  },
  [DELETE_ARTICLE](state,data){
    let cl = state.article_list
    for( let i=0,j=cl.length; i<j; i++){
      if(cl[i].id === data.id){
        cl.splice(i, 1);
        if(cl.length >0){
          if(i+1 === j){
            state.current_article= cl[i-1]
          }else{
            state.current_article = cl[i]
          }
        }else{
          state.current_article = {}
        }
        break
      }
    }
  }
};
const actions = {
  [CURRENT_ARTICLE]({commit,state,dispatch},params){
    commit(CURRENT_ARTICLE,params);
  },
  async [ADD_ARTICLE]({commit,state,dispatch},params){
    commit(ADD_ARTICLE,params);
    if(state.isFetching){
    }else{
      const data = await fetch('/article/add',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(ARTICLE_LIST,result.data);
          return result.data
        }
      });
      return Promise.resolve(data);
    }
  },
  async [ARTICLE_LIST]({commit,state,dispatch},params){
    commit(ARTICLE_FETCH);
    params = Object.assign({},params)
    const data = await fetch('/article/index',{ params }).then((result) => {
      if(isOk(result)){
        commit(ARTICLE_LIST,result.data);
        return result.data
      }
    });
    return Promise.resolve(data);
  },
  async [OPEN_ARTICLE_LIST]({commit,state,dispatch},params){
    commit(ARTICLE_FETCH);
    params = Object.assign({},params)
    const data = await fetch('/open/article/index',{ params }).then((result) => {
      if(isOk(result)){
        commit(OPEN_ARTICLE_LIST,result.data);
        return result.data
      }
    });
    return Promise.resolve(data);
  },
  async [OPEN_CUR_ARTICLE]({commit,state,dispatch},params){
    let data;
    for(let oneart of state.open_article_list){
      if(+oneart.id === +params.id){
        commit(OPEN_CUR_ARTICLE,oneart)
        data = oneart
        break
      }
    }
    if(data === undefined){
      data = await fetch('/open/article/index',{ params }).then((result) => {
        if(isOk(result)){
          commit(OPEN_CUR_ARTICLE,result.data[0]);
          return result.data[0]
        }
      });
    }
    return Promise.resolve(data);
  },
  async [DELETE_ARTICLE]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article/delete',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(DELETE_ARTICLE, params);
          return result
        }
      });
      return Promise.resolve(data);
    }
  },
  async [UPDATE_ARTICLE]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article/update',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(CURRENT_ARTICLE,params);
          commit(UPDATE_ARTICLE_LIST,params);
        }
        return result
      });
      return Promise.resolve(data);
    }
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};