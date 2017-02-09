/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 22:11
 * @version $ IIFE
 */

/* name module */

Route.$inject = ['$stateProvider'];

function Route($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: require('../../views/login.html'),
            controller: 'loginController',
            controllerAs: 'vm'  //使用vm而不是使用$scope去操作视图
        });
}

module.exports = Route;
