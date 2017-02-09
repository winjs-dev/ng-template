/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 22:19
 * @version $ IIFE
 */

/* name module */
var func = require('../utils/index');

Api.$inject = ['$cookies', '$http'];

function Api($cookies, $http) {

    var params = {
        successCallback: function (result) {
            console.log('success' + JSON.stringify(result))
        },

        failCallback: function (response) {
            console.log('error' + response)
        },

        disconnectCallback: function (response) {
            console.log("访问失败")
        }
    }


    /**
     * 扩展不同url前缀
     * 如根域名是'muziso.com'， 有不同扩展，client, common等
     * @param type
     * @returns {*}
     */
    function appendUrlPrefix(type) {
        if (type == 1) {
            return g_config.home + g_config.open_api;
        }
    }

    function sendRequest(options) {
        // 默认get请求
        options.method = (options.method === null || options.method === '' || typeof(options.method) === 'undefined') ? 'get' : options.method;
        options.data = (options.data === null || options.data === '' || typeof(options.data) === 'undefined') ? {'date': new Date().getTime()} : options.data;

        // data扩展
        options.data = angular.extend(options.data, {
            user_token: $cookies.get('user_token')
        });

        options = func.extend(params, options);

        $http({
            url: options.url,
            method: options.method,
            data: options.data,
            headers: options.headers,
            timeout: 10000,
        }).then(function (response) {
            var result = response.data.data[0],
                isSuccess = result.error_no == '0' || angular.isUndefined(result.error_no) ? true : false;

            if (isSuccess) {
                options.successCallback(result);
            } else {
                options.failCallback(result);
            }
        }, function (response) {
            //404等错，一般不考虑，直接在拦截器里面统一做拦截处理
            options.disconnectCallback(response);
        });
    }

    return {
        postRequest: function (options) {
            options.url = appendUrlPrefix(1) + options.url;
            options.method = 'post';
            sendRequest(options);
        },
        getRequest: function (options) {
            options.url = appendUrlPrefix(1) + options.url;
            sendRequest(options);
        }
    };
}


module.exports = Api;