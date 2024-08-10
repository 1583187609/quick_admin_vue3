<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef, onBeforeMount } from "vue";
import { isClient, useClipboard, useToggle } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { CaretTop, Edit } from "@element-plus/icons-vue";
import { useSourceCode } from "../composables/source-code";
import { usePlayground } from "../composables/use-playground";
import Example from "./demo/vp-example.vue";
import SourceCode from "./demo/vp-source-code.vue";
import { demosPath } from "../../../scripts/doc/utils/index.js";

// import { useLang } from "../composables/lang";
// import demoBlockLocale from "../../i18n/component/demo-block.json"; //这是原来的github上的地址

// const demoBlockLocale = {
//   "view-source": "View source",
//   "hide-source": "Hide source",
//   "edit-in-editor": "Edit in Playground",
//   "edit-on-github": "Edit on GitHub",
//   "edit-in-codepen": "Edit in Codepen.io",
//   "copy-code": "Copy code",
//   "switch-button-option-text": "Switch to Options API",
//   "switch-button-setup-text": "Switch to Composition API",
//   "copy-success": "Copied!",
//   "copy-error": "This browser does not support automatic copy！",
// };

const demoBlockLocale = {
  "view-source": "查看源代码",
  "hide-source": "隐藏源代码",
  "edit-in-editor": "在 Playground 中编辑",
  "edit-on-github": "在 GitHub 中编辑",
  "edit-in-codepen": "在 Codepen 中编辑",
  "copy-code": "复制代码",
  "switch-button-option-text": "切换到 Options API",
  "switch-button-setup-text": "切换到 Composition API",
  "copy-success": "复制成功！",
  "copy-error": "当前浏览器不支持复制功能！",
};

const props = defineProps<{
  source: string;
  path: string;
  rawSource: string;
  description?: string;
}>();

const vm = getCurrentInstance()!;

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
});

const [sourceVisible, toggleSourceVisible] = useToggle();
// const lang = useLang();
// const demoSourceUrl = useSourceCode(toRef(props, "path"));

const sourceCodeRef = ref<HTMLButtonElement>();
const formatPathDemos = computed(() => {
  const demos = {};
  const demoFiles = import.meta.glob(`../../../demos/**/*.vue`, { eager: true });
  Object.keys(demoFiles).forEach(key => {
    demos[key.replace(`../../../demos/`, "")] = demoFiles[key].default;
  });
  return demos;
});

// const locale = computed(() => demoBlockLocale[lang.value]);
const locale = computed(() => demoBlockLocale);
const decodedDescription = computed(() => decodeURIComponent(props.description!));

// const onPlaygroundClick = () => {
//   const { link } = usePlayground(props.rawSource);
//   if (!isClient) return;
//   window.open(link);
// };

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (["Enter", "Space"].includes(e.code)) {
    e.preventDefault();
    toggleSourceVisible(false);
    sourceCodeRef.value?.focus();
  }
};

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties;
  if (!isSupported) {
    $message.error(locale.value["copy-error"]);
  }
  try {
    await copy();
    $message.success(locale.value["copy-success"]);
  } catch (e: any) {
    $message.error(e.message);
  }
};
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <ElDivider class="divider" />

      <div class="op-btns">
        <!-- <ElTooltip :content="locale['edit-in-editor']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <ElIcon
            :size="16"
            :aria-label="locale['edit-in-editor']"
            tabindex="0"
            role="link"
            class="op-btn"
            @click="onPlaygroundClick"
            @keydown.prevent.enter="onPlaygroundClick"
            @keydown.prevent.space="onPlaygroundClick"
          >
            <i-ri-flask-line />
            <BaseIcon name="DocumentCopy" />
          </ElIcon>
        </ElTooltip> -->
        <ElTooltip :content="locale['edit-on-github']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <!-- <ElIcon :size="16" class="op-btn" style="color: var(--text-color-light)">
            <a :href="demoSourceUrl" :aria-label="locale['edit-on-github']" rel="noreferrer noopener" target="_blank">
              <i-ri-github-line />
            </a>
          </ElIcon> -->
          <!-- IconGithub -->
          <BaseIcon :size="16" class="op-btn" @click="ElMessage.warning('暂不支持在GitHub中编辑')" name="Edit" />
        </ElTooltip>
        <ElTooltip :content="locale['copy-code']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <!-- <ElIcon
            :size="16"
            :aria-label="locale['copy-code']"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <i-ri-file-copy-line />
          </ElIcon> -->
          <BaseIcon
            :size="16"
            class="op-btn"
            name="DocumentCopy"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          />
        </ElTooltip>
        <ElTooltip :content="locale['view-source']" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
          <!-- <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? locale['hide-source'] : locale['view-source']"
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <i-ri-code-line />
            </ElIcon>
          </button> -->
          <BaseIcon class="op-btn" @click="toggleSourceVisible()" :size="16" name="Document" />
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>{{ locale["hide-source"] }}</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example {
  // border: 1px solid var(--border-color);
  // border-radius: var(--el-border-radius-base);
  border: $border-main;
  border-radius: $radius-main;
  .divider {
    margin: 0;
    border-top: $border-main;
  }
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        // color: var(--text-color);
        color: $color-primary;
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      // color: var(--text-color-lighter);
      transition: 0.2s;

      // &.github a {
      //   transition: 0.2s;
      //   color: var(--text-color-lighter);
      //   &:hover {
      //     color: var(--text-color);
      //   }
      // }
      &:hover {
        color: $color-primary;
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    // border-top: 1px solid var(--border-color);
    border-top: $border-main;
    height: 44px;
    box-sizing: border-box;
    // background-color: var(--bg-color, #fff);
    background: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    // color: var(--el-text-color-secondary);
    color: $color-text-light;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      // color: var(--el-color-primary);
      color: $color-primary;
    }
  }
}
</style>
