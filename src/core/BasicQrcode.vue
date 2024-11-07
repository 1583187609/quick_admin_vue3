<!-- summary 
目标：二维码组件
注意：该功能待完善
-->
<template>
  <div class="basic-qrcode f-c-c" ref="basicQrcodeRef">
    <div class="f-c-c-c" v-if="errTips">
      <span class="tips">{{ errTips }}</span>
      <el-button @click="createQrCode(value)">重试</el-button>
    </div>
    <canvas ref="canvasRef" v-else></canvas>
  </div>
</template>
<script lang="ts" setup>
import QRCode from "qrcode";
import { StrNum } from "./_types";
import { onMounted } from "vue";
import { showMessage } from "./_utils";

export type QrcodeLevel = "L" | "M" | "Q" | "H"; // 容错率L（低）H(高)

let oldText = "";
const props = withDefaults(
  defineProps<{
    value?: string;
    size?: StrNum;
    level?: QrcodeLevel;
    darkColor: string;
    lightColor: string;
    quality?: number;
  }>(),
  {
    value: "",
    size: 200,
    level: "M",
    darkColor: "#000",
    // lightColor: '#000',
  }
);

const canvasRef = ref(null);
const basicQrcodeRef = ref(null);
const errTips = ref<string>("");

const createQrCode = (text: string = props.value) => {
  if (!text) return (errTips.value = "缺少text属性");
  if (oldText === text) return showMessage("二维码已生成，无需再次生成", "warning");
  const { size, level, darkColor, lightColor } = props;
  QRCode.toCanvas(canvasRef.value, text, {
    errorCorrectionLevel: level,
    margin: 0, // 二维码内边距，默认为4。单位px
    height: size, // 二维码高度
    width: size, // 二维码宽度
    scal: 177,
    color: {
      dark: darkColor, // 二维码背景颜色
      // light: lightColor // 二维码前景颜色
    },
    rendererOpts: {
      quality: 0.9,
    },
  })
    .then(canvasDom => {
      basicQrcodeRef.value.append(canvasDom);
      oldText = text;
    })
    .catch(err => {
      console.error(err);
      errTips.value = "生成二维码失败，请点击重试";
    });
};
onMounted(() => {
  createQrCode(props.value);
});
</script>
<style lang="scss" scoped></style>
