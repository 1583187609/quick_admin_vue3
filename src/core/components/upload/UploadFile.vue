<template>
  <div class="upload-file f-fs-c">
    <el-input
      placeholder="请点击右侧按钮选择文件"
      clearable
      v-model="file.name"
      :disabled="!file.url"
      @clear="$emit('update:modelValue', { name: '', url: '' })"
    />
    <el-upload
      class="upload f-c-c"
      :class="{ disabled }"
      :action="action"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :headers="{ token: storage.getItem('token'), source: 1 }"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useFormItem, useFormDisabled } from "element-plus";
import type { UploadProps } from "element-plus";
import { showMessage, storage, toCssVal } from "@/core/utils";
import config from "@/config";
import { getErrorTips, getFileTips } from "./_utils";

export interface FileAttrs {
  url: string;
  name: string;
}
const props = withDefaults(
  defineProps<{
    modelValue?: FileAttrs;
    size?: string | number;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string; //接受的文件类型，例：image/png, image/jpeg
    limitSize?: number; //文件大小限制
    action?: string;
    showTips?: boolean;
    tips?: string;
    handleSuccessRes?: (res: any) => string;
  }>(),
  Object.assign(
    {
      modelValue: () => reactive({ name: "", url: "" }),
      size: 80,
      showFileList: false,
      // accept: "image/png,image/jpg,image/jpeg",
      limitSize: 1024 * 1024 * 10, //10M
      action: "/proxy/common/uploadImage",
      showTips: true,
      tips: _props => getFileTips(_props),
      handleSuccessRes: (data: any) => {
        return data.path;
      },
    },
    config?.BaseCrud
  )
);
const $emit = defineEmits(["update:modelValue", "change"]);
const { formItem } = useFormItem();
const { value: disabled } = useFormDisabled();
const file = ref<FileAttrs>(props.modelValue || { url: "", name: "" });
//上传前处理
const beforeUpload: UploadProps["beforeUpload"] = file => {
  const errTips = getErrorTips(props, file);
  if (!errTips) return true;
  showMessage(errTips, "error");
  return false;
};
const handleProgress: UploadProps["onProgress"] = file => {
  console.log(file, "onProgress--------------------");
};
const handleSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
  const { code, message, data } = res;
  if (code !== 1000) return showMessage(message, "error");
  const url = props.handleSuccessRes(data);
  const lastInd = uploadFile.name.lastIndexOf(".");
  const name = uploadFile.name.slice(0, lastInd);
  const obj: FileAttrs = { url, name };
  file.value = { url, name };
  console.log(obj);
  $emit("update:modelValue", obj);
  formItem?.validate("blur");
  $emit("change", file);
};
const handleError: UploadProps["onError"] = (err: any) => {
  // console.error(err);
  // showMessage("文件上传失败",'error');
};
</script>

<style lang="scss" scoped>
.upload-file {
  width: 100%;
}
.upload {
  margin-left: $gap-half;
}
// .upload {
//   position: relative;
//   height: v-bind(newSize);
//   width: v-bind(newSize);
//   border-radius: $radius-main;
//   border: 1px dashed $color-border-main;
//   background: $color-bg-lighter;
//   transition: all $transition-time-main;
//   .icon-close {
//     position: absolute;
//     right: -8px;
//     top: -8px;
//     z-index: 1000;
//     opacity: 0.7;
//     &:hover {
//       opacity: 1;
//     }
//   }
//   .img {
//     height: 100%;
//     width: 100%;
//   }
//   .icon {
//     color: $color-text-light;
//   }
//   &:hover {
//     border: 1px dashed $color-primary;
//     .icon {
//       color: $color-primary;
//     }
//   }
//   &.disabled {
//     border: 1px dashed $color-border-main;
//     &:hover {
//       cursor: not-allowed;
//       .icon {
//         cursor: not-allowed;
//         color: $color-text-light;
//       }
//     }
//   }
// }
// .tips {
//   padding: $gap-qtr 0 0;
//   line-height: 1.4;
//   color: $color-text-light;
//   font-size: $font-size-lighter;
// }
</style>
