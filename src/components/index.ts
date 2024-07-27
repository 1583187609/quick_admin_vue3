/**
 * 全局注册基础组件
 * @link 参考博客https://blog.csdn.net/weixin_42211816/article/details/119671639
 */
import { defineAsyncComponent } from "vue";
//示例 const modules = import.meta.glob("../views/**/**.vue")
// glob（动态导入），globEager（直接引入） "./**/Base*.vue"(src的根components下所有Base开头命名的文件)  "./Base*.vue"（src的根components的根Base开头的文件）
const comps_1 = import.meta.glob("./**/Base*/Index.vue"); // **/ 表示匹配嵌套任意多层级
const comps_2 = import.meta.glob("./**/Base*.vue");
const comps = Object.assign(comps_1, comps_2);
console.log(comps_1, "comps_1------------");
export default function install(app: any) {
  for (const [key, value] of Object.entries(comps)) {
    let name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    if (name === "Index") {
      // name = key.slice(2, key.lastIndexOf("/"));
      name = key.split("/").at(-2)!;
    }
    app.component(name, defineAsyncComponent(value));
  }
}
