/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:29
 * @version $ IIFE
 */

/* name module */
routing.$inject = ['$urlRouterProvider'];

function routing($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}

module.exports = routing;