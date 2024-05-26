<template>
  <div class="upload-file f-fs-c">
    <el-input
      placeholder="请点击右侧按钮选择文件"
      clearable
      v-model="file.name"
      :disabled="!file.url"
      @clear="emits('update:modelValue', { name: '', url: '' })"
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
import { reactive, ref } from "vue";
import { useFormItem, useFormDisabled } from "element-plus";
import type { UploadProps } from "element-plus";
import { showMessage, storage, toCssVal } from "@/utils";
import config from "@/config";
import { StrNum, CommonObj, FinallyNext } from "@/vite-env";
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
    accept?: string; //image/png, image/jpeg
    limitSize?: number; //文件大小限制
    action?: string;
    showTips?: boolean;
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
      handleSuccessRes: (data: any) => {
        return data.path;
      },
    },
    config?.BaseCrud
  )
);
const emits = defineEmits(["update:modelValue", "change"]);
const { formItem } = useFormItem();
const { value: disabled } = useFormDisabled();
const newSize = toCssVal(props.size);
const file = ref<FileAttrs>(props.modelValue || { url: "", name: "" });
// const tempSrc =
//   "https://files.xiangqinjiaoapp.com/user-file/D85QoX/20230903/face/tmp_dbf84a5a546905a1b554a5dc892cba8c.png";
// const file = computed<FileAttrs>({
//   get() {
//     return props.modelValue;
//   },
//   set(val: FileAttrs) {
//     console.log(val, "val---------------------1122");
//     emits("update:modelValue", val);
//     formItem?.validate("blur");
//   },
// });
const tips = computed(() => {
  const { accept, limitSize } = props;
  const type = getAcceptTypeStr(accept);
  const size = getLimitSizeStr(limitSize);
  return `仅支持${type}，不超过${size}`;
});
// setTimeout(() => {
//   file.value = tempSrc;
//   // emits("update:modelValue", tempSrc);
//   // formItem?.validate("blur");
// }, 500);
//上传前处理
const beforeUpload: UploadProps["beforeUpload"] = file => {
  const { limitSize, accept } = props;
  const { type, size } = file;
  const errTips = validType(accept, type) || validSize(limitSize, size);
  if (errTips) {
    showMessage(errTips, "error");
    return false;
  }
  return true;
};
const handleProgress: UploadProps["onProgress"] = file => {
  console.log(file, "onProgress--------------------");
};
// const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
//   file.value = URL.createObjectURL(uploadFile.raw!);
//   emits("change", file.value);
// };
const handleSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
  const { code, message, data } = res;
  if (code === 1000) {
    const url = props.handleSuccessRes(data);
    const lastInd = uploadFile.name.lastIndexOf(".");
    const name = uploadFile.name.slice(0, lastInd);
    const obj: FileAttrs = { url, name };
    file.value = { url, name };
    console.log(obj);
    emits("update:modelValue", obj);
    formItem?.validate("blur");
    emits("change", file);
  } else {
    showMessage(message, "error");
  }
};
const handleError: UploadProps["onError"] = (err: any) => {
  // console.error(err);
  // showMessage("文件上传失败",'error');
};
function handleDelete() {
  // file.value = "";
}
/**
 * 获取支持上传的文件后缀类型
 */
function getAcceptTypeStr(accept: string): string {
  const types = accept.split(",").map((it: string) => it.split("/")[1]);
  return types.join("，");
}
/**
 * 获取支持上传的文件大小限制(自带单位)
 */
function getLimitSizeStr(limitSize: number): string {
  let size = limitSize / 1024;
  let sizeStr = "";
  if (size < 1024) {
    sizeStr = `${size.toFixed(1)}kb`;
  } else {
    size = size / 1024;
    sizeStr = `${size.toFixed(1)}Mb`;
  }
  return sizeStr;
}
/**
 * 校验文件类型
 * @param accept string  image/png,image/jpeg
 * @param fileType string  image/png,image/jpeg
 */
function validType(accept: string | undefined, fileType: string): string {
  let tips = "";
  if (!accept) return tips;
  const acceptTypes = accept.split(",");
  if (!acceptTypes.includes(fileType)) {
    tips = `仅支持上传${getAcceptTypeStr(accept)}格式的文件`;
  }
  return tips;
}
/**
 * 校验文件类型
 * @param accept string  image/png,image/jpeg
 * @param type string  image/png,image/jpeg
 */
function validSize(limitSize: number, fileSize: number) {
  return fileSize > limitSize ? `文件大小不能超过${getLimitSizeStr(limitSize)}` : "";
}
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
