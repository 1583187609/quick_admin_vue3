<!-- 其他功能清单 -->
<template>
  <div class="q-page-view f-sb-s">
    <div class="f-1 f-fs-s-c">
      <div class="h1">已完善功能</div>
      <div class="color-danger mb-o f-0">注：选中的为已完善功能；未选中的为待完善内容。</div>
      <BaseTree
        class="f-1"
        :data="finishTreeData"
        show-checkbox
        :default-checked-keys="['baseComp', 'mockFun', 'pageCache', 'routeType', 'menuTo', 'sysFun', 'userFeel']"
        default-expand-all
      />
    </div>
    <div class="f-1 f-fs-s-c">
      <div class="h1">计划中功能</div>
      <div class="color-danger mb-o f-0">注：选中的为部分开发；未选中的为暂未开发</div>
      <BaseTree class="f-1" :data="planTreeData" show-checkbox :default-checked-keys="[]" default-expand-all />
    </div>
    <div class="f-1 f-fs-s-c">
      <div class="h1">快捷开发功能</div>
      <div class="color-danger mb-o f-0">注：选中的为已完善功能；未选中的为待完善内容。</div>
      <BaseTree
        class="f-1"
        :data="quickTreeData"
        show-checkbox
        :default-checked-keys="['projectAgain', 'quickDevTool', 'lowCode', 'innovation']"
        default-expand-all
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const finishTreeData = [
  {
    value: "baseComp",
    label: "基础组件",
    children: [
      { value: "baseComp-1", label: "图标", name: "BaseIcon" },
      { value: "baseComp-2", label: "按钮", name: "BaseBtn" },
      { value: "baseComp-3", label: "空状态", name: "BaseEmpty" },
      { value: "baseComp-4", label: "文本复制", name: "BaseCopy" },
      { value: "baseComp-5", label: "文本显示（自动省略）", name: "BaseText" },
      { value: "baseComp-6", label: "常规图片", name: "BaseImg" },
      { value: "baseComp-7", label: "头像", name: "BaseAvatar" },
      { value: "baseComp-8", label: "标签图片", name: "TagImg" },
      { value: "baseComp-9", label: "文件上传", name: "BaseUpload" },
      {
        value: "baseComp-10",
        label: "字典标签",
        name: "BaseTag",
        desc: "继承自el-tag，但同时加入了全局字典的解析，在字典翻译且标签展示的地方，特别快捷有效，例：表格列内容的展示",
      },
      { value: "baseComp-11", label: "树", name: "BaseTree" },
      { value: "baseComp-12", label: "富文本编辑器", name: "BaseEditor" },
      { value: "baseComp-13", label: "二维码", name: "BaseQrcode" },
      { value: "baseComp-16", label: "数字区间", name: "BaseNumberRange" },
      { value: "baseComp-17", label: "动态数字", name: "BaseNumber" },
      { value: "baseComp-18", label: "分块容器", name: "BaseSection" },
      {
        value: "baseComp-19",
        label: "表单",
        children: [
          { value: "baseComp-19-1", label: "基础表单" },
          { value: "baseComp-19-1", label: "分块表单" },
          { value: "baseComp-19-1", label: "步骤表单", disabled: true },
        ],
      },
      {
        value: "baseComp-20",
        label: "表格",
        children: [
          { value: "baseComp-20-1", label: "基础表格" },
          { value: "baseComp-20-1", label: "表单表格", disabled: true },
        ],
      },
      { value: "baseComp-31", label: "视频", name: "BaseAudio", disabled: true },
      { value: "baseComp-32", label: "音频", name: "BaseVideo", disabled: true },
    ],
  },
  {
    value: "mockFun",
    label: "Mock功能",
    desc: "含增、删、改、查、导入、导出及批量处理等操作",
    children: [
      { value: "mockFun-1", label: "新增（单个/批量）" },
      { value: "mockFun-2", label: "删除（单个/批量）" },
      { value: "mockFun-3", label: "修改（单个/批量）" },
      { value: "mockFun-4", label: "查询（详情/列表)" },
      { value: "mockFun-5", label: "导入" },
      { value: "mockFun-6", label: "导出" },
    ],
  },
  {
    value: "pageCache",
    label: "页面缓存",
    children: [
      { value: "pageCache-1", label: "多级路由缓存" },
      { value: "pageCache-2", label: "同组件不同id缓存" },
    ],
  },
  {
    value: "routeType",
    label: "路由类型",
    children: [
      { value: "routeType-1", label: "静态路由" },
      { value: "routeType-2", label: "动态路由" },
      { value: "routeType-3", label: "自动路由" },
    ],
  },
  {
    value: "menuTo",
    label: "菜单跳转",
    children: [
      { value: "menuTo-1", label: "内部链接", desc: "网站内部跳转" },
      {
        value: "menuTo-2",
        label: "外部链接",
        desc: "跳转到网站外部",
        children: [
          { value: "menuTo-2-1", label: "新窗口打开" },
          { value: "menuTo-2-2", label: "iframe打开" },
        ],
      },
    ],
  },
  {
    value: "sysFun",
    label: "系统功能",
    children: [
      { value: "sysFun-1", label: "登录/登出" },
      { value: "sysFun-2", label: "权限管理" },
      { value: "sysFun-3", label: "权限验证（页面、接口）" },
      { value: "sysFun-4", label: "角色管理" },
      { value: "sysFun-5", label: "用户管理" },
      { value: "sysFun-6", label: "主题换肤" },
      { value: "sysFun-7", label: "页面布局" },
      { value: "sysFun-10", label: "国际化" },
      { value: "sysFun-11", label: "水印" },
      { value: "sysFun-12", label: "全屏显示" },
      { value: "sysFun-13", label: "菜单搜索" },
      {
        value: "sysFun-14",
        label: "页签栏",
        children: [
          { value: "sysFun-14-1", label: "页面刷新" },
          { value: "sysFun-14-2", label: "关闭页签（左侧/右侧/其他/除自身外所有）" },
        ],
      },
      { value: "sysFun-15", label: "新用户引导" },
      { value: "sysFun-16", label: "性能监控", disabled: true },
      { value: "sysFun-17", label: "异常监控", disabled: true },
      //   { value: "sysFun-25", label: "页面离开提醒", disabled: true },
      //   { value: "sysFun-26", label: "扩展图标", disabled: true },
      //   { value: "sysFun-27", label: "版本更新监视", disabled: true },
    ],
  },
  {
    value: "userFeel",
    label: "用户体验细节",
    children: [
      { value: "userFeel-1", label: "表格高度自适应（分页固定在底部）" },
      { value: "userFeel-2", label: "表单高度自适应（按钮固定在底部）" },
    ],
  },
];
const planTreeData = [
  {
    value: "dynamicNav",
    label: "动态导航",
    children: [
      { value: "dynamicNav-1", label: "数字徽章" },
      { value: "dynamicNav-2", label: "圆点徽章" },
      { value: "dynamicNav-3", label: "文字标签" },
    ],
  },
  {
    value: "sceneFun",
    label: "场景功能",
    children: [
      { value: "sceneFun-1", label: "图片裁剪" },
      { value: "sceneFun-2", label: "文件预览", desc: "支持pdf、word等文档的预览" },
      //   { value: "sceneFun-3", label: "" },
      //   { value: "sceneFun-4", label: "" },
      //   { value: "sceneFun-5", label: "" },
    ],
  },
];
const quickTreeData = [
  {
    value: "innovation",
    label: "创新点（显著提升后管开发效率40%以上）",
    children: [
      { value: "innovation-1", label: "全局弹窗", desc: "支持dialog，drawer" },
      { value: "innovation-2", label: "全局按钮" },
      { value: "innovation-3", label: "全局字典" },
      {
        value: "innovation-10",
        label: "全局模板（局部可覆盖模板中配置的属性）",
        children: [
          { value: "innovation-10-1", label: "字典模板" },
          { value: "innovation-10-2", label: "按钮模板" },
          { value: "innovation-10-3", label: "表单项模板" },
          { value: "innovation-10-4", label: "表格列模板" },
        ],
      },
    ],
  },
  {
    value: "projectAgain",
    label: "工程移植性",
    children: [
      { value: "projectAgain-1", label: "通用scss变量（简洁易记）" },
      { value: "projectAgain-2", label: "核心代码包提取" },
      { value: "projectAgain-3", label: "全局配置（局部可覆盖）" },
    ],
  },
  {
    value: "quickDevTool",
    label: "快捷工具",
    children: [
      { value: "quickDevTool-1", label: "弹性布局基础类", desc: "一款布局神器，能够提升静态页面开发效率约30%" },
      { value: "quickDevTool-2", label: "生成api文件", desc: "基于Yapi/Eolink，用Node写的生成api文件脚本" },
      //   { value: "quickDevTool-3", label: ""  },
      //   { value: "quickDevTool-4", label: ""  },
      //   { value: "quickDevTool-5", label: ""  },
    ],
  },
  {
    value: "lowCode",
    label: "低码方案（渐进式）",
    children: [
      { value: "lowCode-1", label: "代码片段", desc: "配置 VsCode 的代码片段，例，表单、表格、增删改查……" },
      { value: "lowCode-2", label: "JSON 渲染", desc: "通过 JSON 渲染生成 DOM" },
      { value: "lowCode-3", label: "快捷属性", desc: "简化 JSON" },
      { value: "lowCode-4", label: "模板配置", desc: "提供 JSON 的模板规则，少写代码" },
      { value: "lowCode-5", label: "全局配置（高度统一，方便开发、维护、迭代）", desc: "提升了工程移植性，支持工程差异化配置" },
      { value: "lowCode-6", label: "Node生成", desc: "通过 Node 生成 vue 文件（提供了配置字段、配置简化 JSON 两种方案）" },
      { value: "lowCode-7", label: "一站代码", desc: "通过 Node，一次性生成数据库、前端、后端代码", disabled: true },
      { value: "lowCode-8", label: "AI 生成", desc: "接入 ai 生成相应代码", disabled: true },
    ],
  },
];
</script>
<style lang="scss" scoped>
.h1 {
  font-size: $font-size-heavyest;
  font-weight: bolder;
  margin-bottom: $gap;
}
.base-tree {
  height: 100%;
  overflow: auto;
}
</style>
