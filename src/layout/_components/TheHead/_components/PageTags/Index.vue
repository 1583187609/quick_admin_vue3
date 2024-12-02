<template>
  <div class="page-tags f-fs-c">
    <PageTagItem
      class="f-0 ml-h"
      icon="House"
      :path="defaultHomePath"
      :active="currTagInd === -1"
      :closable="false"
      @close="onMenuItem('closeIndex', -1)"
      @click="onTagItem(homeTag, -1)"
      @contextmenu="onContextmenu($event, -1)"
    >
      {{ $t("layout.pageTags.home") }}
    </PageTagItem>
    <button @click="onArrowBtn(-1)" class="btn f-c-c f-0" :class="{ disabled: leftDisabled }" :disabled="leftDisabled">
      <el-icon size="18">
        <DArrowLeft />
      </el-icon>
    </button>
    <div class="tags-box f-fs-c f-1">
      <Draggable
        v-model="tags"
        animation="300"
        @start="draging = true"
        @end="draging = false"
        @update="onUpdate"
        @mousewheel.passive="handleWheelDelta"
        item-key="path"
        class="f-1 scroll all-hide-scroll"
        ref="scrollRef"
      >
        <template #item="{ element, index }">
          <PageTagItem
            :icon="setStore.pageTags.showIcon ? element.icon : undefined"
            :path="element.path"
            :active="currTagInd === index"
            @close="onMenuItem('closeIndex', index)"
            @click="onTagItem(element, index)"
            @contextmenu="onContextmenu($event, index)"
          >
            {{ element.text }}
          </PageTagItem>
        </template>
      </Draggable>
      <DropMenu class="f-0" :currInd="contMenuInd" :total="tags.length" :data="bcrInfo" @menuItem="onMenuItem"></DropMenu>
    </div>
    <button @click="onArrowBtn(1)" class="btn f-c-c f-0" :class="{ disabled: rightDisabled }" :disabled="rightDisabled">
      <el-icon size="18">
        <DArrowRight />
      </el-icon>
    </button>
  </div>
</template>
<script lang="ts" setup>
// 实现平滑滚动参考博客：https://blog.csdn.net/qq_41999592/article/details/113842602
// vuedraggable博客：https://blog.csdn.net/zjiang1994/article/details/79809687
//获取dom（含v-for中的dom元素）元素参考：https://devpress.csdn.net/viewdesign/643fa7f8986c660f3cf94e6d.html
//动态清除keep-alive的缓存：https://juejin.cn/post/6844903649517240328

