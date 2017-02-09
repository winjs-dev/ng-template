/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */
require('./style.less');

//引入模块的路由配置
var Routing = require('./route');

// 引入service、controller、directive等文件
var HomeController = require('./controller');
var HomeService = require('./service');

//setter定义模块
module.exports = angular.module('app.home', [])
    .config(Routing)
    .service('homeService', HomeService)
    .controller('homeController', HomeController)//setter controller
    .name;
