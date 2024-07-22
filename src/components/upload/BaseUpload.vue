<template>
  <div class="base-upload">
    <el-upload
      class="upload f-c-c"
      :class="{ disabled }"
      :action="action"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :headers="headers"
    >
      <div class="f-c-c-c upload-err-mask" v-if="errSrc">
        <BaseIcon size="26" name="Picture"></BaseIcon>
        <div>上传失败</div>
      </div>
      <template v-if="src || errSrc">
        <BaseIcon
          @click.stop="handleDelete"
          class="icon-del"
          :class="{ disabled }"
          size="24"
          name="CircleCloseFilled"
          v-if="!disabled && !errSrc"
        />
        <BaseImg class="img" :src="src || errSrc" :fit="fit" :preview="disabled" />
      </template>
      <template v-else>
        <el-progress
          type="circle"
          :width="parseInt(size.toString()) * 0.8"
          :percentage="percentage"
          :stroke-width="4"
          v-if="percentage > 0 && percentage < 100"
        />
        <BaseIcon class="icon-add" :size="parseFloat(newSize.toString()) / 4" name="Plus" v-else></BaseIcon>
      </template>
    </el-upload>
    <div class="tips" v-if="showTips">{{ tips }}</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { useFormItem, useFormDisabled } from "element-plus";
import type { UploadProps } from "element-plus";
import { storage, toCssVal, isProd, showMessage } from "@/components/_utils";
import config from "@/config";
import { StrNum, CommonObj, FinallyNext } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    size?: string | number;
    fit?: any; //EpPropMergeType<StringConstructor>
    showFileList?: boolean;
    drag?: boolean;
    accept?: string; //image/png, image/jpeg
    limitSize?: number; //图片大小限制
    headers?: CommonObj;
    action?: string;
    showTips?: boolean;
    handleSuccessResponse?: (res: CommonObj, upFile: CommonObj) => Promise<any>;
  }>(),
  Object.assign(
    {
      size: 100,
      fit: "cover",
      showFileList: false,
      showTips: true,
      accept: "image/png,image/jpg,image/jpeg",
      limitSize: 1024 * 1024 * 10, //10M
      // headers: () => ({ "X-Token": storage.getItem("token") }),
      // action: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
      // handleSuccessResponse: (res: CommonObj, upFile: CommonObj) => {
      //   return new Promise((resolve, reject) => {
      //     const { code, message, data } = res;
      //     if (code === 2000) {
      //       resolve(data.fullUrl);
      //     } else {
      //       reject(message);
      //     }
      //   });
      // },
    },
    config?.BaseUpload
  )
);
const emits = defineEmits(["update:modelValue", "change"]);
const percentage = ref(0);
const { formItem } = useFormItem();
const disabled = ref(useFormDisabled().value);
const newSize = toCssVal(props.size);
const errSrc = ref(""); //上传失败图片的地址(本地生成)
const src = computed({
  get() {
    return props.modelValue || "";
  },
  set(val: string) {
    emits("update:modelValue", val);
    formItem?.validate("blur");
  },
});
const tips = computed(() => {
  const { accept, limitSize } = props;
  const type = getAcceptTypeStr(accept);
  const size = getLimitSizeStr(limitSize);
  return `仅支持${type}，不超过${size}`;
});
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
//上传中
const handleProgress: UploadProps["onProgress"] = file => {
  const { loaded, total } = file;
  percentage.value = Math.floor((loaded / total) * 100);
};
//上传成功
const handleSuccess: UploadProps["onSuccess"] = (res, upFile) => {
  props
    .handleSuccessResponse(res, upFile)
    .then((url: string) => {
      src.value = url;
      emits("change", url);
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

//删除图片
function handleDelete() {
  if (disabled.value) return;
  src.value = "";
}

/**
 * 获取支持上传的图片后缀类型
 */
function getAcceptTypeStr(accept: string): string {
  const types = accept.split(",").map((it: string) => it.split("/")[1]);
  return types.join("，");
}

/**
 * 获取支持上传的图片大小限制(自带单位)
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
 * 校验图片类型
 * @param accept string  image/png,image/jpeg
 * @param fileType string  image/png,image/jpeg
 */
function validType(accept: string, fileType: string): string {
  let tips = "";
  const acceptTypes = accept.split(",");
  if (!acceptTypes.includes(fileType)) {
    tips = `仅支持上传${getAcceptTypeStr(accept)}格式的图片`;
  }
  return tips;
}

/**
 * 校验图片类型
 * @param accept string  image/png,image/jpeg
 * @param type string  image/png,image/jpeg
 */
function validSize(limitSize: number, fileSize: number) {
  return fileSize > limitSize ? `图片大小不能超过${getLimitSizeStr(limitSize)}` : "";
}
</script>

<style lang="scss" scoped>
$size: v-bind(newSize);
.base-upload {
  .upload {
    position: relative;
    height: $size;
    width: $size;
    border-radius: $radius-main;
    border: 1px dashed $color-border-main;
    background: $color-bg-lighter;
    transition: all $transition-time-main;

    &:hover {
      .upload-err-mask {
        display: none;
      }
    }

    &.disabled {
      :deep(.el-upload) {
        cursor: not-allowed;
      }
    }

    .icon-del {
      position: absolute;
      right: -8px;
      top: -8px;
      z-index: 2;
      opacity: 0.7;

      &.disabled {
        cursor: not-allowed;
      }

      &:hover {
        opacity: 1;
      }
    }

    .img {
      height: $size;
      width: $size;
      border-radius: $radius-main;
      overflow: hidden;
      // .err-box {
      //   height: 100%;
      //   width: 100%;
      //   font-size: 12px;
      //   color: $color-text-light;
      //   line-height: 1.4;
      // }
    }

    .icon-add {
      color: $color-text-light;
      padding: 36px;
      // background: red;
    }

    &:hover {
      border: 1px dashed $color-primary;

      .icon-add {
        color: $color-primary;
      }
    }

    &.disabled {
      border: 1px dashed $color-border-main;

      &:hover {
        cursor: not-allowed;

        .icon-add {
          cursor: not-allowed;
          color: $color-text-light;
        }
      }
    }

    .upload-err-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      color: $color-danger;
      border-radius: $radius-main;
      background: rgba(#000, 0.5);
    }
  }

  .tips {
    padding: $gap-qtr 0 0;
    line-height: 1.4;
    color: $color-text-light;
    font-size: $font-size-lighter;
  }
}
</style>
