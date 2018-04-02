import Vue from 'vue';
import fetch,{isOk} from '../../helpers/api.js';
import {COLLECT_LIST,ADD_COLLECT,DELETE_COLLECT,UPDATE_COLLECT,CURRENT_COLLECT,UPDATE_COLLECT_LIST} from '../types';
const state = {
  isFetching: false,
  collect_list: {},
  current_collect: {}
};
const mutations = {
  [COLLECT_LIST](state,data){
    state.collect_list = data
    if(state.current_collect.length === 0){
      state.current_collect = {}
    }else{
      state.current_collect = state.collect_list[0]
    }
  },
  [CURRENT_COLLECT](state,data){
    state.current_collect = data
  },
  [UPDATE_COLLECT_LIST](state,data){
    for( let i=0,j=state.collect_list.length; i<j; i++){
      if(state.collect_list[i].id === data.id){
        state.collect_list[i] = data
        break
      }
    }
  },
  [DELETE_COLLECT](state, data){
    let cl = state.collect_list
    for( let i=0,j=cl.length; i<j; i++){
      if(cl[i].id === data.id){
        cl.splice(i, 1);
        if(cl.length >0){
          if(i+1 === j){
            state.current_collect = cl[i-1]
          }else{
            state.current_collect = cl[i]
          }
        }else{
          state.current_collect = {}
        }
        break
      }
    }
  }
};
const actions = {
  [CURRENT_COLLECT]({commit,state,dispatch},params){
    commit(CURRENT_COLLECT,params);
  },
  async [COLLECT_LIST]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article_collect/query',{ params }).then((result) => {
        if(isOk(result)){
          commit(COLLECT_LIST, result.data);
          return result.data
        }
      });
      return Promise.resolve(data);
    }
  },
  async [ADD_COLLECT]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article_collect/add',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(COLLECT_LIST,result.data);
          return result.data
        }
      });
      return Promise.resolve(data);
    }
  },
  async [DELETE_COLLECT]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article_collect/delete',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(DELETE_COLLECT, params);
          return result
        }
      });
      return Promise.resolve(data);
    }
  },
  async [UPDATE_COLLECT]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/article_collect/update',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          commit(CURRENT_COLLECT,params);
          commit(UPDATE_COLLECT_LIST,params);
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