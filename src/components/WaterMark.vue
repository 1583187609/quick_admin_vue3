<template>
  <div class="water-mark"></div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onUnmounted, reactive } from "vue";
import dayjs from "dayjs";
const props = withDefaults(
  defineProps<{
    text?: string; //显示的水印文本
    rotate?: number; //旋转角度
    allowUpdate?: boolean; //是否允许通过js或者开发者工具等途径修改水印DOM节点（水印的id，attribute属性，节点的删除），true为允许
    destroy?: boolean; //是否在销毁组件时去除水印节点（前提是允许用户修改DOM，否则去除后会再次自动生成）,true会
  }>(),
  {
    allowUpdate: false,
    destroy: true,
    rotate: 30,
  }
);
let maskDiv = reactive<any>({}); // 当前显示的水印div节点DOM对象
const tempText = `姓名 00001 ${dayjs(new Date()).format("YYYY-MM-DD")}`;
function init() {
  const canvas: any = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = "380"; //单个水印的宽高
  canvas.height = "180";
  maskDiv = document.createElement("div");
  const ctx = canvas.getContext("2d");
  ctx.font = "normal 14px Microsoft Yahei"; //设置样式
  ctx.fillStyle = "rgb(112, 113, 114, 0.1)"; //水印字体颜色
  ctx.rotate((props.rotate * Math.PI) / 180); //水印偏转角度
  ctx.fillText(props.text || tempText, 30, 20);
  const src = canvas.toDataURL("image/png");
  maskDiv.style.position = "fixed";
  maskDiv.style.zIndex = "9999";
  maskDiv.id = "_waterMark";
  maskDiv.style.top = "30px";
  maskDiv.style.left = "0";
  maskDiv.style.width = "100%";
  maskDiv.style.height = "100%";
  maskDiv.style.pointerEvents = "none";
  maskDiv.style.backgroundImage = "URL(" + src + ")";
  document.body.appendChild(maskDiv); // 水印节点插到body下
}

//监听body节点
function monitor() {
  const body = document.getElementsByTagName("body")[0];
  const options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  };
  const observer = new MutationObserver((mutations: any, _observer: any) => {
    const { target, attributeName, removedNodes } = mutations[0];
    //当attribute属性被修改或id被改变时
    if (target.id === "_waterMark" || attributeName === "id") remove();
    //当节点被删除或id被改变时
    if (removedNodes[0]?.id === "_waterMark" || attributeName === "id") init();
  });
  observer.observe(body, options);
}

/* public */
//手动销毁水印DOM
function remove() {
  document.body.removeChild(maskDiv);
}
onMounted(() => {
  init();
  nextTick(() => {
    if (!props.allowUpdate) {
      // 设置水印节点修改的DOM事件
      monitor();
    }
  });
});
onUnmounted(() => {
  //组件销毁时去除生成在body节点下的水印节点
  if (props.destroy) {
    remove();
  }
});
</script>

<style lang="scss" scoped></style>
