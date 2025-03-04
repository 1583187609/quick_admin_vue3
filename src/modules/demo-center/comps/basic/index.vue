<!-- 基础组件演示 -->
<template>
  <el-tabs tab-position="left" class="q-page-view">
    <el-tab-pane v-for="(item, key) in baseComps" :key="key">
      <template #label
        >{{ item.label }}<span class="color-danger" v-if="statusTextMap[item.status]">{{ statusTextMap[item.status] }}</span></template
      >
      <div class="name mb-o" v-if="item.name">
        {{ item.name }}<span class="color-danger" v-if="statusTextMap[item.status]">{{ statusTextMap[item.status] }}</span>
      </div>
      <div class="summary" v-if="item.summary">{{ item.summary }}</div>
      <ProduceComp :funcs="item.content.funcs" :link="item.content.link" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import ProduceComp from "./_components/ProduceComp.vue";

const statusTextMap = {
  wait: "【待完善】",
};

const baseComps: CommonObj[] = [
  {
    name: "BaseIcon",
    label: "图标",
    summary: "即：@element-plus/icons-vue 图标库。默认了图标大小、类型，用作占位，进行快速开发",
    content: {
      funcs: [{ text: "属性设置", children: ["name：图标名称", "size：图标大小", "to: 跳转链接，等价于 router.push(to)）"] }],
      link: "www.baidu.com",
    },
  },
  {
    name: "BaseBtn",
    label: "按钮",
    summary: "继承并扩展了el-button的属性，减少重复代码编写，提高开发效率",
    content: {
      funcs: [
        {
          text: "功能特性",
          children: [
            "属性全继承：继承 el-button 属性，所以可直接传入 el-button 的属性",
            "模板写法：传入tpl属性（非必须），例：tpl='add'，即可呈现新增按钮应该具备的属性（图标、样式等）",
            "危险按钮，二次确认：点击某些危险按钮（例：删除按钮）自带popconfirm确认提示框。popconfirm 可为布尔值、字符串、对象（同el-popconfirm的属性）",
            "权限处理：使用 auth 设置按钮权限。不设置、空数组视为始终有权限。无权限时，按钮会不可见。若要可见，且按钮禁用，则数组元素应为对象，设置type属性为disabled。",
            "排序属性：使用 order 设置多个按钮存在时的排列顺序值，数值越小越靠前。这在一组按钮中（查询列表的额外按钮组、表格的操作栏按钮组）会非常有用，避免开发时需要记忆按钮顺序。",
          ],
        },
      ],
      link: "www.baidu.com",
    },
  },
  { name: "BaseEmpty", label: "空状态", summary: "继承自el-empty，并精简了属性", content: { funcs: [], link: "www.baidu.com" } },
  {
    name: "BaseCopy",
    label: "文本复制",
    summary: "提供文本复制快捷方案。处理了点击区域、文本样式鼠标样式，用户体验（友好提示），减少开发心智负担",
    content: {
      funcs: [
        {
          text: "功能特性",
          children: ["支持仅复制、to跳转和复制、自定义click事件和复制。", "点击区域和文本区域鼠标样式会自动变化。", "设置maxLine，最多显示几行。"],
        },
      ],
      link: "www.baidu.com",
    },
  },
  {
    name: "BaseText",
    label: "文本显示",
    summary: "文本超出会自动省略，点击可以弹窗形式打开查看全部内容",
    content: { funcs: ["超过n行会自动出现省略号。出现省略号后可点击，默认以 dialog 展示全部内容。"], link: "www.baidu.com" },
  },
  {
    name: "BaseImg",
    label: "常规图片",
    summary: "继承自el-image属性，并完善了点击事件、跳转、预览等业务逻辑，还有样式处理。",
    content: {
      funcs: [
        {
          text: "功能特性",
          children: [
            "提供了加载中、加载失败图标状态，默认底图展示。图片预览功能、路由跳转功能。",
            "默认可以预览，但当存在to属性或onClick事件时，不能预览。",
          ],
        },
      ],
      link: "www.baidu.com",
    },
  },
  {
    label: "头像",
    name: "BaseAvatar",
    summary: "继承 BaseImg 的属性，并额外提供了gender（性别）属性。考虑扩展性（可能还有vip、状态标识），所以有必要将头像单独封装成一个组件",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "TagImg",
    label: "标签图片",
    summary: "继承 BaseImg 的属性，并额外提供了标签样式属性。",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseUpload",
    label: "文件上传",
    summary: "提供上传功能，并整合部分业务逻辑，暴露出配置项",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseTag",
    label: "字典标签",
    summary: "继承自el-tag，但同时加入了全局字典的解析，在字典翻译且标签展示的地方，特别快捷有效，例：表格列内容的展示",
    content: {
      funcs: [
        {
          text: "功能特性",
          children: [
            "设置name指定字典名称（为了增加变量名称辨识度，统一增加`D_`前缀），默认为D_EnableStatus。",
            "设置value指定字典的值。",
            "设置pureText，以纯文本展示。",
            "设置count，显示该状态下的徽章数值。",
          ],
        },
      ],
      link: "www.baidu.com",
    },
  },
  {
    name: "BaseTree",
    label: "树",
    summary: "对el-tree进一步处理，方便使用。提供了基础树、过滤树。",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    label: "富文本编辑器",
    summary: "提供富文本编辑器的解决方案。",
    name: "BaseEditor",
    content: { funcs: [], link: "www.baidu.com" },
  },
  { name: "BaseQrcode", label: "二维码", summary: "生成二维码", content: { funcs: [], link: "www.baidu.com" } },
  {
    name: "BaseAudio",
    label: "音频",
    status: "wait",
    summary: "提供音频逻辑方案，处理通用业务逻辑，并暴露相关api，支持覆盖",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseVideo",
    label: "视频",
    status: "wait",
    summary: "提供视频逻辑方案，处理通用业务逻辑，并暴露相关api，支持覆盖",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseNumberRange",
    label: "数字区间",
    summary: "提供选择数字区间的表单控件",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseNumber",
    label: "数字",
    status: "wait",
    summary: "已实现数字过渡自增动画效果。未来考虑加入千分位、升降变化等数字相关的处理。",
    content: { funcs: [], link: "www.baidu.com" },
  },
  {
    name: "BaseSection",
    label: "分块容器",
    summary: "提供内容分块的布局容器。用于表单字段分块、页面内容分块等场景。",
    content: { funcs: [], link: "www.baidu.com" },
  },
];
</script>
<style lang="scss" scoped>
.name {
  font-size: $font-size-heavyest;
  font-weight: bolder;
}
.summary {
  text-indent: 2em;
  margin: $gap 0 $gap-two;
}
</style>
