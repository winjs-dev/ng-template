/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:24
 * @version $ IIFE
 */

/* name module */
import angular from 'angular';

export default function httping($httpProvider) {
  // 跨域头部配置  'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
  // 这个需要注释掉，否则前台post异步请求访问报错
  // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

  /**
   * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function (obj) {
    var query = '';
    var name;
    var value;
    var fullSubName;
    var subName;
    var subValue;
    var innerObj;
    var i;

    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  /**
   * 将HTTP拦截器注入进来
   */
  $httpProvider.interceptors.push('httpInterceptor');
}

httping.$inject = ['$httpProvider'];

