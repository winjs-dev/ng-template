/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:37
 * @version $ IIFE
 */

/* name module */

require('../assets/less/app.less');

var angular = require('angular');
require('angular-ui-validate');
require('angular-ui-bootstrap');
var lang = require('./lang/zh-cn');
var uiRouter = require('angular-ui-router');
var ngCookies = require('angular-cookies');
var ngMessages = require('angular-messages');

// 配置
var routing = require('./config/app.config');
var httping = require('./config/http.config');
var httpInterceptor = require('./services/httpInterceptor');
var api = require('./services/api');
var authService = require('./services/authService');
var utilService = require('./services/utilService');
var modalService = require('./services/modalService');

//过滤器
var formatDate = require('./filters/format-date');

// 指令
var greeting = require('./directives/greeting');

// 具体业务模块
var home = require('./home');
var login = require('./login')

window.i18n = lang; // 国际化

/**
 * angular.module(name, [requires], [configFn]);
 * name：字符串类型，代表模块的名称；
 * requires：字符串的数组，代表该模块依赖的其他模块列表，如果不依赖其他用空数组，
 * configFn：用来对该模块进行一些配置对模块中的组件进行实例化对象实例之前的特定配置
 */
// .module('app', [uiRouter, ngAnimate, ngCookies, ngMessages, ngSanitize, uiBootstrap, uiValidate, home])

angular
  .module('app', [uiRouter, ngCookies, ngMessages, 'ui.bootstrap', 'ui.validate', home, login])
  .config(routing)
  .config(httping)
  // generate an error when a rejected promise is not handled  https://docs.angularjs.org/api/ng/provider/$qProvider
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .factory('modalService', modalService)
  .factory('utilService', utilService)
  .factory('httpInterceptor', httpInterceptor)
  .factory('api', api)
  .directive('greeting', greeting)
  .filter('formatDate', formatDate)
  .run(authService);


// 手动初始化
angular.bootstrap(document, ['app']);
