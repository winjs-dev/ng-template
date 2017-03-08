/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/25 21:09
 * @version $ IIFE
 */

/* name module */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirVars = require('./dir');

var lessLoader;

if (process.env.PRODUCTION) {
  lessLoader = ExtractTextPlugin.extract('happypack/loader?id=happyless');
} else {
  lessLoader = 'happypack/loader?id=happyless';
}

module.exports = {
  loaders: [
    {
      test: require.resolve('jquery'),
      loader: 'expose?$!expose?jQuery',
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
    },
    {
      test: /\.less$/,
      loader: lessLoader
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.js$/,
      loaders: ['happypack/loader?id=happybabel'],
      exclude: /(node_modules|bower_components|helpers\/lib|\.spec\.js$)/,
    },
    {
      test: /\.jsx?$/,
      loader: 'happypack/loader?id=happybabel',
      exclude: /(node_modules|bower_components)/,
    },
    {
      test: /\.html$/,
      include: dirVars.srcDir,
      loaders: ['happypack/loader?id=happyhtml']
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /\.(png|jpg|gif)$/,
      loader: 'url?limit=8192&name=assets/[hash:8].[ext]'
    },
    {
      // 专供iconfont方案使用的
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      loader: 'file?name=assets/[hash:8].[ext]'
    },
  ],
};
