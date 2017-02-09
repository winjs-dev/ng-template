/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 20:18
 * @version $ IIFE
 */

/* name module */

const path = require('path');
const dirVars = require('./dir');

module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* 各种目录 */

    /* 各种目录 */
    configDir: dirVars.configDir,
    /* less */
    lessDir: path.resolve(dirVars.assetsDir, 'less/'),
    /* js */
    jsDir: path.resolve(dirVars.assetsDir, 'js/'),
    /* plugins */
    pluginsDir: path.resolve(dirVars.assetsDir, 'plugins/'),
    /* vendor */
    /* bootstrap 相关 */
    bootstrap: path.resolve(dirVars.nodeModueDir, './bootstrap/dist/js/bootstrap.min'),
    bootstrap_css: path.resolve(dirVars.nodeModueDir, './bootstrap/dist/css/bootstrap.min.css'),

    /* components */
    locale_zh: path.resolve(dirVars.jsVendorDir, 'angular-locale_zh-cn'),
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['', '.js', '.json'],
  fallback: [path.join(__dirname, '../node_modules')],
};
