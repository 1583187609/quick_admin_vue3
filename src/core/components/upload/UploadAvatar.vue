<!-- 上传头像带裁剪功能等 -->
<template>
  <el-upload
    class="upload-avatar f-c-c"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :accept="accepts.join(',')"
  >
    <img :src="imgSrc" class="img" v-if="imgSrc" />
    <el-icon name="Plus" size="32" v-else>
      <Plus />
    </el-icon>
  </el-upload>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import type { UploadProps } from "element-plus";
import avatarImg from "@/assets/images/default/avatar.png";
import { showMessage } from "@/core/utils";
import { Plus } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    accepts?: string[];
    maxSize?: number; //图片大小限制：单位Mb
  }>(),
  {
    modelValue: avatarImg,
    accepts: () => ["image/png", "image/jpeg"],
    maxSize: 1,
  }
);
const $emit = defineEmits(["update:modelValue"]);
const imgSrc = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  $emit("update:modelValue", URL.createObjectURL(uploadFile.raw!));
};

const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
  const { type, size } = rawFile;
  const { accepts, maxSize } = props;
  if (!accepts.includes(type)) {
    const str = accepts.map((it: string) => it.split("/")[1]).join("，");
    showMessage(`请上传 ${str} 格式的图片！`, "error");
    return false;
  }
  if (size / 1024 / 1024 > maxSize) {
    showMessage(`图片大小不能超过 ${maxSize}MB!`, "error");
    return false;
  }
  return true;
};
</script>
<style lang="scss" scoped>
.upload-avatar {
  border: 1px dashed $color-border-light;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  width: 100px;
  height: 100px;
  &:hover {
    border-color: $color-border-heavy;
  }
  .img {
  }
}
</style>
