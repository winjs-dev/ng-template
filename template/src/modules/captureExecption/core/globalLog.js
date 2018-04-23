import Raven from 'raven-js';

const isOBJByType = (o, type) => {
  return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']';
}

const processStackMsg = (error) => {
  var stack = error.stack
    .replace(/\n/gi, '')            // 去掉换行，节省传输内容大小
    .replace(/\bat\b/gi, '@')       // chrome中是at，ff中是@
    .split('@')                     // 以@分割信息
    .slice(0, 10)                   // 最大堆栈长度（Error.stackTraceLimit = 10），所以只取前10条
    .map((v) => v.replace(/^\s*|\s*$/g, ''))  // 去除多余空格
    .join('~')                      // 手动添加分隔符，便于后期展示
    .replace(/\?[^:]+/gi, '');      // 去除js文件链接的多余参数(?x=1之类)
  var msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack;
  }

  return stack;
}

const processError = (errObj) => {
  try {
    // PC端：ie10 & safari6 才支持stack，
    // 移动端：Android Browser4 && Safari Mobile6 才支持stack。
    if (errObj.stack) {
      var url = errObj.stack.match('https?://[^\n]+');
      url = url ? url[0] : '';
      var rowCols = url.match(':(\\d+):(\\d+)');
      if (!rowCols) {
        rowCols = [0, 0, 0];
      }

      var stack = processStackMsg(errObj);

      if (isOBJByType(stack, 'Event')) {
        stack += stack.type ? ('--' + stack.type + '--' + (stack.target ? (stack.target.tagName + '::' + stack.target.src) : '')) : '';
      }

      return JSON.stringify({
        msg: stack,
        rowNum: rowCols[1],
        colNum: rowCols[2],
        target: url.replace(rowCols[0], ''),
        _orgMsg: errObj.toString()
      });
    } else {
      // ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
      if (errObj.name && errObj.message && errObj.description) {
        return {
          msg: JSON.stringify(errObj)
        };
      }
      return errObj;
    }
  } catch (err) {
    return errObj;
  }
}
/**
 * 重写window.onerror 用于捕获全局
 * @param msg
 * @param url
 * @param line
 * @param col
 * @param error
 * @returns {boolean}
 */
window.onerror = function (msg, url, line, col, error) {
  console.log(msg + '--' + url + '--' + line + '--' + col + '--' + error);
  // 没有URL不上报！上报也不知道错误
  if (msg !== 'Script error.' && !url) {
    return true;
  }

  // 采用异步的方式
  // 我遇到过在window.onunload进行ajax的堵塞上报
  // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
  // 我猜测这里window.onerror的执行流在关闭前是必然执行的
  // 而离开文章之后的上报对于业务来说是可丢失的
  // 所以我把这里的执行流放到异步事件去执行
  // 脚本的异常数降低了10倍
  setTimeout(function () {
    console.log('window：' + processError(error));
    // 把data上报到后台！
    Raven.captureException(processError(error), {
      level: 'error',
      tags: {custom_commit: 'window'}
    });
  }, 0);
  return true;
};
