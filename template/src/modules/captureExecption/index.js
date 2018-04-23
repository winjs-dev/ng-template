/**
 *
 * @authors liwb (you@example.org)
 * @date    2018/1/2 16:24
 * @version $ IIFE
 */

/* name module */
import angular from 'angular';
import Raven from 'raven-js';
import RavenAngular from 'raven-js/plugins/angular';
import './core/globalLog';
import './core/resourcesLog';
import './core/promiseLog';

Raven.config('http://4c6639d38e5b4562b90268c93f72975c@10.139.98.34:9000/20')
  .addPlugin(RavenAngular, angular)
  .install();

export default angular
  .module('exceptionOverride', [])
  .factory('$exceptionHandler', function() {
    return function(exception, cause) {
      exception.message += ' (caused by "' + cause + '")';
      console.error('这里是$exceptionHandler：' + cause);
      Raven.captureMessage(JSON.stringify(exception), {
        level: 'error',
        tags: { custom_commit: 'angular' }
      });
    };
  }).name;
