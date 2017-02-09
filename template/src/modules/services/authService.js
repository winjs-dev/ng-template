/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/21 10:52
 * @version $ 运行块通常用来注册全局的事件监听器。设置路由事件的监听器以及过滤未经授权的请求。
 */

/* name module */

AuthService.$inject = ['$rootScope', '$state', '$stateParams', '$cookies', 'utilService'];

function AuthService($rootScope, $state, $stateParams, $cookies, utilService) {
  var vm = this;
  /**
   * 初始化服务，这样就可以在html页面中直接调用
   * @type {$state|*}
   */
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.i18n = i18n;
  $rootScope.util = utilService;

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    // 当前页面
    var toName = toState.name;
    var fromName = fromState.name;

    console.log('toName:' + toName);
    //
    // // 如果用户不存在或用户未登录
    // if (utilService.notLoggedIn()) {
    //     event.preventDefault();// 取消默认跳转行为
    //     if ($state.current.name == 'login' || $state.current.name == 'resetPwd') {
    //         $state.go('login');
    //     } else {
    //         //跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面
    //         var parms = {
    //             state: $state.current.name,
    //         };
    //         $state.go('login', {
    //             parms: JSON.stringify(parms)
    //         });
    //     }
    // }

    return;
  });
}

module.exports = AuthService;
