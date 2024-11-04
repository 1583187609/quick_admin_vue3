// vite html ejs 参考：https://www.jianshu.com/p/77cceaaa4723
import { createHtmlPlugin } from "vite-plugin-html";
export default createHtmlPlugin({
  minify: true,
  // entry: 'src/main.ts', //在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
  // template: 'public/index.html', //如果想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
  // 需要注入 index.html ejs 模版的数据
  inject: {
    data: {
      title: "后台管理模板",
      // injectScript: `<script src="./inject.js"></script>`,
    },
  },
});
