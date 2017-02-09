/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/11 21:53
 * @version $ IIFE
 */

/* name module */

function HomeService() {
    var vm = this;

    vm.names = ['John', 'Elisa', 'Mark', 'Annie'];

    vm.getName = getName;
    
    function getName() {
        var totalNames = vm.names.length;
        var rand = Math.floor(Math.random() * totalNames);
        return vm.names[rand];
    }

    return vm;
}

module.exports = HomeService;