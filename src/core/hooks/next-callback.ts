import { showMessage } from "../utils";

/**
 * next 回调函数。提示信息，关闭弹窗，执行回调函数
 */
export default (text = "操作", exeClosePopup?, callback?: () => void) => {
  return (hint = `${text}成功`, closePopup = exeClosePopup, cb = callback) => {
    showMessage(hint);
    closePopup?.();
    cb?.();
  };
};
