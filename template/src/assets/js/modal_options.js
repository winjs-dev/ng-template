/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/1/2 11:18
 * @version $ 模态框的默认参数
 */

/* name module */

module.exports = {
    modalTitle: '',
    modalInfo: '',
    modalParams: {},
    modalClass: '',
    modalType: '',
    modalTime: '',
    modalPriority: '',
    template: '',  //默认值
    controller: '',
    isShowCancelBtn: false,
    confirmBtnText: '确认',
    cancelBtnText: '取消',
    size: '',
    controllerAs: '',
    openedClass: '',
    cancelCallback: angular.noop,
    confirmCallback: angular.noop  
};