/**
 *
 * @authors Administrator (you@example.org)
 * @date    2016/12/22 0:20
 * @version $通用的服务，如工具，接口服务
 */

UtilService.$inject = ['$cookies', 'api'];

function UtilService($cookies, api) {
    var vm = this;

    vm.sendSms = sendSms;
    vm.notLoggedIn = notLoggedIn;

    //发送验证码
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
        return angular.isUndefined($cookies.get('access_token')) || $cookies.get('access_token') == '';
    }
    
    return vm;
}

module.exports = UtilService;
