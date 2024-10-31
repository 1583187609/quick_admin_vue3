<template>
  <div class="error f-c-c-c">
    <template v-if="imgMap[code]">
      <BaseImg size="400" :src="imgMap[code].img" />
      <div class="tips">{{ imgMap[code].tips }}</div>
      <div class="f-c-c">
        <el-button size="large" type="primary" @click="router.go(-1)">返回上一页</el-button>
      </div>
    </template>
    <BaseEmpty v-else />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { defineProps } from "vue";
import img_403 from "@/assets/images/error/403.png";
import img_404 from "@/assets/images/error/404.png";
import img_500 from "@/assets/images/error/500.png";

export type StatusType = "403" | "404" | "500" | "999";

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
  "999": {
    img: img_404,
    tips: "嗨~没找到地址文件……",
  },
};
const props = withDefaults(
  defineProps<{
    status?: StatusType;
  }>(),
  {}
);
const router = useRouter();
const route = useRoute();
const { type = "404" } = route.query;
const code = (props.status ?? type) as StatusType;
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
