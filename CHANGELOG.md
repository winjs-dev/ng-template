# Change Log
---

## 1.0.6
 
`2017-09-21`
 
- webpack 自动构建工具
 
   - `Changed` 默认设置图片压缩`imagemin`不开启
   
   - `Improved` 路径别名优化
   
## 1.0.5
 
`2017-09-19`
 
- webpack 自动构建工具
 
   - `Changed` 增加`assets`路径别名

## 1.0.4
 
`2017-09-18`
 
- webpack 自动构建工具
 
   - `Changed` 为dist目录下index.html引用的`config.js`添加hash值,去除缓存
   
## 1.0.3
 
`2017-09-08`
 
- webpack 自动构建工具
 
   - `Changed` 引入`cloud-utils`工具类函数集合，替换工程里的`utils`
 
- src
 
   - `New` 引入`store.js`，详见`template/src/assets/js/vendor/store.js` 
   

## 1.0.2
 
`2017-09-05`
 
- webpack 自动构建工具
 
   - `New` 引入`eslint`javascript代码检测工具，新增命令`npm run lint`，详见`template/package.json`、`template/.eslintrc.js`
 

## 1.0.1

`2017-08-16`

- webpack 自动构建工具

  - `New` 引入`webpack.ProgressPlugin`打包进度条，有关配置在`template/build/webpack.prod.conf.js`文件里（98行）

  - `New` 引入`webpack-spritesmith`图片精灵功能，把需要合并的小图片拷贝至`src/assets/images/sprites`，执行命令行`npm run dll`，会在项目`src/assets/less/`自动生成`_sprite.css`（已在main.less里引用）。有关配置在`template/build/webpack.dll.conf.js`文件里（75行）

  - `New` 引入`imagemin-webpack-plugin`图片压缩功能，有关配置在`template/build/webpack.prod.conf.js`文件里（122行）

  - `New` 将相关第三方模块依赖（node_modules里的具体模块），依靠CommonsChunkPlugin功能，打包到`vendor.js`文件里，利于实现增量更新，有关配置在`template/build/webpack.prod.conf.js`文件里（70行）

 - `Improved` 添加生产环境中，去除js文件的日志信息功能，有关配置在`template/build/webpack.prod.conf.js`文件里（36行）
 
  - `Improved` html文件里需要引用的图片静态资源，新增copyfiles文件夹。这样就不需要每次手动在webpack.dll.conf.js添加

  - `Update` 更新package.json的`webpack`版本

- 项目src

  - `New` 采用es6语法
  
  - `New` 新增文件夹`business`至目录`modules`下，将具体业务模块放到这里

  - `New` 新增文件夹`copyfiles`和`sprites`至目录`assets/images`，**`copyfiles`目录下的文件并不会被webpack处理，它们会直接复制到最终的打包目录（默认是dist/assets/images/copyfiles），而其他的静态资源都会被webpack处理解析为模块依赖**

  - `New` 新增文件夹`widget`至目录`assets/less`，主要放置web组件的样式文件，如button.less

  - `Update` 更新package.json的`webpack`版本

  - `Changed` 删除`font.less`，直接引用fonts文件夹下的iconfont.css。
  
  
## 0.0.2

`2017-04-27`

- `Improved` webpack1.X更换为webpack2.X

## 0.0.1

`2017-02-18`
 
- `Improved` 增加cloud-ui作为默认css库
