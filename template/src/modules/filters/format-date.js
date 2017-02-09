/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/1/1 22:34
 * @version $ IIFE
 */

/* name module */

var func = require('../utils');

function formatDate() {
    return function (time, pattern) {
        return func.formatDate(time, pattern);
    }
}

module.exports = formatDate;