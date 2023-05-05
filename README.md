# Webpack
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

# 内容简介
本书是国内第一本系统全面讲解 Webpack 的图书，涵盖了 Webpack 的入门、配置、实战、优化、原理；
  * [第1章](http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/)教你从0开始学会使用 Webpack；
  * [第2章](http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/)详细的讲解了 Webpack 提供的常用配置项；
  * [第3章](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/)结合实际项目中常见的场景给出最佳实践；
  * [第4章](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/)罗列出了各种优化 Webpack 的手段；
  * [第5章](http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/)剖析了 Webpack 原理以及如何开发 Plugin 和 Loader。

# 一、入门
## 1-1 为什么需要构建？
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

## 1-2 安装与使用
最新的webpack正式版本是：
<br />
<br />
<img src="https://img.shields.io/npm/v/webpack.svg?label=webpack&amp;style=flat-square&amp;maxAge=3600" alt="GitHub release">

在开始给项目加入构建前，新建一个目录`02_安装与使用`，再进入项目根目录执行`npm init`来初始化最简单的采用了模块化开发的项目；

### 本地安装
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

### 全局安装
通过 NPM 安装方式，可以使 webpack 在全局环境下可用：`npm install --global webpack`；
此时在项目根目录下对应的命令行里通过输入`webpack`可以构建你的项目；

> **Warning**
>
> **不推荐** 全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中， 可能会导致构建失败。

### 使用Webpack
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

## 1-3 使用Loader
为项目引入 CSS 代码让文字居中显示，新建`main.css`的内容如下，Webpack把一切文件看作模块，CSS 文件也不例外，要在入口文件引入`main.css`需要像引入 JavaScript 文件那样，修改入口文件`main.js`，如下：
```js
// main.css
#app {
  text-align: center;
  font-size: 30px;
}

// main.js
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
...
```

此时再去执行Webpack构建是会报错的，因为 Webpack 不原生支持解析 CSS 文件。要支持非 JavaScript 类型的文件，需要使用 Webpack 的 Loader 机制。Webpack的配置修改使用如下：
```js
const path = require('path');

module.exports = {
  ...
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

Loader 可以看作具有文件转换功能的翻译员，配置里的 `module.rules` 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。 如上配置告诉 Webpack 在遇到以 .css 结尾的文件时先使用 `css-loader` 读取 CSS 文件，再交给 `style-loader` 把 CSS 内容注入到 `JavaScript` 里。 在配置 Loader 时需要注意的是：
  * `use` 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；

在重新执行 Webpack 构建前要先安装新引入的 Loader：`npm i -D style-loader css-loader`；

安装成功后重新执行构建时，你会发现 `bundle.js` 文件被更新了，里面注入了在 `main.css` 中写的 CSS，而不是会额外生成一个 CSS 文件。 但是重新刷新 `index.html` 网页时将会发现 `Hello，Webpack` 居中了，样式生效了！ 也许你会对此感到奇怪，第一次看到 CSS 被写在了 JavaScript 里！这其实都是 `style-loader` 的功劳(它的工作原理大概是把 CSS 内容用 JavaScript 里的字符串存储起来， 在网页执行 JavaScript 时通过 DOM 操作动态地往 HTML head 标签里插入 HTML style 标签)。

除了在 `webpack.config.js` 配置文件中配置 Loader 外，还可以在引入文件时指定用什么 Loader 去处理文件。 以加载 CSS 文件为例，修改上面例子中的 `main.js` 如下：
```js
require('style-loader!css-loader!./main.css');
```
这样就能指定对 `./main.css` 这个文件先采用 `css-loader` 再采用 `style-loader` 转换。

## 1-4 使用Plugin
Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。

通过 `npm i -D mini-css-extract-plugin` 把注入到`bundle.js`文件里的 CSS 提取到单独的文件中，配置修改如下：
```js
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  ...
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    })
  ]
}
```

重新执行构建，你会发现 dist 目录下多出一个 `main.6cb934d3.css` 文件，bundle.js 里也没有 CSS 代码了。但是，如果你从 webpack 入口处导入 CSS， `mini-css-extract-plugin` 则不会将这些 CSS 加载到页面中。请使用 `npm i -D html-webpack-plugin` 自动生成生成一个 HTML5 文件或者在创建 `index.html` 文件时使用 link 标签引入`./dist/main.6cb934d3.css`；
```js
//webpack.config.js
...
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),
    // ./dist/index.html
    // template：模板使用我们创建的index.html
    // inject：js资源放入body元素里底部
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ]
}

or

// index.html
<link rel="stylesheet" href="./dist/main.6cb934d3.css">
```

在使用`html-webpack-plugin`插件前应该把根目录`index.html`引入的资源(css、js...)删除，因为这个插件会在生成html时帮我们引入，但由于插件生成的模板是根目录index.html，所以会导致生成html有两次引入资源。通过插件生成的正确`dist/index.html`文件如下：
```js
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Document</title>
  <link href="main.6cb934d3.css" rel="stylesheet">
