<template>
  <div class="error f-c-c-c">
    <BaseImg size="400" :src="imgMap[status].img"></BaseImg>
    <div class="tips">{{ imgMap[status].tips }}</div>
    <div class="f-c-c">
      <el-button size="large" type="primary" @click="router.go(-1)">返回上一页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";
import img_403 from "@/assets/images/error/403.png";
import img_404 from "@/assets/images/error/404.png";
import img_500 from "@/assets/images/error/500.png";
export type StatusType = "403" | "404" | "500";
type EnumStatusImg = {
  [key in StatusType]: {
    img: string;
    tips: string;
  };
};
const imgMap: EnumStatusImg = {
  "403": {
    img: img_403,
    tips: "抱歉！您还没权限访问该页面哦~",
  },
  "404": {
    img: img_404,
    tips: "啊哦~页面好像找不到啦……",
  },
  "500": {
    img: img_500,
    tips: "嗯~这个……服务器日常抽风……",
  },
};
const props = withDefaults(
  defineProps<{
    status?: StatusType;
  }>(),
  {
    status: "404",
  }
);
const router = useRouter();
</script>

<style lang="scss" scoped>
.error {
  height: 100%;
  width: 100%;
}
.tips {
  margin: $gap 0;
  font-size: 18px;
}
</style>
