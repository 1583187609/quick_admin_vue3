---
# https://vitepress.dev/reference/default-theme-home-page
layout: home # 可选值：doc, page, home, false。默认为 doc。为false时，没有任何侧边栏、导航栏或页脚（例：想要一个完全可自定义的登录页面）

hero:
  name: "Quick Admin Vue3"
  text: 一个以“快”著称的后台管理系统
  tagline: 基于Vite+Vue3+ElementPlus+Pinia+TypeScript+Sass
  image:
    src: /logo.svg
    alt: VitePress
    width: 160px
  actions:
    - theme: brand
      text: 指南
      link: /guide/basic/安装
      # target?: string
      # rel?: string
    - theme: alt
      text: 组件
      link: /comp/basic/BaseIcon

features:
  - icon: 🛠️
    title: 设计理念
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /comp/basic/BaseIcon
    linkText: 了解更多
  - icon:
      src: /logo.svg
    title: 特性简介
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /comp/basic/BaseIcon
    linkText: 了解更多
  - icon:
      src: /logo.svg
    title: 低代码
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /comp/basic/BaseIcon
    linkText: 了解更多
  - icon:
      dark: /logo.svg
      light: /logo.svg
    title: 更多功能
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /comp/basic/BaseIcon
    linkText: 了解更多
    # target?: string
    # rel?: string
---
