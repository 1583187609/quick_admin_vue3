---
# https://vitepress.dev/reference/default-theme-home-page
layout: home # 可选值：doc, page, home, false。默认为 doc。为false时，没有任何侧边栏、导航栏或页脚（例：想要一个完全可自定义的登录页面）

hero:
  name: "Quick Admin Vue3"
  text: "A VitePress Site"
  tagline: My great project tagline
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
    title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - icon:
      src: /logo.svg
    title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - icon:
      dark: /logo.svg
      light: /ico.svg
    title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /comp/basic/BaseIcon
    linkText: 了解更多
    # target?: string
    # rel?: string
---
