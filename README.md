## Webpack
[《深入浅出Webpack》](http://webpack.wuhaolin.cn) - [吴浩麟](https://github.com/gwuhaolin/dive-into-webpack) / 著；

[Webpack](https://webpack.docschina.org/)是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。

Webpack的优点是：
  * 专注于处理模块化的项目，能做到开箱即用一步到位；
  * 通过 Plugin 扩展，完整好用又不失灵活；
  * 使用场景不仅限于 Web 开发；
  * 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
  * 良好的开发体验；

Webpack的缺点是：只能用于采用模块化开发的项目；

## 内容简介
本书是国内第一本系统全面讲解 Webpack 的图书，涵盖了 Webpack 的入门、配置、实战、优化、原理；
  * [第1章](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/)教你从0开始学会使用 Webpack；
  * [第2章](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/)详细的讲解了 Webpack 提供的常用配置项；
  * [第3章](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/)结合实际项目中常见的场景给出最佳实践；
  * [第4章](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/)罗列出了各种优化 Webpack 的手段；
  * [第5章](http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/)剖析了 Webpack 原理以及如何开发 Plugin 和 Loader。

## 一、入门
### 1-1 为什么需要构建？
感叹前端技术发展之快，各种可以提高开发效率的新思想和框架被发明。但是这些东西都有一个共同点：源代码无法直接运行，必须通过转换后才可以正常运行。

构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容：
  * 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等；
  * 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等；
  * 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载；
  * 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件；
  * 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器；
  * 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过；
  * 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统；

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力；

### 1-2 安装与使用
最新的webpack正式版本是：
<br />
<br />
<img src="https://img.shields.io/npm/v/webpack.svg?label=webpack&amp;style=flat-square&amp;maxAge=3600" alt="GitHub release">

在开始给项目加入构建前，新建一个目录`02_安装与使用`，再进入项目根目录执行`npm init`来初始化最简单的采用了模块化开发的项目；

#### 本地安装
  * 要安装 Webpack 到本项目，可按照你的需要选择以下任意命令运行：
    ```js
    // npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies

    // 安装最新稳定版
    npm i -D webpack

    // 安装指定版本
    npm i -D webpack@<version>

    // 安装最新版本
    npm i -D webpack@next
    // 或特定的 tag/分支
    npm install -D webpack/webpack#<tagname/branchname>
    ```
  * 安装完后你可以通过这些途径运行安装到本项目的 Webpack：
    - 在项目根目录下对应的命令行里通过`node_modules/.bin/webpack`运行 Webpack 可执行文件；
    - 在`Npm Script`里定义的任务会优先使用本项目下的 Webpack，代码如下：
      ```js
      "scripts": {
        "build": "webpack --config webpack.config.js"
      }
      ```

#### 全局安装
通过 NPM 安装方式，可以使 webpack 在全局环境下可用：`npm install --global webpack`；
此时在项目根目录下对应的命令行里通过输入`webpack`可以构建你的项目；

> **Warning**
>
> **不推荐** 全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中， 可能会导致构建失败。

#### 使用Webpack
下面通过 Webpack 构建一个采用 CommonJS 模块化编写的项目，该项目有个网页会通过 JavaScript 在网页中显示`Hello，Webpack`；
运行构建前，先把要完成该功能的最基础的 JavaScript 文件和 HTML 建立好，需要如下文件：
  * 页面入口文件`index.html`
    ```js
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="app"></div>

      <script src="./dist/bundle.js"></script>
    </body>
    </html>
    ```
  * JS 工具函数文件`show.js`
    ```js
    // 操作 DOM 元素，把 content 显示到网页上
    function showContent(content) {
      const appEle = window.document.getElementById('app');

      appEle.innerText = 'Hello，' + content;
    }

    // 通过 CommonJS 规范导出 show 函数
    module.exports = showContent;
    ```
  * JS 执行入口文件`main.js`
    ```js
    // 通过 CommonJS 规范导入 show 函数
    const showContent = require('./show.js');

    // 执行 show 函数
    showContent('Webpack');
    ```
  * Webpack 在执行构建时默认会从项目根目录下的 webpack.config.js 文件读取配置，所以你还需要新建它，其内容如下：
    ```js
    const path = require('path');

    module.exports = {
      // JavaScript 执行入口文件
      entry: './main.js',
      // 输出
      output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist')
      }
    }
    ```
> 由于 Webpack 构建运行在 Node.js 环境下，所以该文件最后需要通过 CommonJS 规范导出一个描述如何构建的`Object`对象。

一切文件就绪，在项目根目录下执行`npm run build` or `npx webpack`命令运行 Webpack 构建，你会发现目录下多出一个 dist 目录，里面有个 bundle.js 文件， bundle.js 文件是一个可执行的 JavaScript 文件，它包含页面所依赖的两个模块 main.js 和 show.js 及内置的 webpackBootstrap 启动函数。 这时你用浏览器打开 index.html 网页将会看到 Hello，Webpack。

Webpack 是一个打包模块化 JavaScript 的工具，它会从 `main.js` 出发，识别出源码中的模块化导入语句， 递归的寻找出入口文件的所有依赖，把入口和其所有依赖打包到一个单独的文件中。 从 Webpack2 开始，已经内置了对 `ES6、CommonJS、AMD` 模块化语句的支持。