import { ref, watch, onMounted, nextTick, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import Draggable from "vuedraggable";
import PageTagItem from "./PageTagItem.vue";
import { PageTagItemType, MenuItemType } from "./DropMenu.vue";
import DropMenu from "./DropMenu.vue";
import { storage, copyText, showMessage } from "@/utils";
import { CommonObj } from "@/core/_types";
import { useEvent } from "@/hooks";
import { defaultHomePath } from "@/utils";
import { useKeepAliveStore, useSetStore } from "@/store";
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";

const keepAliveStore = useKeepAliveStore();
const setStore = useSetStore();
const reloadView: any = inject("reloadView");
const homeTag = { text: "首页", path: defaultHomePath } as PageTagItemType;
const route = useRoute();
const router = useRouter();
const draging = ref(false); //是否在拖动中
const leftDisabled = ref(true);
const rightDisabled = ref(true);
const currTagInd = ref<number>(-1);
const contMenuInd = ref<number>(-1);
const tags = ref<PageTagItemType[]>(storage.getItem("pageTags") || []); //tempTags
const scrollRef = ref<any>(null);
const bcrInfo = ref({});
useEvent("resize", initDisabled);
watch(
  route,
  (newVal: any) => {
    const { fullPath, query, path } = newVal;
    const { title, tagIdKey = "id", icon, linkType } = newVal.meta;
    const compName = newVal.matched.at(-1)?.components?.default.name;
    addToRoutes({
      text: title,
      path: fullPath,
      id: query[tagIdKey],
      name: compName,
      icon,
    });
    activeTagScrollToCenter(fullPath);
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  initDisabled();
  //刷新或关闭页面前保存缓存数据，解决因为刷新导致VueX数据丢失的问题
  window.addEventListener("beforeunload", () => {
    storage.setItem("pageTags", tags.value);
  });
});
function getCurrTagInd(contInd: number) {
  const len = tags.value.length;
  let currInd = currTagInd.value;
  if (len === 0) {
    currInd = -1;
  } else {
    if (contInd < currInd) {
      currInd = currInd - 1;
    }
  }
  if (currInd < -1) {
    currInd = -1;
  } else if (currInd > len - 1) {
    currInd = len - 1;
  }
  currTagInd.value = currInd;
  router.push(currInd === -1 ? defaultHomePath : tags.value[currInd].path);
}
function onMenuItem(type: MenuItemType, ind: number) {
  if (type === "closeIndex") {
    tags.value.splice(ind, 1);
  } else if (type === "closeOthers") {
    tags.value = contMenuInd.value === -1 ? [] : tags.value.slice(ind, ind + 1);
  } else if (type === "closeRight") {
    tags.value = tags.value.slice(0, ind + 1);
  } else if (type === "closeLeft") {
    tags.value = tags.value.slice(ind);
  } else if (type === "closeAll") {
    tags.value = [];
    router.replace(defaultHomePath);
  } else if (type === "reload") {
    currTagInd.value = ind;
    reloadView();
  } else if (type === "copyPath") {
    copyText(tags.value[ind]?.path);
  } else if (type === "copyWholePath") {
    copyText(location.href);
  } else if (type === "closeSaved") {
    showMessage("暂未开通关闭已保存功能", "warning");
  } else {
    showMessage("暂不支持此类型：" + type, "error");
  }
  getCurrTagInd(ind);
  // 关闭之后，将左右视情况按钮禁用，貌似不生效
  initDisabled();
  //清除关掉的页签的缓存
  const removeNames = getRemoveNames(tags.value);
  keepAliveStore.remove(removeNames);
}
function getRemoveNames(tags: CommonObj[]) {
  const names = tags.map(it => it.name);
  return keepAliveStore.list.filter(it => !names.includes(it));
}
function onUpdate(data: CommonObj) {
  const { newIndex } = data;
  currTagInd.value = newIndex;
}
//监听鼠标滚轮滚动时，页签跟随滚动条滚动
function handleWheelDelta(e: any, speed = 4) {
  const { deltaY } = e;
  const ele = scrollRef?.value?.targetDomElement;
  const { scrollLeft } = ele;
  const left = scrollLeft + deltaY * speed;
  ele.scrollTo(left, 0);
  initDisabled();
}
function onArrowBtn(direction = 1, num = 300) {
  const ele = scrollRef?.value?.targetDomElement;
  const { scrollLeft } = ele;
  const left = scrollLeft + num * direction;
  ele.scrollTo(left, 0);
  initDisabled();
}
function activeTagScrollToCenter(fullPath: string) {
  const findInd = tags.value.findIndex((it: PageTagItemType) => it.path === fullPath);
  nextTick(() => {
    const scrollEle = scrollRef?.value?.targetDomElement;
    if (!scrollEle) return;
    const { offsetWidth: scrollOffsetWidth, scrollLeft } = scrollEle;
    const findDom = scrollEle.children[findInd];
    if (!findDom) return;
    const { offsetLeft: tagOffsetLeft, offsetWidth: tagOffsetWidth } = findDom;
    const { left } = findDom.getBoundingClientRect();
    // //如果标签在右侧可视区外
    // if (tagOffsetLeft > scrollOffsetWidth) {
    //   let toLeft = tagOffsetLeft - scrollOffsetWidth + tagOffsetWidth;
    //   isToCenter && (toLeft += (scrollOffsetWidth - tagOffsetWidth) / 2);
    //   scrollEle.scrollTo(toLeft, 0);
    // }
    // //如果标签在左侧可视区域外
    // else if (tagOffsetLeft < scrollLeft) {
    //   let toLeft = tagOffsetLeft;
    //   isToCenter && (toLeft -= (scrollOffsetWidth - tagOffsetWidth) / 2);
    //   scrollEle.scrollTo(toLeft, 0);
    // }
    // //如果标签在可视区域内
    // else {
    //   if (isToCenter) {
    //     let toLeft = scrollLeft + (scrollOffsetWidth - tagOffsetWidth) / 2;
    //     scrollEle.scrollTo(toLeft, 0);
    //   }
    // }
    const toLeft = tagOffsetLeft - (scrollOffsetWidth - tagOffsetWidth) / 2;
    scrollEle.scrollTo(toLeft, 0);
  });
}
function initDisabled() {
  //必须要使用setTimeout，不然会引起bug（貌似onArrowBtn 中的 ele.scrollTo(left, 0) 是个异步函数，暂不清楚原因）
  // setTimeout(() => {
  const ele = scrollRef?.value?.targetDomElement;
  if (!ele) return;
  const { scrollWidth, clientWidth, offsetWidth, scrollLeft } = ele;
  const width = clientWidth || offsetWidth;
  rightDisabled.value = scrollLeft + width >= scrollWidth;
  leftDisabled.value = scrollLeft <= 0;
  // }, 300);
}
function onTagItem(item: PageTagItemType, ind: number) {
  router.push(item.path);
  currTagInd.value = ind;
}
function onContextmenu(e: Event, ind: number) {
  bcrInfo.value = e.currentTarget?.getBoundingClientRect();
  contMenuInd.value = ind;
}
//添加进路由历史记录
function addToRoutes(data: PageTagItemType) {
  const { text, path, id } = data;
  const target = tags.value.find(it => it.path === path);
  if (!target) {
    if (path !== defaultHomePath) {
      if (text === "404") {
        data.text = path;
      }
      if (id) {
        data.text += `(${id})`;
      }
      tags.value.push(data);
      currTagInd.value = tags.value.length - 1;
      initDisabled();
    } else {
      currTagInd.value = -1;
    }
  } else {
    const ind = tags.value.findIndex(it => it.path === path);
    currTagInd.value = ind;
  }
}
</script>
<style lang="scss" scoped>
.page-tags {
  height: $page-tags-height;
  box-shadow: $shadow-main;
  background: #fff;
  .btn {
    color: $color-text-main;
    height: $page-tags-height;
    flex-basis: 30px;
    font-weight: bolder;
    &:hover {
      color: $color-primary;
      background: $color-bg-heavyer;
    }
    &.disabled {
      color: #999;
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        background: none;
      }
    }
  }
  .tags-box {
    overflow: auto;
    padding: $gap-qtr;
    .scroll {
      position: relative;
      box-sizing: border-box;
      white-space: nowrap;
      height: 24px;
      overflow: scroll;
      scroll-behavior: smooth;
    }
  }
}
</style>
