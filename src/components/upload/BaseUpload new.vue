<template>
  <el-upload action="#" list-type="picture-card" :limit="1" :auto-upload="false">
    <BaseIcon size="2em" name="Plus" />
    <template #file="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      <div class="f-c-c">
        <BaseIcon name="ZoomIn" @click="handlePictureCardPreview(file)" />
        <BaseIcon name="Download" @click="handleDownload(file)" v-if="!disabled" />
        <BaseIcon name="Delete" @click="handleRemove(file)" v-if="!disabled" />
      </div>
    </template>
    <template #tip>
      <div>dddd</div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref, inject } from "vue";
import type { UploadFile } from "element-plus";
import { OpenPopupInject } from "../_types";

const openPopup = inject<OpenPopupInject>("openPopup");
const disabled = ref(false);
const handleRemove = (file: UploadFile) => {
  console.log(file);
};
const handlePictureCardPreview = (file: UploadFile) => {
  openPopup("预览", ["img", { src: file.url, wFull: true }]);
};
const handleDownload = (file: UploadFile) => {
  console.log(file);
};
</script>
