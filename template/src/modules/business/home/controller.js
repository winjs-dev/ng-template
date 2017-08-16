/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */
export default class Controller {
  constructor(service) {
    this.name = 'world';
    this.service = service;
  }

  changeName() {
    this.name = 'angular-tips';
  }

  randomName() {
    this.name = this.service.getName();
  }
}

Controller.$inject = ['service'];
