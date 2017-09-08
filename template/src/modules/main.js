/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/08/17 10:00
 * @version $ IIFE
 */

/* name module */

import '@less/app.less';

import angular from 'angular';
import 'angular-ui-validate';
import 'angular-ui-bootstrap';
import lang from './lang/zh-cn';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';

// 配置
import routing from './config/app.config';
import httping from './config/http.config';

// service
import httpInterceptor from './services/httpInterceptor';
import api from './services/api';
import modalService from './services/modalService';
import utilService from './services/utilService';
import authService from './run/authService';
import loader from './run/loader';

// 过滤器
import filterDate from './filters/filterDate';

// 指令
import greeting from './directives/greeting';

// 业务模块
import './business';

// 国际化
window.i18n = lang;
window.CT = require('./config');
/**
 * angular.module(name, [requires], [configFn]);
 * name：字符串类型，代表模块的名称；
 * requires：字符串的数组，代表该模块依赖的其他模块列表，如果不依赖其他用空数组，
 * configFn：用来对该模块进行一些配置对模块中的组件进行实例化对象实例之前的特定配置
 */
const mainModule = angular.module('app', [uiRouter, ngCookies, ngMessages, 'ui.bootstrap', 'ui.validate', 'business']);

// config
mainModule.config(routing);
mainModule.config(httping);
// generate an error when a rejected promise is not handled  https://docs.angularjs.org/api/ng/provider/$qProvider
mainModule.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

mainModule.service('httpInterceptor', httpInterceptor);
mainModule.service('api', api);
mainModule.service('modalService', modalService);
mainModule.service('utilService', utilService);

// directive
mainModule.directive('greeting', greeting);

// filter
mainModule.filter('filterDate', filterDate);

// run
mainModule.run(authService);
mainModule.run(loader);

// 手动初始化
angular.bootstrap(document, ['app']);
