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
      // { text: "测试", link: getPartFirstPathByName("test") },
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
  const pathStr = getPartFirstPathByName();
  const features = [
    {
      icon: "🛠️",
      title: "设计理念",
      details: "这是设计理念的描述",
      link: pathStr,
      linkText: "了解更多",
    },
    {
      icon: "/logo.svg",
      title: "特性简介",
      details: "这是特性简介的描述",
      link: pathStr,
      linkText: "了解更多",
    },
    {
      icon: "/logo.svg",
      title: "低代码",
      details: "这是低代码的描述",
      link: pathStr,
      linkText: "了解更多",
    },
    {
      icon: "/logo.svg",
      title: "更多功能",
      details: "这是更多功能的描述",
      link: pathStr,
      linkText: "了解更多",
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
      return `  - icon: ${icon}
    title: ${title}
    details: ${details}
    link: ${link}
    linkText: ${linkText}
`;
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
