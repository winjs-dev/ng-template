/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */

Route.$inject = ['$stateProvider'];

function Route($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: require('../../views/home.html'),
            controller: 'controller',
            controllerAs: 'vm'  //使用vm而不是使用$scope去操作视图
        });
}

module.exports = Route;
