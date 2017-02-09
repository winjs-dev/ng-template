/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:53
 * @version $ IIFE
 */

/* name module */

LoginService.$inject = ['api'];

function LoginService(api) {

    var vm = this;

    vm.login = login; 
    
    function login(data, cb1, cb2, cb3) {
        api.postRequest({
            url: 'user_login',
            data: data,
            successCallback: function (result) {
                angular.isFunction(cb1) && cb1(result);
            },
            failCallback: function(response) {
                angular.isFunction(cb2) && cb2(response);
            },
            disconnectCallback: function() {
                angular.isFunction(cb3) && cb3();
            }

        });
    }
}

module.exports = LoginService;