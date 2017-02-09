/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 22:11
 * @version $ IIFE
 */

/* name module */
require('./style.less');

//引入模块的路由配置
var Routing = require('./route');

// 引入service、controller、directive等文件
var LoginController = require('./controller');
var LoginService = require('./service');

//setter定义模块
module.exports = angular.module('app.login', [])
    .config(Routing)
    .service('loginService', LoginService)
    .controller('loginController', LoginController)//setter controller
    .name;

