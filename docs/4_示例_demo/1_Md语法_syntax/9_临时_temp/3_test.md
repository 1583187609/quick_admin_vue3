---
# title: 其他示例
# editLink: true
---

# 表格

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

# Emoji

:tada: :100:

# 目录

[[toc]]

# raw

::: raw
Wraps in a <div class="vp-raw">inner</div>
:::

# GitHub 风格的警报

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

# 图片

![测试图片](../../src/assets/images/logo.png)

# Vue 语法

<div v-for="(i,k) in 3" :key="k">{{ i }}</div>

# Vue 组件

<UserInfo />

# 徽章

### Title <Badge type="info" text="default" />

### Title <Badge type="tip" text="^1.9.0" />

### Title <Badge type="warning" text="beta" />

### Title <Badge type="danger" text="caution" />

<script setup>
import UserInfo from '@/views/_components/UserInfo.vue'
</script>
