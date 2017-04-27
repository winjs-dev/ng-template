/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/10 23:58
 * @version $ IIFE
 */

/* name module */
require('locale_zh');

Controller.$inject = ['service'];

function Controller(service) {
    var vm = this;

    vm.random = homeService;
    vm.name = 'world';

    vm.changeName = changeName;
    vm.randomName = randomName;

    function changeName() {
        vm.name = 'angular-tips';
    }

    function randomName() {
       vm.name = vm.random.getName();
    }

    // 日历相关
    vm.dateOptions = {
        startingDay: 1,
        showWeeks: false
    };
    vm.popupStartTime = {
        opened: false
    };
    vm.openStartTime = function() {
        vm.popupStartTime.opened = true;
    };
}

module.exports = Controller;
