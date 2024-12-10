<!-- summary
目标：简化传参。
注意：该功能待完善。 
-->
<template>
  <div class="base-editor">
    <Toolbar class="tool-bar" :editor="editorRef" :mode="mode" :defaultConfig="toolbarCfg" />
    <Editor
      v-model="modelVal"
      class="editor"
      :mode="mode"
      :style="{ height, minHeight, maxHeight, width }"
      :defaultConfig="editorCfg"
      @onMaxLength="handleMaxLength"
      @onChange="(editor:IDomEditor) => handleEvent(editor, 'change')"
      @onFocus="(editor:IDomEditor) => handleEvent(editor, 'focus')"
      @onBlur="(editor:IDomEditor) => handleEvent(editor, 'blur')"
      @onCreated="editor => (editorRef = editor)"
    />
  </div>
</template>
<script lang="ts" setup>
// 官方文档地址：https://www.wangeditor.com/v5/getting-started.html
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig, IDomEditor } from "@wangeditor/editor";
import { showMessage } from "@/core/utils";
import { useFormItem } from "element-plus";
import { CommonObj } from "@/core/_types";
import { isProd, storage } from "@/core/utils";
import { shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import _ from "lodash";

export type ModeTypes = "default" | "simple";
export type EditorValueType = "html" | "text";

const { merge } = _;
const { formItem } = useFormItem();
// const defaultEditorStyle = {
//   height: "300px",
//   width: "100%",
//   minHeight: "none",
//   maxHeight: "none",
// };
const defaultToolBarConfig = {
  // toolbarKeys: [
  //     // 菜单 key
  //     "headerSelect",
  //     // 分割线
  //     "|",
  //     // 菜单 key
  //     "bold",
  //     "italic",
  //     // 菜单组，包含多个菜单
  //     {
  //       key: "group-more-style", // 必填，要以 group 开头
  //       title: "更多样式", // 必填
  //       iconSvg: "<svg>....</svg>", // 可选
  //       menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
  //     },
  //   ],
  //插入新的自定义扩展的菜单
  //   insertKeys: {
  //     index: 5, // 插入的位置，基于当前的 toolbarKeys
  //     keys: ["menu-key1", "menu-key2"],
  //   },
  // 排除掉某些菜单，其他都保留
  //   excludeKeys: [
  //     "headerSelect",
  //     "italic",
  //     "group-more-style", // 排除菜单组，写菜单组 key 的值即可
  // ],
};
const defaultEditorConfig = {
  placeholder: "请输入内容...",
  // maxLength 应该由表单的规则（rules）来决定，例：rules: [{ max: 10, message: "不能超过10个字符", trigger: "change" }]
  // maxLength: formItem.rules?.find((it) => !!it.max)?.max,
  // readOnly: true,
  MENU_CONF: {
    uploadImage: {
      fieldName: "file",
      server: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
      headers: { token: storage.getItem("token") },
      maxFileSize: 1024 * 1024 * 10, //10M
      // 自定义插入图片
      customInsert(res: any, insertFn: any) {
        // TS 语法
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(res.data.fullUrl);
      },
    },
  },
  // customAlert(s: string, t: any) {
  //   showMessage(s, t);
  //   switch (t) {
  //     case "success":
  //       showMessage(s, "success");
  //       break;
  //     case "info":
  //       showMessage(s, "info");
  //       break;
  //     case "warning":
  //       showMessage(s, "warning");
  //       break;
  //     case "error":
  //       showMessage(s, "error");
  //       break;
  //     default:
  //       showMessage(s, "info");
  //       break;
  //   }
  // },
};
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    mode?: ModeTypes;
    height?: string;
    width?: string;
    minHeight?: string;
    maxHeight?: string;
    placeholder?: string;
    maxlength?: number;
    readonly?: boolean;
    disabled?: boolean;
    toolBarConfig?: CommonObj;
    editorConfig?: CommonObj;
  }>(),
  {
    modelValue: "",
    mode: "simple",
    height: "300px",
    width: "100%",
    minHeight: "none",
    maxHeight: "none",
  }
);
const $emit = defineEmits(["update:modelValue", "change", "focus", "blur"]);
const editorRef = shallowRef<any>(null); // editor 实例
const toolbarCfg: Partial<IToolbarConfig> = merge({}, defaultToolBarConfig, props.toolBarConfig);
const editorCfg = merge({}, defaultEditorConfig, props.editorConfig, {
  placeholder: props.placeholder,
  maxLength: props.maxlength, // formItem.rules?.find(it => !!it.maxlength)?.maxlength,
  readOnly: props.readonly,
  disabled: props.disabled,
});
// 编辑器中的文本内容
const modelVal = computed({
  get: () => props.modelValue,
  set(val: string) {
    if (val === "<p><br></p>") val = "";
    $emit("update:modelValue", val);
  },
});
//表单校验参照： http://www.xinyan666.fun/article/article_detail/171/
function handleMaxLength(editor: IDomEditor) {
  // formItem?.validate("change");
  showMessage(`不能超过${editorCfg.maxLength}个字符`, "warning");
}

/**
 * 处理事件监听逻辑
 */
function handleEvent(editor: IDomEditor, eventName: "change" | "blur" | "focus") {
  $emit(eventName, getEditorVal());
  formItem?.validate(eventName);
}

/**
 * 判断是否为空
 * @notice isEmpty() 方法只能识别只有一个空段落情况，其他情况（如有一个空标题、空表格）请使用 editor.getText() 来判断。
 */
function getIsEmpty() {
  const { isEmpty, getText } = editorRef.value;
  let empty = isEmpty();
  if (!empty) empty = getText() === "";
  return empty;
}

/**
 * 获取编辑器的文本内容值
 * @param {html|text} type 获取文本类型
 */
function getEditorVal(type: EditorValueType = "html") {
  const { getText, getHtml } = editorRef.value;
  if (getIsEmpty()) return "";
  return type === "html" ? getHtml() : getText();
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value?.destroy();
});
defineExpose<{ editorRef: any }>({
  editorRef,
});
</script>
<style lang="scss" scoped>
.base-editor {
  &.w-e-full-screen-container {
    z-index: 1000000;
  }
  &:not(.w-e-full-screen-container) {
    border-radius: $radius-main;
  }
  border: $border-main;
  // overflow: hidden;
  width: 100%;
  .tool-bar {
    border-bottom: $border-main;
  }
}
</style>
