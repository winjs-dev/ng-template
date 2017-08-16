/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:53
 * @version $ IIFE
 */

/* name module */

export default class Service {
  constructor(api) {
    this.api = api;
  }
  getName() {
    var names = ['John', 'Elisa', 'Mark', 'Annie'];
    var totalNames = names.length;
    var rand = Math.floor(Math.random() * totalNames);

    return names[rand];
  }
}

Service.$inject = ['api'];
