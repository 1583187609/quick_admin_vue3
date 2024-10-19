<template>
  <el-upload action="#" list-type="picture-card" :limit="1" :auto-upload="false">
    <el-icon size="2em">
      <Plus />
    </el-icon>
    <template #file="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      <div class="f-c-c">
        <el-icon @click="handlePictureCardPreview(file)">
          <ZoomIn />
        </el-icon>
        <el-icon @click="handleDownload(file)" v-if="!disabled">
          <Download />
        </el-icon>
        <el-icon @click="handleRemove(file)" v-if="!disabled">
          <Delete />
        </el-icon>
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
import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue";

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
