import Vue from 'vue';
import fetch,{isOk} from '../../helpers/api.js';
import {LOGIN,LOGIN_INDEX} from '../types';
const state = {
  isFetching: false,
  user: {}
};
const mutations = {
  
};
const actions = {
  async [LOGIN_INDEX]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/login/index',{ params }).then((result) => {
        if(isOk(result)){
          return result
        }
      })
      return data
    }
  },
  async [LOGIN]({commit,state,dispatch},params){
    if(state.isFetching){
    }else{
      const data = await fetch('/login/login',{ data:params,method:'POST' }).then((result) => {
        if(isOk(result)){
          return result
        }
      })
      return data
    }
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};