var path = require('path')
var utils = require('./utils')
var config = require('./config')
var webpack = require('webpack')
var os = require('os')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

var base = {
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      /* less */
      lessDir: path.resolve(config.directory.assets, 'less/'),
      /* js */
      jsDir: path.resolve(config.directory.assets, 'js/'),
      /* plugins */
      pluginsDir: path.resolve(config.directory.assets, 'plugins/'),
      /* bootstrap 相关 */
      'bootstrap': path.resolve(config.directory.nodeModules, './bootstrap/dist/js/bootstrap.min'),
      'bootstrap_css': path.resolve(config.directory.nodeModules, './bootstrap/dist/css/bootstrap.min.css'),
      'cloud_ui': path.resolve(config.directory.nodeModules, './cloud-broker-ui/dist/css/cloud-ui.min.css'),

      // 项目公用
      'func': path.resolve(config.directory.modules, 'utils'),
      'lang': path.resolve(config.directory.modules, 'lang/zh-cn'),
      'config': path.resolve(config.directory.modules, 'config'),

      'variable': path.resolve(config.directory.assets, 'less/variable.less'),
      'mixins': path.resolve(config.directory.assets, 'less/mixins.less'),
      /* components */
      'locale_zh': path.resolve(config.directory.vendor, 'angular-locale_zh-cn')
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=happybabel'],
        include: [utils.resolve('src/modules'), utils.resolve('test')]
      },
      {
        test: /\.html$/,
        use: ['happypack/loader?id=happyhtml'],
        include: config.directory.src,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    /* 全局shimming */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),

    //开启 happypack 的线程池
    //原有的 webpack 对 loader 的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变
    new HappyPack({
      id: 'happybabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'stage-0'
          ],
          plugins: ['transform-runtime'],
          comments: false,
        }
      }],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),

    new HappyPack({
      id: 'happyhtml',
      loaders: ['raw-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
  ]
}

if(process.env.NODE_ENV !== 'dll') {
  base.entry = {
    app: config.directory.modules + '/main.js'
  }
}

module.exports = base;