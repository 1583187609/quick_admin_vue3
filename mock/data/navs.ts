import { MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import Mock from "mockjs";
import { getHostPath } from "../utils";
const { Random } = Mock;

export default [
  {
    id: "1",
    label: "统计数据",
    icon: "Histogram",
    path: "/statistics",
    type: 0,
    auth_codes: null,
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "1-1",
        label: "数据概览",
        icon: "DataAnalysis",
        path: "/statistics/home",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/statistics/home/index.vue",
      },
      {
        id: "1-2",
        label: "大屏数据",
        icon: "DataBoard",
        path: "/statistics/big_screen",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/statistics/big-screen/index.vue",
      },
      {
        id: "1-3",
        label: "统计分析",
        icon: "DataLine",
        path: "/statistics/analyze",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/statistics/analyze/index.vue",
      },
    ],
  },
  {
    id: "2",
    label: "薪酬管理",
    icon: "Ticket",
    path: "/salary",
    type: 0,
    auth_codes: null,
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "2-1",
        label: "薪酬模板",
        icon: "Document",
        path: "/salary/template",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/salary/template/index.vue",
      },
      {
        id: "2-2",
        label: "薪酬配置",
        icon: "Money",
        path: "/salary/config",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/salary/config/index.vue",
      },
    ],
  },
  {
    id: "3",
    label: "系统管理",
    icon: "Tools",
    path: "system",
    type: 0,
    auth_codes: [0, 1, 4, 5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "3-1",
        label: "用户管理",
        icon: "UserFilled",
        path: "/system/user",
        type: 0,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        children: [
          {
            id: "3-1-1",
            label: "账号管理",
            icon: "User",
            path: "/system/user/account",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 0,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "/system/user/account/index.vue",
          },
          {
            id: "3-1-2",
            label: "账号管理-详情",
            icon: "Postcard",
            path: "/system/user/detail",
            type: 2,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 0,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "/system/user/detail/index.vue",
          },
        ],
      },
      {
        id: "3-2",
        label: "部门管理",
        icon: "Management",
        path: "/system/department",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/department/index.vue",
      },
      {
        id: "3-3",
        label: "菜单管理",
        icon: "Menu",
        path: "/system/menu",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/menu/index.vue",
      },
      {
        id: "3-4",
        label: "角色管理",
        icon: "Avatar",
        path: "/system/role",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/role/index.vue",
      },
      {
        id: "3-5",
        label: "字典管理",
        icon: "WalletFilled",
        path: "/system/dictionary",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/dictionary/index.vue",
      },
      {
        id: "3-6",
        label: "定时任务",
        icon: "BrushFilled",
        path: "/system/schedule",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/schedule/index.vue",
      },
      {
        id: "3-7",
        label: "系统日志",
        icon: "List",
        path: "/system/log",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/system/log/index.vue",
      },
    ],
  },
  {
    id: "40",
    label: "应用示例",
    icon: "HelpFilled",
    path: "demo",
    type: 0,
    auth_codes: [5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "40-1",
        label: "BaseForm",
        icon: "Position",
        path: "/demo/1",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/one/index.vue",
      },
      {
        id: "40-2",
        label: "SectionForm",
        icon: "Position",
        path: "/demo/2",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/two/index.vue",
      },
      {
        id: "40-3",
        label: "BaseCrud",
        icon: "Position",
        path: "/demo/3",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/three/index.vue",
      },
      {
        id: "40-4",
        label: "BaseForm(tabs)",
        icon: "Position",
        path: "/demo/4",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/four/index.vue",
      },
      {
        id: "40-5",
        label: "Chart",
        icon: "Position",
        path: "/demo/5",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/five/index.vue",
      },
      {
        id: "40-6",
        label: "示例6",
        icon: "Position",
        path: "/demo/6",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/six/index.vue",
      },
      {
        id: "40-7",
        label: "示例7",
        icon: "Position",
        path: "/demo/7",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/demo/seven/index.vue",
      },
    ],
  },
  {
    id: "41",
    label: "测试专用",
    icon: "Flag",
    path: "test",
    type: 0,
    auth_codes: [0, 1, 5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "41-1",
        label: "BaseForm",
        icon: "Position",
        path: "/test/1",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-1/index.vue",
      },
      {
        id: "41-2",
        label: "SectionForm",
        icon: "Position",
        path: "/test/2",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-2/index.vue",
      },
      {
        id: "41-3",
        label: "BaseCrud",
        icon: "Position",
        path: "/test/3",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-3/index.vue",
      },
      {
        id: "41-4",
        label: "富文本编辑器",
        icon: "Position",
        path: "/test/4",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-4/index.vue",
      },
      {
        id: "41-5",
        label: "Echarts图表",
        icon: "Position",
        path: "/test/5",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-5/index.vue",
      },
      {
        id: "41-6",
        label: "生成表单",
        icon: "Position",
        path: "/test/6",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-6/index.vue",
      },
      {
        id: "41-7",
        label: "测试7",
        icon: "Position",
        path: "/test/7",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-7/index.vue",
      },
      {
        id: "41-8",
        label: "测试8",
        icon: "Position",
        path: "/test/8",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-8/index.vue",
      },
      {
        id: "41-9",
        label: "测试9",
        icon: "Position",
        path: "/test/9",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-9/index.vue",
      },
      {
        id: "41-10",
        label: "测试10",
        icon: "Position",
        path: "/test/10",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/test/test-10/index.vue",
      },
    ],
  },
  {
    id: "43",
    label: "特效演示",
    icon: "Opportunity",
    path: "vfx",
    type: 0,
    auth_codes: [5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "43-1",
        label: "扁平按钮",
        icon: "Position",
        path: "/vfx/flat-btn",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/vfx/flat-btn/index.vue",
      },
    ],
  },
  {
    id: "44",
    label: "代码生成",
    icon: "SwitchFilled",
    path: "code",
    type: 0,
    auth_codes: [0, 5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "44-1",
        label: "可视化生成",
        icon: "Position",
        path: "/code/visualization",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/code/visualization/index.vue",
      },
      {
        id: "44-2",
        label: "配置JSON生成",
        icon: "Position",
        path: "/code/json",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/code/json/index.vue",
      },
    ],
  },
  {
    id: "45",
    label: "开发分析",
    icon: "Opportunity",
    path: "monitor",
    type: 0,
    auth_codes: [0, 5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "45-1",
        label: "开发页面&组件统计",
        icon: "Position",
        path: "/monitor/statistics",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 0,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "/monitor/statistics/index.vue",
      },
      {
        id: "45-2",
        label: "文件体积分析(内链)",
        icon: "Position",
        path: `${getHostPath()}/stats.html`,
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 1,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "",
      },
      {
        id: "45-3",
        label: "文件体积分析(外链)",
        icon: "Position",
        path: `${getHostPath()}/stats.html?outer`,
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 2,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        component: "",
      },
    ],
  },
  {
    id: "60",
    label: "资料链接",
    icon: "Link",
    path: "link",
    type: 0,
    auth_codes: [0, 5],
    status: 1,
    is_cache: 1,
    link_type: 0,
    create_time: Random.datetime(),
    update_time: Random.datetime(),
    children: [
      {
        id: "60-1",
        label: "教程文档",
        icon: "Position",
        path: "/link/document",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 2,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        children: [
          {
            id: "60-1-1",
            label: "爬虫文档集",
            icon: "",
            path: "https://flc.nsusn.com/tutorial",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-1-2",
            label: "弹性布局基础类",
            icon: "",
            path: "http://fanlichuan.gitee.io/produce/flex-layout/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 1,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
        ],
      },
      {
        id: "60-2",
        label: "仓库地址",
        icon: "Position",
        path: "/link/warehouse",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 2,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        children: [
          {
            id: "60-2-1",
            label: "Quick-Admin-Vue3",
            icon: "",
            path: "https://gitee.com/fanlichuan/management/tree/master/quick-admin-vue3",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-2-2",
            label: "Quick-Admin-React18",
            icon: "",
            path: "https://gitee.com/fanlichuan/management/tree/master/quick-admin-react18",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-2-3",
            label: "API文件生成脚本",
            icon: "",
            path: "https://gitee.com/fanlichuan/create-apis-files",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-2-4",
            label: "个人经验笔记",
            icon: "",
            path: "https://gitee.com/fanlichuan/tools/tree/master/common",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
        ],
      },
      {
        id: "60-3",
        label: "掘金文章",
        icon: "Position",
        path: "/link/juejin",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 2,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        children: [
          {
            id: "60-3-1",
            label: "前端的23种设计模式",
            icon: "",
            path: "https://juejin.cn/post/7072175210874535967",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-3-2",
            label: "TypeScript 基础",
            icon: "",
            path: "/link/juejin/ts",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            children: [
              {
                id: "60-3-2-1",
                label: "基础（一）",
                icon: "",
                path: "https://juejin.cn/post/7102384712504573982",
                type: 1,
                auth_codes: null,
                status: 1,
                is_cache: 1,
                link_type: 2,
                create_time: Random.datetime(),
                update_time: Random.datetime(),
                component: "",
              },
              {
                id: "60-3-2-2",
                label: "基础（二）",
                icon: "",
                path: "https://juejin.cn/post/7102996554541170696",
                type: 1,
                auth_codes: null,
                status: 1,
                is_cache: 1,
                link_type: 2,
                create_time: Random.datetime(),
                update_time: Random.datetime(),
                component: "",
              },
            ],
          },
        ],
      },
      {
        id: "60-4",
        label: "作品（在线预览）",
        icon: "Position",
        path: "/link/works",
        type: 1,
        auth_codes: null,
        status: 1,
        is_cache: 1,
        link_type: 2,
        create_time: Random.datetime(),
        update_time: Random.datetime(),
        children: [
          {
            id: "60-4-1",
            label: "多功能表格（复杂）",
            icon: "",
            path: "https://fanlichuan.gitee.io/works/dragable-table/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-4-2",
            label: "恐龙沙漠逃亡小游戏",
            icon: "",
            path: "https://fanlichuan.gitee.io/works/dinosaur_game/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-4-3",
            label: "中国象棋游戏",
            icon: "",
            path: "https://fanlichuan.gitee.io/works/chinese_chess/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-4-4",
            label: "唯美音乐播放器",
            icon: "",
            path: "https://fanlichuan.gitee.io/works/pc_music_player/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
          {
            id: "60-4-5",
            label: "五子棋游戏",
            icon: "",
            path: "https://fanlichuan.gitee.io/works/five_in_a_row_game/index.html",
            type: 1,
            auth_codes: null,
            status: 1,
            is_cache: 1,
            link_type: 2,
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            component: "",
          },
        ],
      },
    ],
  },
] as MenusItem[];
