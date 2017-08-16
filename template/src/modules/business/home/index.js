/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */
import './style.less';

import Route from './route';
import Controller from './controller';
import Service from './service';

export default angular.module('app.home', [])
  .config(Route)
  .controller('controller', Controller)
  .service('service', Service)
  .name;