</head>

<body>
  <div id="app"></div>
  <script defer="defer" src="bundle.js"></script>
</body>

</html>
```

Webpack 是通过 plugins 属性来配置需要使用的插件列表的。 plugins 属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

例如 MiniCssExtractPlugin 插件的作用是提取出 JavaScript 代码里的 CSS 到一个单独的文件。对此你可以通过插件的 `filename` 属性，告诉插件输出的 CSS 文件名称是通过 `[name].[contenthash:8].css` 字符串模版生成的：
  * `[name]` 代表文件名称；
  * `[contenthash:8]` 代表根据文件内容算出的8位 hash 值。使用 filename: "[contenthash].css" 启动长期缓存；
  * 还有很多配置选项可以在 [MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/) 的主页上查到；
  * 关于更多[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options)配置；

## 1-5 使用DevServer
前面的操作只是让 Webpack 正常运行起来了，但在实际开发中你可能会需要：
  1. 提供 HTTP 服务而不是使用本地文件预览；
  2. 监听文件的变化并自动刷新网页，做到实时预览；
  3. 支持 Source Map，以方便调试；

对于这些，Webpack 都为你考虑好了。Webpack 原生支持上述第2、3点内容，再结合官方提供的开发工具 `DevServer` 也可以很方便地做到第1点。DevServer 会启动一个 HTTP 服务器用于服务网页请求，同时会帮助启动 Webpack，并接收 Webpack 发出的文件更变信号，通过 WebSocket 协议自动刷新网页做到实时预览。

为之前的小项目 `Hello，Webpack` 继续集成 DevServer。 首先需要安装 DevServer插件：`npm i -D webpack-dev-server`；
  * 安装成功后执行 `npx webpack-dev-server` 命令或者在scripts添加一个脚本命令`"dev": "webpack-dev-server"`，执行`npm run dev`；
  * DevServer 就启动了，这时你会看到控制台有一些日志输出和一个本地地址`http://localhost:8080/`；

DevServer 启动后会一直驻留在后台保持运行，访问这个网址你就能获取项目根目录下的 `index.html`。用浏览器打开这个地址你会发现页面空白错误原因是页面不能获取到内容，因为页面获取路径是在public下，这个是由下载的 `webpack-dev-server` 默认存放的。同时你会发现并没有文件输出到 `dist` 目录，原因是 `DevServer` 会把 Webpack 构建出的文件保存在内存中，在要访问输出的文件时，必须通过 HTTP 服务访问。 由于 DevServer 不会理会 webpack.config.js 里配置的 `output.path` 属性，所以要获取 `bundle.js` 的正确 URL 是 `http://localhost:8080/bundle.js`，对应的 `index.html`、`webpack.config.js` 文件应该修改为：
```js
// index.html
<script src="bundle.js"></script>

// webpack.config.js
...
devServer: {
  static: './'
}
```

### 实时预览
接着上面的步骤，你可以试试修改 `main.js` `main.css` `show.js` `index.html` 中的任何一个文件，保存后你会发现浏览器会被自动刷新，运行出修改后的效果。

Webpack 在启动时可以开启监听模式，开启监听模式后 Webpack 会监听本地文件系统的变化，发生变化时重新构建出新的结果。Webpack 默认是关闭监听模式的，你可以在启动 Webpack 时通过 webpack --watch 来开启监听模式。

通过 DevServer 启动的 Webpack 会开启监听模式，当发生变化时重新执行完构建后通知 DevServer。 DevServer 会让 Webpack 在构建出的 JavaScript 代码里注入一个代理客户端用于控制网页，网页和 DevServer 之间通过 WebSocket 协议通信， 以方便 DevServer 主动向客户端发送命令。 DevServer 在收到来自 Webpack 的文件变化通知时通过注入的客户端控制网页刷新。

### 模块热替换
除了通过重新刷新整个网页来实现实时预览，DevServer 还有一种被称作模块热替换的刷新技术。 模块热替换能做到在不重新加载整个网页的情况下，通过将被更新过的模块替换老的模块，再重新执行一次来实现实时预览。 模块热替换相对于默认的刷新机制能提供更快的响应和更好的开发体验。模块热替换默认是关闭的，要开启模块热替换，你只需在启动 DevServer 时带上 `--hot` 参数，重启 DevServer 后再去更新文件就能体验到模块热替换了。

> 从 `webpack-dev-server` v4.0.0 开始，热模块替换是默认开启的。

