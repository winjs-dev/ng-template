// Record Resources load Errors
import Raven from 'raven-js';

window.addEventListener('error', (e) => {
  const resource = e.target.src || e.target.href;
  if (resource) {
    // 把data上报到后台！
    Raven.captureMessage(`src load error at ${resource}`, {
      level: 'error',
      tags: {custom_commit: 'resources'}
    });
  }
}, true);
