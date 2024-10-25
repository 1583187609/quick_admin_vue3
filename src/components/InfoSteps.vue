<!-- 组件 - 资料进程 -->
<template>
  <div :class="resData.info?.class" class="f-fs-c step-item">
    <div class="f-0 num">1</div>
    <div class="f-0 text">
      {{ resData.info?.text || "-" }}
    </div>
    <BaseIcon class="icon" size="20px" name="CircleCheckFilled" />
  </div>
  <div :class="{ success: resData.hasRealName }" class="f-fs-c step-item">
    <div class="f-0 num">2</div>
    <div class="f-0 text" v-if="resData.hasRealName">已实名</div>
    <div class="f-0 text" v-else>未实名</div>
    <BaseIcon class="icon" size="20px" name="CircleCheckFilled" />
  </div>
  <div :class="{ success: resData.hasAuth }" class="f-fs-c step-item">
    <div class="f-0 num">3</div>
    <div class="f-0 text" v-if="resData.hasAuth">已认证</div>
    <div class="f-0 text" v-else>未认证</div>
    <BaseIcon class="icon" size="20px" name="CircleCheckFilled" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { CommonObj } from "@/vite-env";
// infoStatus 0已完善已通过 1已完善未通过 2已完善待审核 3未完善
// idCardStatus 0 为0 已实名
// companyStatus schoolStatus  任一为0 即已认证
const statusMap: CommonObj = {
  0: {
    text: "已完善 - 已通过",
    class: "success",
  },
  1: {
    text: "已完善 - 未通过",
    class: "danger",
  },
  2: {
    text: "已完善 - 待审核",
    class: "primary",
  },
  3: {
    text: "未完善",
    class: "warning",
  },
};
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const resData = computed(() => {
  const { infoStatus = "", idCardStatus, companyStatus, schoolStatus } = props.data;
  return {
    hasRealName: idCardStatus === 0,
    hasAuth: companyStatus === 0 || schoolStatus === 0,
    info: statusMap[infoStatus] || {},
  };
});
</script>
<style lang="scss" scoped>
.step-item {
  color: $color-text-lighter;

  &:not(:last-child) {
    margin-bottom: $gap;
  }

  &.primary {
    color: $color-primary;
    font-weight: 600;

    .num {
      background: $color-primary;
    }

    .icon {
      color: $color-primary;
    }
  }

  &.success {
    color: $color-success;
    font-weight: 600;

    .num {
      background: $color-success;
    }

    .icon {
      color: $color-success;
    }
  }

  &.warning {
    color: $color-warning;
    font-weight: 600;

    .num {
      background: $color-warning;
    }

    .icon {
      color: $color-warning;
    }
  }

  &.danger {
    color: $color-danger;
    font-weight: 600;

    .num {
      background: $color-danger;
    }

    .icon {
      color: $color-danger;
    }
  }

  .num {
    margin-right: $gap-qtr;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    border-radius: 50%;
    height: 18px;
    line-height: 18px;
    width: 18px;
    text-align: center;
    background: $color-text-lighter;
  }

  .text {
    margin-right: $gap-qtr;
  }
}
</style>
