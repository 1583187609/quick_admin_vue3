<template>
  <div class="the-head">
    <div class="header f-sb-c" :class="setStore.layout.type === 'vertical' ? 'light' : 'dark'">
      <!-- 标题栏 -->
      <h1 class="h1 f-c-c" @click="router.push({ name: 'home' })" v-if="setStore.layout.type === 'horizontal'">
        <BaseImg :src="logoImg" size="30" :preview="false" />
        <div class="ml-h line-2">{{ menuStore.isCollapse ? VITE_APP_NAME?.slice(0, 1) : VITE_APP_NAME }}</div>
      </h1>
      <!-- 折叠按钮 -->
      <BaseIcon
        id="collapse-icon"
        @click="menuStore.isCollapse = !menuStore.isCollapse"
        class="f-0 fold-btn"
        :class="setStore.layout.type === 'vertical' ? 'dark' : 'light'"
        size="1.5em"
        :name="menuStore.isCollapse ? 'Expand' : 'Fold'"
      />
      <!-- 导航菜单 -->
      <SideMenu :menus="menuStore.allMenus" mode="horizontal" class="f-1 menu-nav" v-if="setStore.layout.type === 'horizontal'" />
      <template v-else>
        <PathBreadcrumb class="ml-o" v-if="setStore.breadcrumb.show" />
      </template>
      <!-- 快捷入口 -->
      <div class="quick-entry f-0 ml-a">
        <el-tooltip v-bind="tooltipAttrs" :content="$t('layout.header.entryIcons.searchMenu')">
          <el-button id="search-menu" @click="openSearchMenu" :icon="Search" type="primary" class="item" plain circle></el-button>
        </el-tooltip>
        <el-popover placement="bottom" :width="310" trigger="click">
          <template #reference>
            <el-badge :value="5" :max="99" :show-zero="false">
              <el-tooltip v-bind="tooltipAttrs" :content="$t('layout.header.entryIcons.notification')">
                <el-button id="notice-entry" :icon="Bell" type="primary" class="item" plain circle></el-button>
              </el-tooltip>
            </el-badge>
          </template>
          <Notices />
        </el-popover>
        <el-tooltip
          v-bind="tooltipAttrs"
          :content="$t(`layout.header.entryIcons.${isFull ? 'hide' : 'show'}FullScreen`)"
          v-if="screenfull.isEnabled"
        >
          <el-button
            id="fullscreen"
            @click="toggleFullscreen"
            :icon="isFull ? Aim : FullScreen"
            type="primary"
            class="item"
            plain
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <!-- 用户信息 -->
      <div id="user-simple-info" class="user-info f-0 f-fe-c">
        <div class="mr-h">
          <div class="line-1 nickname">{{ user?.name }}</div>
          <div class="version">{{ pkg.version }}</div>
        </div>
        <el-dropdown ref="dropdownRef">
          <span class="el-dropdown-link">
            <BaseAvatar :src="user?.avatar" size="40" :preview="false" round />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button @click="openPersonalInfo" style="width: 100%" :icon="User" type="info" link>
                  {{ $t("layout.header.dropdown.myInfo") }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button @click="handleReloadView" style="width: 100%" :icon="Refresh" type="info" link>
                  {{ $t("layout.header.dropdown.refreshSys") }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  id="system-set"
                  @click="openPopup({ title: $t('layout.header.dropdown.sysSet'), closeOnClickModal: true }, SystemSet, 'drawer')"
                  style="width: 100%"
                  :icon="Setting"
                  type="info"
                  link
                  >{{ $t("layout.header.dropdown.sysSet") }}</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  @click="openPopup($t('layout.header.dropdown.aboutSys'), SystemInfo, 'drawer')"
                  style="width: 100%"
                  :icon="InfoFilled"
                  type="info"
                  link
                  >{{ $t("layout.header.dropdown.aboutSys") }}</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button @click="onLoginOut" style="width: 100%" :icon="SwitchButton" type="primary" link>
                  {{ $t("layout.header.dropdown.logout") }}
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="f-fs-c breadcrumb-box" v-if="setStore.layout.type === 'horizontal' && setStore.breadcrumb.show">
      <PathBreadcrumb />
    </div>
    <PageTags v-if="setStore.pageTags.show" />
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted, nextTick, h} from "vue";
import { SwitchButton, User, InfoFilled, Setting, Search, FullScreen, Aim, Bell, Refresh } from "@element-plus/icons-vue";
import SideMenu from "@/layout/_components/SideMenu/Index.vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import PageTags from "./_components/PageTags/Index.vue";
import pkg from "#/package.json";
import { getUserInfo, showMessage, storage } from "@/utils";
import UserInfo from "./_components/UserInfo.vue";
import Notices from "./_components/Notices.vue";
import SystemSet from "./_components/SystemSet/index.vue";
import SystemInfo from "./_components/SystemInfo.vue";
import SearchMenu from "./_components/SearchMenu.vue";
import PathBreadcrumb from "./_components/PathBreadcrumb.vue";
import { useSetStore } from "@/store";
import screenfull from "screenfull";
import logoImg from "@/assets/images/logo.png";
import { useMenuStore, useUserStore } from "@/store";
import { driver } from "driver.js";
import { useI18n } from "vue-i18n";
import "driver.js/dist/driver.css";

const { tm: $t } = useI18n();
const { VITE_APP_NAME } = import.meta.env;
const menuStore = useMenuStore();
const userStore = useUserStore();
const setStore = useSetStore();
const dropdownRef = ref<any>(null);
const openPopup: any = inject("openPopup");
const reloadView = inject<any>("reloadView");
const user = getUserInfo();
const router = useRouter();
const tooltipAttrs = {
  showAfter: 200,
  offset: 6,
};
async function handleReloadView() {
  // reloadView();
  router.go(0);
  showMessage("刷新系统成功");
}

const isFull = ref(screenfull.isFullscreen);
onMounted(() => {
  nextTick(() => {
    screenfull.on("change", () => {
      isFull.value = screenfull.isFullscreen;
    });
    setTimeout(() => {
      startGuide();
    }, 50);
  });
});
//切换全屏
function toggleFullscreen() {
  if (!screenfull.isEnabled) showMessage("您的浏览器不支持全屏功能", "warning");
  screenfull.toggle();
}

function openPersonalInfo() {
  openPopup($t("layout.header.dropdown.myInfo"), h(UserInfo, { data: user }), "drawer");
}
//退出登录
function onLoginOut() {
  ElMessageBox.confirm("确定退出登录吗？", { type: "warning" })
    .then(() => userStore.handleLoginOut())
    .catch(() => {});
}
//打开搜索菜单弹窗
function openSearchMenu() {
  openPopup({ title: "搜索菜单", closeOnClickModal: true }, SearchMenu, "dialog", false);
}
/**
 * 开始操作引导
 * @link driver参考链接：https://www.jianshu.com/p/71b0c145cad7
 */
function startGuide() {
  if (storage.getItem("hasGuide")) return;
  const driverObj = driver({
    popoverClass: "guide-popover-card",
    allowClose: true,
    stagePadding: 4,
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "知道了",
    //点击右上角的关闭按钮
    onDeselected(ele) {
      storage.setItem("hasGuide", true);
    },
    onHighlighted(ele) {
      if (ele!.id === "user-simple-info") dropdownRef.value.handleOpen();
    },
    onNextClick(ele, next) {
      driverObj.moveNext();
      if (ele!.id === "system-set") {
        dropdownRef.value.handleClose();
        storage.setItem("hasGuide", true);
      }
    },
    steps: [
      {
        element: "#collapse-icon",
        popover: {
          title: "折叠按钮",
          description: "展开或收起左侧或顶部菜单",
          side: "right",
        },
      },
      {
        element: "#breadcrumb",
        popover: {
          title: "面包屑路径",
          description: "指明当前页面所处位置",
          side: "right",
        },
      },
      {
        element: "#search-menu",
        popover: {
          title: "菜单搜索",
          description: "在这里可以搜索全局菜单",
          side: "left",
        },
      },
      {
        element: "#notice-entry",
        popover: {
          title: "消息通知",
          description: "在这里可以快速查看最新通知消息、待办任务等",
          side: "left",
        },
      },
      {
        element: "#fullscreen",
        popover: {
          title: "全屏展示",
          description: "在这里可以切换是否全屏展示",
          side: "left",
        },
      },
      {
        element: "#user-simple-info",
        popover: {
          title: "用户信息",
          description: "这是用户的基本信息，鼠标放上来可以查看更多",
          side: "left",
        },
      },
      {
        element: "#system-set",
        popover: {
          title: "系统设置",
          description: "在这里可以进行系统相关的设置",
          side: "left",
        },
      },
    ],
  });
  driverObj.drive();
}
</script>
<style lang="scss" scoped>
.el-menu--horizontal {
  border-bottom: none;
}
.header {
  color: $nav-text-color-light;
  font-size: 16px;
  height: $header-height;
  &.dark {
    background: $nav-bg-dark;
  }
  &.light {
    background: $nav-bg-light;
  }
  .fold-btn {
    cursor: pointer;
    margin-left: $gap;
    &.dark {
      color: $color-text-heavy;
    }
    &.light {
    }
    &:hover {
      color: $color-primary;
    }
  }
}
.h1 {
  cursor: pointer;
  padding: 0 $gap;
  font-size: normal;
  font-size: $font-size-heavyer;
}
.menu-nav {
  max-width: calc(100vw - 340px);
  height: 100%;
}
.quick-entry {
  :deep(.el-badge) {
    .el-badge__content.is-fixed {
      top: 4px;
    }
  }
  .item {
    margin-left: $gap;
  }
}
.user-info {
  margin-left: $gap-two;
  margin-right: $gap;
  .nickname {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2px;
  }
  .version {
    color: $color-primary;
    padding: 0 $gap-qtr;
    font-size: 12px;
    background: $color-bg-main;
    text-align: center;
    border-radius: $radius-lighter;
    width: fit-content;
    margin-left: auto;
  }
}
.breadcrumb-box {
  height: $gap-two;
  padding: 0 $gap-qtr;
}
</style>
