// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// require('style-loader!css-loader!./main.css');

// 通过 CommonJS 规范导入 show 函数
const showContent = require('./show.js');

// 执行 show 函数
showContent('Webpack');
