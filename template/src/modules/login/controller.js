/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 22:23
 * @version $ IIFE
 */

/* name module */

var func = require('../utils'),
    md5 = require('blueimp-md5');

//请确保在module层面该服务被正确的注入
LoginController.$inject = ['$state', '$cookies', 'loginService'];

function LoginController($state, $cookies, loginService) {
    var vm = this;

    vm.loginError = {
        error_flag: false,
        error_info: "",
        error_no: "",
        forbid: false
    };

    vm.loginName = '登   录';
    vm.login_account = false;
    vm.stateGo = 'home';
    vm.login_account = '';
    vm.password = '';
    vm.accountValidInfo = i18n.login.err_phone;
    vm.passwordValidInfo = i18n.code.err_password;

    vm.submit = submit;
    vm.accountValidator = accountValidator;

    function submit(form) {
        vm.loginName = "登录中...";
        vm.loginDisabled = true;

        if (!form.$valid) {
            form.login_account.$touched = true;
            form.password.$touched = true;
            return;
        }

        loginService.login({
            login_account: vm.login_account,
            password: md5(vm.password),
            user_type: 101,
            login_way: 3,
            test_answer: 111,
            op_entrust_way: 4
        }, function (result) {
            failDone();
            $cookies.put('user_token', result.user_token);
            $state.go(vm.stateGo);
        }, function(response) {
            failDone();
            vm.password = "";
            vm.loginError.error_flag = true;
            vm.loginError.error_info = response.error_info;
            vm.loginError.error_no = response.error_no;
        }, function() {
            failDone();
        });
    };

    function accountValidator(val) {
         return func.isMobile(val);
    }

    vm.passwordValidator = function(val) {
        if (!val) {
            return;
        }

        if (val.length < 6) {
            vm.passwordValidInfo = "密码长度至少6位";
            return false;
        }

        return true;
    }

    function failDone() {
        vm.loginName = '登录';
        vm.loginDisabled = false;
    }
}

module.exports = LoginController;