### 支持 Source Map
在浏览器中运行的 JavaScript 代码都是编译器输出的代码，这些代码的可读性很差。如果在开发过程中遇到一个不知道原因的 Bug，则你可能需要通过断点调试去找出问题。 在编译器输出的代码上进行断点调试是一件辛苦和不优雅的事情， 调试工具可以通过 Source Map 映射代码，让你在源代码上断点调试。 Webpack 支持生成 Source Map，只需在启动时带上 `--devtool source-map` 参数。加上参数重启 DevServer 后刷新页面，再打开 Chrome 浏览器的开发者工具，就可在 Sources 栏中看到可调试的源代码了。

## 1-6 核心概念
Webpack 有以下几个核心概念：
  * Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  * Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
  * Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
  * Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
  * Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
  * Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

# 二、配置
配置 Webpack 的方式有两种：
  1. 通过一个 JavaScript 文件描述配置，例如使用 `webpack.config.js` 文件里的配置；
  2. 执行 Webpack 可执行文件时通过命令行参数传入，例如 `webpack --devtool source-map`；

这两种方式可以相互搭配，例如执行 `Webpack` 时通过命令 `webpack --config webpack-dev.config.js` 指定配置文件，再去 `webpack-dev.config.js` 文件里描述部分配置。

按照**配置方式**来划分，可分为：
  * 只能通过命令行参数传入的选项，这种最为少见；
  * 只能通过配置文件配置的选项；
  * 通过两种方式都可以配置的选项；

按照配置**所影响的功能**来划分，可分为：
  * 2-0 Mode 配置相应模式的内置优化；
  * 2-1 Entry 配置模块的入口；
  * 2-2 Output 配置如何输出最终想要的代码；
  * 2-3 Module 配置处理模块的规则；
  * 2-4 Resolve 配置寻找模块的规则；
  * 2-5 Plugins 配置扩展插件；
  * 2-6 DevServer 配置 DevServer；
  * 2-7 其它配置项 其它零散的配置项；
  * 2-8 整体配置结构 整体地描述各配置项的结构；
  * 2-9 多种配置类型 配置文件不止可以返回一个 Object，还有其他返回形式；
  * 2-10 配置总结 寻找配置 Webpack 的规律，减少思维负担；

## 2-0 Mode
提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。

`string = 'production': 'none' | 'development' | 'production'`

如果没有设置，webpack 会给 mode 的默认值设置为 production。

### 用法
  * 在配置对象中提供 mode 选项：
    ```js
    module.exports = {
      mode: 'development',
      // mode: 'production',
      // mode: 'none',
    };
    ```
  * 或者从 `CLI` 参数中传递：
    ```js
    npx webpack --mode=development
    // npx webpack --mode=production
    // npx webpack --mode=none
    ```

    > **Tip**
    > 如果 `mode` 未通过配置或 `CLI` 赋值，`CLI` 将使用可能有效的 `NODE_ENV` 值作为 `mode`。 

如果要根据 webpack.config.js 中的 mode 变量更改打包行为，则必须将配置导出为函数，而不是导出对象：
```js
var config = {
  entry: './main.js',
  //...
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  };

  if (argv.mode === 'production') {
    //...
  };

  return config;
}
```

## 2-1 Entry
`entry` 是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块；
`entry` 配置是必填的，若不填则将导致 Webpack 报错退出；

### context
上下文是入口文件所处的目录的绝对路径的字符串；

Webpack 在寻找相对路径的文件时会以 context 为根目录，context 默认为执行启动 Webpack 时所在的当前工作目录。 如果想改变 context 的默认配置，则可以在配置文件里这样设置它：
```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}
```
还可以通过在启动 Webpack 时带上参数 `webpack --context` 来设置 `context`；

### Entry类型
Entry 类型可以是以下三种中的一种或者相互组合：
类型 | 例子 | 含义
---- | ---- | ----
string | './app/entry' | 入口模块的文件路径，可以是相对路径。
string | ['./app/entry1', './app/entry2'] | 入口模块的文件路径，可以是相对路径。
string | { a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2'] } | 配置多个入口，每个入口生成一个 Chunk。

如果是 `array` 类型，则搭配 `output.library` 配置项使用时，只有数组里的最后一个入口文件的模块会被导出；

### Chunk 名称
Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：
  * 如果传入一个字符串或字符串数组，就只会生成一个 chunk，这时 chunk 的名称会被命名为 main。
  * 如果传入一个对象，就可能会出现多个 chunk，则每个属性的键(key)会是 chunk 的名称，该属性的值描述了 chunk 的入口点。

### 配置动态 Entry
假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：
```js
// 同步函数
entry: () => {
  return {
    a:'./pages/a',
    b:'./pages/b',
  }
};

// 异步函数
entry: () => {
  return new Promise((resolve)=>{
    resolve({
       a:'./pages/a',
       b:'./pages/b',
    });
  });
};
```

