/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/24 23:47
 * @version $ IIFE
 */

/* name module */

import angular from 'angular';

var template = './views/modal_template.html';

var setResulve = function (options) {
  return {
    // 错误标题
    modalTitle: function () {
      return options.modalTitle || '警告';
    },
    // 错误信息
    modalInfo: function () {
      return options.modalInfo || '操作失败';
    },
    // 错误类别
    modalType: function () {
      return options.modalType || '';
    },
    // 错误参数
    modalParams: function () {
      return options.modalParams || '';
    },
    // 显示错误停留的时间
    modalTime: function () {
      return options.modalTime || '';
    },
    // 样式
    modalClass: function () {
      return options.modalClass || '';
    },
    // 模态窗优先级
    modalPriority: function () {
      return options.modalPriority || '';
    },
    // 是否显示取消按钮
    isShowCancelBtn: function () {
      return options.isShowCancelBtn || false;
    },
    // 确认按钮文案
    confirmBtnText: function () {
      return options.confirmBtnText || '确认';
    },
    // 取消按钮文案
    cancelBtnText: function () {
      return options.cancelBtnText || '取消';
    }
  }
};

export default function ModalService($injector) {
  return function openModal(options) {
    var resolve = setResulve(options);
    var uibModalStack = $injector.get('$uibModalStack');
    var uibModal = $injector.get('$uibModal');
    var modalInfo = options.modalInfo;
    var modalInstance = uibModal.open({
      animation: true,
      ariaDescribedBy: 'modal-body',
      templateUrl: options.template || template,
      controller: options.controller || defaultController,
      size: options.size || 'sm',
      resolve: resolve,
      controllerAs: options.controllerAs || '$ctrl',
      openedClass: options.openedClass || 'default-modal'
    });

    if (options.modalPriority === 'unique') {
      uibModalStack.dismissAll();
    }

    if (modalInfo === '远程服务响应失败,请稍后重试') {
      uibModalStack.dismissAll();
    }

    modalInstance.result.then(function (selectedItem) {
      angular.isFunction(options.confirmCallback) &&
      options.confirmCallback(selectedItem);
    }, function () {
      // 点击空白的地方，执行
      angular.isFunction(options.cancelCallback) &&
      options.cancelCallback();
    });
  }
}

function defaultController($uibModalInstance, $uibModalStack, $timeout, modalTitle, modalInfo, modalParams, modalTime, isShowCancelBtn, confirmBtnText, cancelBtnText) {
  var ra = this;
  var errorNo = modalParams.error_no;

  ra.modalTitle = modalTitle;
  ra.modalInfo = modalInfo;
  ra.modalParams = modalParams;
  ra.modalTime = modalTime;
  ra.isShowCancelBtn = isShowCancelBtn;
  ra.confirmBtnText = confirmBtnText;
  ra.cancelBtnText = cancelBtnText;

  ra.cancel = cancel;
  ra.close = close;
  ra.timeout = timeout;

  function close() {
    closeAll(errorNo, $uibModalStack);
    $uibModalInstance.close();
  }

  function cancel() {
    closeAll(errorNo, $uibModalStack);
    $uibModalInstance.dismiss('cancel');
  }

  function timeout(_modalTime) {
    // 当timeout被定义时，它返回一个promise对象
    var timer = $timeout(
      function () {
        ra.cancel();
      },
      _modalTime
    );
    // 将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
    timer.then(
      function () {
        console.log('Timer resolved!', Date.now());
      },
      function () {
        console.log('Timer rejected!', Date.now());
      }
    );
  }

  // 初始化，自动关闭
  if (angular.isNumber(modalTime) && modalTime > 0) {
    ra.timeout(modalTime);
  }
}

function closeAll(errorNo, $uibModalStack) {
  if (String(errorNo) === '2009') {
    $uibModalStack.dismissAll();
  }
}

ModalService.$inject = ['$injector'];
