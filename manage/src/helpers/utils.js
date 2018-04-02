/**
 * @func 遍历数组或对象或类数组 
 */
export const isArrayLike = (obj) => {
  if(typeof obj === 'function' && obj === window)return false; 
  if(Array.isArray(obj))return true;
  const length = ('length' in obj) && obj.length;
  return typeof length === 'number' && (length === 0 || (length > 0 && (length - 1) in obj));
};
export const hasOwn = (obj,key) => {
    return Object.prototype.hasOwnProperty.call(obj,key);
  };
export const map = (obj,callback) => {
  if(isArrayLike(obj)){
      for(let i = 0, j = obj.length; i < j; i++){
          callback.call(obj,obj[i],i);
      }
  }else if(typeof obj === 'object' && obj){
      for(let i in obj){
          if(hasOwn(obj,i)){
              callback.call(obj,obj[i],i);
          }
      }
  }
};
export const buildQuery = (obj,addPrefix = false) => {
  const query = [];
  map(obj,(value,key) => {
      if(Array.isArray(value)){
          value.map((item,index) => {
              query.push(key + '[' + index + ']=' + encodeURIComponent(item));
          });
      }else{
          query.push(key + '=' + encodeURIComponent(value));
      }
  });
  return (addPrefix && query.length ? '?' : '') + query.join('&');
};
export const extend = (function() {
    var isObjFunc = function(name) {
        var toString = Object.prototype.toString
        return function() {
            return toString.call(arguments[0]) === '[object ' + name + ']'
        } 
    }
    var isObject = isObjFunc('Object'),
        isArray = isObjFunc('Array'),
        isBoolean = isObjFunc('Boolean')
    return function extend() {
        var index = 0,isDeep = false,obj,copy,destination,source,i
        if(isBoolean(arguments[0])) {
            index = 1
            isDeep = arguments[0]
        }
        for(i = arguments.length - 1;i>index;i--) {
            destination = arguments[i - 1]
            source = arguments[i]
            if(isObject(source) || isArray(source)) {
                for(var property in source) {
                    obj = source[property]
                    if(isDeep && ( isObject(obj) || isArray(obj) ) ) {
                        copy = isObject(obj) ? {} : []
                        var extended = extend(isDeep,copy,obj)
                        destination[property] = extended 
                    }else {
                        destination[property] = source[property]
                    }
                }
            } else {
                destination = source
            }
        }
        return destination
    }
  })()