// 操作 DOM 元素，把 content 显示到网页上
function showContent(content) {
  const appEle = window.document.getElementById('app');

  appEle.innerText = 'Hello，' + content;
}

console.log('show.js - 实时预览log~');

// 通过 CommonJS 规范导出 show 函数
module.exports = showContent;