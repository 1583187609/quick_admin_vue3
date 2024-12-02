<template>
  <el-upload
    class="base-upload"
    v-model:file-list="fileList"
    :accept="accept"
    :before-upload="beforeUpload"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :action="action"
    :listType="listType"
    :limit="limit"
    :drag="drag"
    :disabled="disabled"
    :show-file-list="showFileList"
  >
    <el-icon class="icon-add">
      <Plus />
    </el-icon>
    <template #file="{ file }" v-if="!showFileList">
      <BaseImg class="img" :src="file.url" :fit="fit" :preview="disabled" />
    </template>
    <!-- <template #trigger>触发文件选择框的内容</template> -->
    <template #tip v-if="tips">
      <div class="tips" :class="{ 'mt-h': !showFileList || !fileList.length }">{{ tips }}</div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import { useFormItem, useFormDisabled } from "element-plus";
import type { UploadProps } from "element-plus";
import { showMessage } from "@/core/utils";
import config from "@/config";
import { CommonObj } from "@/core/_types";
import { getFileTips, getErrorTips } from "./_utils";
import { ImgFitType } from "@/core/img/BaseImg.vue";
import { Plus } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    fit?: ImgFitType; //EpPropMergeType<StringConstructor>
    drag?: boolean; //是否可拖动上传
    accept?: string; //image/png, image/jpeg
    limitSize?: number; //上传文件的大小限制
    action?: string;
    listType?: any; // EpPropMergeType<StringConstructor, "picture-card" | "picture" | "text", unknown> | undefined;
    limit?: number; //文件列表可上传几张
    tips?: string; //文件大小、支持类型提示文案
    disabled?: boolean; //是否禁用上传功能
    showFileList?: boolean;
    handleSuccessResponse?: (res: CommonObj, upFile: CommonObj) => Promise<any>;
  }>(),
  Object.assign(
    {
      modelValue: "",
      action: "#",
      accept: "image/png,image/jpg,image/jpeg",
      listType: "picture-card",
      limit: 1,
      limitSize: 1024 * 1024 * 10, //10M
      tips: _props => getFileTips(_props),
      showFileList: _props => _props.limit > 1,
      // drag: true,
    },
    config?.BaseUpload
  )
);
const $emit = defineEmits(["update:modelValue", "change"]);
const openPopup = inject<any>("openPopup");
const percentage = ref(0);
const { formItem } = useFormItem();
const disabled = computed(() => useFormDisabled().value ?? props.disabled);
const errSrc = ref(""); //上传失败图片的地址(本地生成)
const fileList = ref([]);

const src = computed({
  get: () => props.modelValue,
  set(val: string) {
    $emit("update:modelValue", val);
    formItem?.validate("blur");
  },
});
// watch(
//   () => fileList.value,
//   newVal => {
//     console.log(newVal, "file-list-------------");
//   }
// );

//上传前处理
const beforeUpload: UploadProps["beforeUpload"] = file => {
  const errTips = getErrorTips(props, file);
  if (!errTips) return true;
  showMessage(errTips, "error");
  return false;
};

//上传中
const handleProgress: UploadProps["onProgress"] = file => {
  const { loaded, total } = file;
  percentage.value = Math.floor((loaded / total) * 100);
};

//上传成功
const handleSuccess: UploadProps["onSuccess"] = (res, upFile) => {
  const { handleSuccessResponse } = props;
  handleSuccessResponse?.(res, upFile)
    .then((url: string) => {
      src.value = url;
      $emit("change", url);
    })
    .catch((msg: string) => {
      showMessage(msg, "error");
    });
};
//上传失败
const handleError: UploadProps["onError"] = (err, upFile, upFiles) => {
  showMessage("文件上传失败", "error");
  errSrc.value = URL.createObjectURL(upFile.raw);
};

// 图片预览
const handlePreview: UploadProps["onPreview"] = uploadFile => {
  openPopup("图片预览", ["img", { src: uploadFile.url, wFull: true, alt: "图片预览" }]);
};

// 图片删除
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
</script>

<style lang="scss" scoped>
.base-upload {
  .icon-add {
    font-size: 2em;
  }
  .img {
    height: 100%;
    width: 100%;
  }
  .tips {
    color: $color-info;
    line-height: 1.4;
    font-size: $font-size-lighter;
  }
}
</style>
