/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/11/28 18:42
 * @version $ IIFE
 */

/* name module */

const webpack = require('webpack');
const pluginsConfig = require('./plugins');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const configuration = require('../configuration');
const dirVars = require('./dir');

pluginsConfig.push(
  new webpack.DefinePlugin({
    __PRODUCTION__: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'false')),
  }),

  new ExtractTextPlugin('[name].[hash].min.css', {
    allChunks: true
  }),

  new UglifyJsParallelPlugin({
    exclude: /node_module\/\.min\.js$/,
    workers: os.cpus().length,
    // http://pinkyjie.com/2016/03/05/webpack-tips/
    // 使用module的.name属性来决定一个service的名字，然后在别的地方使用依赖注入来引入这个service的话，这个时候一旦你使用-p参数，程序就会报错：找不到provider，MockDataProvider <- MockData。因为在e2e.data.js文件中你export的class虽然叫MockData，但这个名字会被UglifyJsPlugin改掉。这是因为这个插件有一个mangle选项，会对所有函数名变量名进行混淆，在压缩的同时保证安全。
    // {except: ['$', 'exports', 'require']},
    mangle: false,
    output: {
      comments: false,
    },
    compressor: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  }),

  new HtmlWebpackPlugin({
    template: dirVars.srcDir + '/index.html',
    filename: 'index.html',
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //删除空白符与换行符
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    inject: 'body',
    hash: true, //如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
  }),

  // 抽取出所有通用的部分
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: Infinity
  }),

  // 配合CLI的--bail，一出error就终止webpack的编译进程
  new webpack.NoErrorsPlugin(),
  // 添加版本号
  new webpack.BannerPlugin('current version: ' + new Date())
);

if (configuration.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  pluginsConfig.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        configuration.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (configuration.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  pluginsConfig.push(new BundleAnalyzerPlugin());
}

module.exports = pluginsConfig;
