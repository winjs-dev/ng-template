/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/12/24 23:47
 * @version $ IIFE
 */

/* name module */

var template = require('../../views/modal_template.html');

ModalService.$inject = ['$injector'];

function ModalService($injector) {
  var vm = this;

  vm.openModal = openModal;

  var setResulve = function (options) {
    return {
      modalTitle: function () {   //错误标题
        return options.modalTitle || '警告';
      },
      modalInfo: function () {    //错误信息
        return options.modalInfo || '操作失败';
      },
      modalType: function () {    //错误类别
        return options.modalType || '';
      },
      modalParams: function () {    //错误类别
        return options.modalParams || '';
      },
      modalTime: function () {    //显示错误停留的时间
        return options.modalTime || '';
      },
      modalClass: function () {    //图标样式
        return options.modalClass || '';
      },
      modalPriority: function () {    //模态窗优先级
        return options.modalPriority || '';
      },
      isShowCancelBtn: function () {   // 是否显示取消按钮
        return options.isShowCancelBtn || false;
      },
      confirmBtnText: function () {   // 确认按钮文案
        return options.confirmBtnText || '确认';
      },
      cancelBtnText: function () {   // 取消按钮文案
        return options.cancelBtnText || '取消';

      },
    }
  };

  // 模态框
  function openModal(options) {
    var resolve = setResulve(options);
    var uibModalStack = $injector.get('$uibModalStack');
    var uibModal = $injector.get('$uibModal');
    var modalInfo = options.modalInfo;

    var modalInstance = uibModal.open({
      animation: true,
      ariaDescribedBy: 'modal-body',
      template: options.template || template,
      controller: options.controller || defaultController,
      size: options.size || 'sm',
      resolve: resolve,
      controllerAs: options.controllerAs || '$ctrl',
      openedClass: options.openedClass || 'default-modal'
    });

    if (options.modalPriority == 'unique') {
      uibModalStack.dismissAll();
    }

    if (modalInfo == '远程服务响应失败,请稍后重试') {
      uibModalStack.dismissAll();
    }

    modalInstance.result.then(function (selectedItem) {
      angular.isFunction(options.confirmCallback) &&
      options.confirmCallback(selectedItem);
    }, function () {  // 点击空白的地方，执行
      angular.isFunction(options.cancelCallback) &&
      options.cancelCallback();
    });
  }

  return vm;
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
    //当timeout被定义时，它返回一个promise对象
    var timer = $timeout(
      function () {
        ra.cancel();
      },
      _modalTime
    );
    //将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
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
  if (errorNo == '2009') {
    $uibModalStack.dismissAll();
  }
}


module.exports = ModalService;
