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
