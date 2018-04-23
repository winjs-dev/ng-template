// Promise Errors
// 异步请求会抛出异常而你并没有处理它，
// 所以最好添加一个 Promise 全局异常捕获事件 unhandledrejection。
import Raven from 'raven-js';

window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason;
  if (reason) {
    // 把data上报到后台！
    Raven.captureMessage(`promise unhandlerejection ${reason}`, {
      level: 'error',
      tags: {custom_commit: 'promise'}
    });
  }
}, true);
