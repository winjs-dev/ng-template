/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/6/5 19:34
 * @version $ IIFE
 */

/* name module */

import angular from 'angular';

// 具体业务模块
import './home';

export default angular.module('business', [
  'app.home'
]);
