/**
 * 缓存滚动
 */
import { onActivated } from "vue";
export default () => {
  //处理滚动事件
  let scrollEle: any = null;
  let top = 0; //记录滚动条滚动的高度
  /**
   * 监听滚动事件
   * @param e Event 对象
   * @param subSeltor 子级元素的选择器
   * @tips 绑定滚动事件时记得加上 capture 修饰符，启用捕获模式
   */
  function handleScroll(e: any, subSeltor?: string) {
    let target = e.target;
    if (subSeltor) {
      target = target.querySelector(subSeltor);
    }
    if (!target) return;
    const { scrollTop } = target;
    !scrollEle && (scrollEle = target);
    top = scrollTop;
  }
  //每次进入时，滚动条滚动到之前缓存的位置
  onActivated(() => {
    scrollEle?.scrollTo(0, top);
  });
  return {
    handleScroll,
  };
};
