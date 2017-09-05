/**
 *
 * @authors Administrator (you@example.org)
 * @date    2016/12/22 0:20
 * @version $通用的服务，如工具，接口服务
 */
import angular from 'angular';
import {isMobile} from 'utils';

export default function UtilService($cookies, api) {
  // 发送验证码
  function sendSms(data, cb1, cb2, cb3) {
    api.postRequest({
      url: 'sms_validate_code',
      data: data,
      successCallback: function (result) {
        angular.isFunction(cb1) && cb1(result);
      },
      failCallback: function (response) {
        angular.isFunction(cb2) && cb2(response);
      },
      disconnectCallback: function () {
        angular.isFunction(cb3) && cb3();
      }
    });
  }

  function notLoggedIn() {
    return angular.isUndefined($cookies.get('access_token')) || $cookies.get('access_token') === '';
  }

  function mobileValidator(val) {
    return isMobile(val);
  }

  return {
    sendSms,
    notLoggedIn,
    mobileValidator
  }
}

UtilService.$inject = ['$cookies', 'api'];
