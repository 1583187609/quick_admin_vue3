---
# https://vitepress.dev/reference/default-theme-home-page
layout: home # 可选值：doc, page, home, false。默认为 doc。为false时，没有任何侧边栏、导航栏或页脚（例：想要一个完全可自定义的登录页面）

hero:
  name: Quick Admin Vue3
  text: 一个快的后台管理系统
  tagline: Vite+Vue3+ElementPlus+Pinia+TypeScript+Sass
  image:
    src: /logo.svg
    alt: logo
    width: 160px
  actions: 
    - theme: brand
      text: 指南
      link: /guide/say/why
      # target?: string
      # rel?: string,
    - theme: alt
      text: 组件
      link: /comp/basic/BaseIcon
      # target?: string
      # rel?: string
features:
  - icon: 🛠️
    title: 设计理念
    details: 这是设计理念的描述
    link: /guide/say/why
    linkText: 了解更多
  - icon: 
      src: /logo.svg
    title: 特性简介
    details: 这是特性简介的描述
    link: /guide/say/why
    linkText: 了解更多
  - icon: 
      src: /logo.svg
    title: 低代码
    details: 这是低代码的描述
    link: /guide/say/why
    linkText: 了解更多
  - icon: 
      src: /logo.svg
    title: 更多功能
    details: 这是更多功能的描述
    link: /guide/say/why
    linkText: 了解更多

---