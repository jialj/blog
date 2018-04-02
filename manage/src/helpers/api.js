import axios from 'axios'
import {buildQuery} from './utils';
export const isOk = (res) => {
  const status = res && typeof res === 'object' && res.hasOwnProperty('status');
  if(status){
    if(res.status ){
      return true;
    }
  }
  return true;
};
const fetch = (...args) => {
    const config = args[args.length - 1];
    if(typeof config === 'object' && config.method && config.method.toUpperCase() === 'POST'){
      config.headers = config.headers || {};
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded';
      config.data = buildQuery(config.data || {});
    }
    let last = args.length > 0 ? [args[0],config] : [config];
    return axios(...last).then((res) => {
        if(res && res.status == 200){
          return Promise.resolve(res.data);
        }else{
          return Promise.reject(new Error('request fail'));
        }
    });
};
export default fetch;
