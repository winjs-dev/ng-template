/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/6/2 23:29
 * @version $ IIFE
 */

/* name module */

export default function routing($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}

routing.$inject = ['$urlRouterProvider'];
