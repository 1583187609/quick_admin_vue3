/**
 * 生成首页文档
 */

import path from "path";
import { N, docsPath, indexName, projectInfo, writeFileSync } from "../utils/index.js";
import { getPartFirstPathByName } from "../menus/index.js";

const { title, description, stackBrief } = projectInfo;

function getHeroStr() {
  const hero = {
    name: title,
    text: description,
    tagline: stackBrief,
    image: "/logo.svg",
    actions: [
      { text: "指南", link: getPartFirstPathByName("guide") },
      { text: "组件", link: getPartFirstPathByName("comp") },
      // { text: "快速上手", link: getPartFirstPathByName("guide") },
      // {
      //   text: "在线预览",
      //   link: "https://gitee.com/link?target=https%3A%2F%2F1583187609.github.io%2Fquick_admin%2Fvue3%2Fpreview%2F%23%2Flogin",
      // },
      // { text: "在Github上查看", link: "https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2F1583187609%2Fquick_admin_vue3" },
    ],
  };
  const { name, text, tagline, image, actions } = hero;
  function getActionsStr(actions) {
    return actions.map((item, ind) => {
      const { text, link = "" } = item;
      const theme = ind === 0 ? "brand" : "alt";
      return `
    - theme: ${theme}
      text: ${text}
      link: ${link}
      # target?: string
      # rel?: string`;
    });
  }
  return `
hero:
  name: ${name}
  text: ${text}
  tagline: ${tagline}
  image:
    src: ${image}
    alt: logo
    width: 160px
  actions: ${getActionsStr(actions)}`;
}
function getFeaturesStr() {
  // const pathStr = getPartFirstPathByName();
  const features = [
    {
      icon: "🔥",
      title: "最新流行技术栈",
      details: "基于 Vite5.4、Vue3.5、TS、Pinia、Element-Plus 等最新技术栈开发",
      // link: pathStr,
      // linkText: "了解更多",
    },
    {
      icon: "✨",
      title: "简单易上手",
      details: "设计遵循可读原则，文档内容详细易懂",
    },
    {
      icon: "🚀",
      title: "显著提升开发效率",
      details: "通过渐进式的代码片段、JSON 渲染、快捷属性、模板配置、文件生成、全局配置、一站代码、AI生成方案，极致降低开发者心智负担",
    },
    {
      icon: "📔",
      title: "规范工程化工作流",
      details: "配置 Eslint、Prettier、Husky、Commitlint、Lint-staged、Ls-lint 规范前端工程代码规范",
    },
    {
      icon: "🎨",
      title: "个性化主题配置",
      details: "提供多种布局方式切换，主题颜色配置，暗黑、灰色、色弱等模式",
    },
    {
      icon: "🔐",
      title: "项目权限管理",
      details: "提供菜单、路由及按钮的权限管理方案",
    },
    {
      icon: "🛠️",
      title: "丰富组件和hooks、utils",
      details: "提供丰富的组件、常用 Hooks、Utils 封装，在一定程度上节省你造轮子的时间",
    },
    {
      icon: "💡",
      title: "创新设计",
      details: "全局弹窗、全局按钮、全局字典、JSON模板，实现高内聚、低耦合，低码高效。",
    },
    {
      icon: "🔨",
      title: "工程移植性强",
      details: "高度统一灵活的配置，支持扩展、覆盖",
    },
  ];
  let str = `features:${N}`;
  str += features
    .map(item => {
      let { icon } = item;
      const { title, details, link = "", linkText } = item;
      if (icon.startsWith("/")) {
        icon = `
      src: ${icon}`;
      }
      let text = `  - icon: ${icon}
    title: ${title}
    details: ${details}
`;
      if (link && linkText) {
        text += `
    link: ${link}
    linkText: ${linkText}`;
      }
      return text;
    })
    .join("");
  return str;
}

/**
 * 生成首页文档
 * @advice 方法名建议 writeHomMdDoc
 * @returns
 */
export default () => {
  let topStr = `# https://vitepress.dev/reference/default-theme-home-page
layout: home # 可选值：doc, page, home, false。默认为 doc。为false时，没有任何侧边栏、导航栏或页脚（例：想要一个完全可自定义的登录页面）`;
  let heroStr = getHeroStr();
  let featuresStr = getFeaturesStr();
  const fileStr = `---
${topStr}
${heroStr}
${featuresStr}
---`;
  writeFileSync(path.join(process.cwd(), `${docsPath}/${indexName}`), fileStr);
};
