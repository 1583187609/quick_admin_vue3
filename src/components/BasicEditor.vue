<template>
  <div class="basic-editor">
    <Toolbar class="tool-bar" :editor="editorInst" :defaultConfig="toolbarCfg" :mode="mode" />
    <Editor
      class="editor"
      :style="{ height: toCssVal(height), width: '100%' }"
      :defaultConfig="editorCfg"
      v-model="value"
      :mode="mode"
      @onMaxLength="onMaxLength"
      @onChange="onChange"
      @onFocus="onFocus"
      @onBlur="onBlur"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
// 官方文档地址：https://www.wangeditor.com/v5/getting-started.html
import { onBeforeUnmount, computed, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig, IDomEditor } from "@wangeditor/editor";
import { pickBy } from "lodash";
import { showMessage, toCssVal } from "@/components/_utils";
import { useFormItem } from "element-plus";
import { merge } from "lodash";
import { CommonObj, StrNum } from "@/vite-env";
import "@wangeditor/editor/dist/css/style.css";
import { isProd, storage } from "@/components/_utils";

export type ModeTypes = "default" | "simple";
const { formItem } = useFormItem();
const defaultToolBarCfg = {
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
const defaultEditorCfg = {
  placeholder: "请输入内容...",
  //maxLength 应该由表单的规则（rules）来决定，例：rules: [{ max: 10, message: "不能超过10个字符", trigger: "change" }]
  // maxLength: formItem.rules?.find((it) => !!it.max)?.max,
  MENU_CONF: {
    uploadImage: {
      fieldName: "file",
      server: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
      headers: { "X-Token": storage.getItem("token") },
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
  // readOnly: true,
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
    editor?: any;
    modelValue?: string;
    height?: StrNum;
    placeholder?: string;
    mode?: ModeTypes;
    toolBarConfig?: CommonObj;
    editorConfig?: CommonObj;
  }>(),
  {
    height: 300,
    mode: "simple",
    toolBarConfig: () => ({}),
    editorConfig: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue", "change", "focus", "blur"]);
let editorInst: any = null; // editor 实例
const toolbarCfg: Partial<IToolbarConfig> = merge({}, defaultToolBarCfg, props.toolBarConfig);
const editorCfg = merge({}, defaultEditorCfg, props.editorConfig, {
  placeholder: props.placeholder,
  maxLength: formItem.rules?.find(it => !!it.max)?.max,
});
//编辑器中的文本内容
const value = computed({
  get() {
    return props.modelValue || "";
  },
  set(val: string) {
    if (val === "<p><br></p>") {
      val = "";
    }
    emits("update:modelValue", val);
  },
});
const handleCreated = (editor: IDomEditor) => {
  editorInst = editor; // 记录 editor 实例
};
//表单校验参照： http://www.xinyan666.fun/article/article_detail/171/
function onMaxLength(editor: IDomEditor) {
  // formItem?.validate("change");
  showMessage(`不能超过${editorCfg.maxLength}个字符`, "warning");
}

function getVal(val = editorInst.getText()) {
  // const isEmpty = editorInst.isEmpty();
  //isEmpty()方法只能识别只有一个空段落情况，其他情况（如有一个空标题、空表格）请使用 editor.getText() 来判断。
  const isEmpty = val === "";
  return isEmpty ? "" : editorInst.getHtml();
}

function onChange(editor: IDomEditor) {
  emits("change", getVal());
  formItem?.validate("change");
}

function onFocus(editor: IDomEditor) {
  emits("focus", getVal());
  formItem?.validate("focus");
}

function onBlur(editor: IDomEditor) {
  emits("blur", getVal());
  formItem?.validate("blur");
}

onMounted(() => {});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (editorInst == null) return;
  editorInst.destroy();
});
defineExpose({
  editor: editorInst,
});
</script>
<style lang="scss" scoped>
.basic-editor {
  border-radius: $radius-main;
  border: $border-main;
  overflow: hidden;
  width: 100%;
}

.tool-bar {
  border-bottom: $border-main;
}
</style>
