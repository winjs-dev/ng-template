/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:37
 * @version $ IIFE
 */

/* name module */
import angular from 'angular';
import modalOptions from '@js/modal_options';

// 这里说明一下为什么使用$injector.get的方式去获取$uibModal，而不选直接注入的方式，是因为在该JS启动加载之前ui.bootstrap应该还没加载，所以会报依赖找不到
// 需要我们使用$injector的方式去动态加载
export default function httpInterceptor($rootScope, $q, $cookies, $injector, modalService) {
  return {
    /**
     * 接收一个参数，它是 $http 中的标准 config 对象，同时也需要返回一个标准 config ，
     * 此时可以添加各类身份验证信息，同时也可在此启动进度条
     * @param config
     * @returns {*}
     */
    request: function (config) {
      return config;
    },

    /**
     * 当有多个 Interceptor 的时候， requestError 会在前一个 Interceptor
     * 抛出错误或者执行 $q.reject() 时执行，接收的参数就对应的错误
     * @param err
     * @returns {Promise}
     */
    requestError: function (err) {
      return $q.reject(err);
    },

    /**
     * 接受一个请求对象参数，可以不处理就直接返回，此时也可以将进度条显示为成功完成，当然，
     * 如果后端 API 返回自定义错误时，HTTP 的状态码仍然是 200 得话，
     * 便在这里处理自定义错误，也可以对返回数据做一些处理，注意要将进度条置为完成
     * @param res
     * @returns {*}
     */
    response: function (res) {
      var data = res && res.data;

      if (angular.isObject(data) && angular.isArray(data.data)) {
        // 判断错误码，如果是登录超时
        if (data['error_no'] === '2000') {
          // 清空用户本地token存储的信息，如果
          $cookies.remove('access_token');
          $rootScope = $injector.get('$rootScope');
          // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
          $rootScope.$emit('userIntercepted', 'sessionOut', data);
          console.log('httpInterceptor  userIntercepted');
        }
      }
      return res;
    },

    responseError: function (err) {
      var _modalOptions = angular.copy(modalOptions);
      var uibModalStack = $injector.get('$uibModalStack');
      console.log('responseError：' + JSON.stringify(err));

      // 弹窗延迟显示3秒后自动关闭
      // _modalOptions.modalTime = 1500;
      switch (err.status) {
        case -1:
          _modalOptions.modalInfo = '远程服务响应失败,请稍后重试';
          break;
        case 500: {
          _modalOptions.modalInfo = '500：访问服务失败';
          break;
        }
        case 404: {
          if (err.config.method === 'JSONP') {
            return $q.reject(err);
          }
          _modalOptions.modalInfo = '404：资源不存在';
          break;
        }
        case 501: {
          _modalOptions.modalInfo = '501：未实现';
          break;
        }
        case 502: {
          _modalOptions.modalInfo = '502：无效网关';
          break;
        }
        case 400: {
          // _modalOptions.modalInfo = '请求的市场或者应用不可查询';
          return $q.reject(err);
        }
        case 401: {
          _modalOptions.modalInfo = '访问令牌无效或已过期';
          break;
        }
      }

      modalService.openModal(_modalOptions);
      uibModalStack.dismissAll();

      return $q.reject(err);
    }
  }
}

httpInterceptor.$inject = ['$rootScope', '$q', '$cookies', '$injector', 'modalService'];
