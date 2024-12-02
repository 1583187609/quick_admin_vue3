<template>
  <div class="user-item f-sb-s" :class="{ active }">
    <!-- <div class="avatar-box f-0">
      <BaseAvatar
        :to="{ name: 'userDetail', query: { id: data?.[userDataKey]?.id } }"
        :src="data?.[userDataKey]?.avatar"
        :gender="data?.[userDataKey]?.gender"
        class="avatar"
        round
      />
      <el-tooltip content="已完成身份认证" v-bind="defaultTooltipAttrs" v-if="data?.[userDataKey].authType !== 1">
        <BaseIcon name="SuccessFilled" size="20" class="auth-icon" />
      </el-tooltip>
    </div>
    <div class="info-box f-1 f-sb-s-c">
      <div class="f-fs-c">
        <b
          @click.stop="
            $router.push({
              name: 'userDetail',
              query: { id: data?.[userDataKey]?.id },
            })
          "
          class="nickname line-1 mr-a"
        >
          {{ data?.[userDataKey]?.nickname || emptyStr }}
        </b>
        <BaseTag
          name="D_AccountStatus"
          class="f-0 ml-h"
          :value="data[userDataKey].accountStatus"
          v-if="data[userDataKey].accountStatus !== 0"
        />
      </div>
      <div class="f-fs-c tips-info">
        <BaseCopy class="f-0" :text="data?.[userDataKey]?.id" line="1" />
        <div class="ml-h mr-h f-1 line-1">
          {{ getText("Region", data?.[userDataKey]?.liveCity) || emptyStr }}
        </div>
        <div class="f-0">{{ data?.[userDataKey]?.age }}岁</div>
      </div>
      <div class="num-info f-sb-c" v-if="isSearchResult">
        <span>好友{{ data?.countFriend }}/有效{{ data?.countFriendValid }}/过期{{ data?.countFriendInvalid }}</span>
        <time class="line-1">{{ data?.latestDate }}</time>
      </div>
      <div class="f-sb-c" v-else>
        <el-tag class="tag" :type="converStatus.type" size="small">{{ converStatus.text }}</el-tag>
        <span class="num-info line-1">{{ data?.latestDate }}</span>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { getCountDownTimeStr } from "@/utils";

const props = withDefaults(
  defineProps<{
    data: CommonObj;
    active?: boolean;
    userDataKey?: string;
    isSearchResult?: boolean;
  }>(),
  {
    userDataKey: "userData",
  }
);
const converStatus: CommonObj = getConversationStatus();
//获取会话状态
function getConversationStatus() {
  if (props.isSearchResult) {
    return { type: "", text: "" };
  } else {
    return getConversationTag(props.data);
  }
}
/**
 * 获取会话的状态标签
 * 谁先不喜欢，0=无,1=我,2=Ta
 * status状态: 0正常 1失效
 */
function getConversationTag(row: CommonObj) {
  const { status, endTime } = row;
  if (status === 0) {
    const { text, type } = getCountDownTimeStr(endTime);
    return {
      text: "好友：" + text,
      type,
    };
  } else {
    return {
      text: "失效会话",
      type: "info",
    };
  }
}
</script>
<style lang="scss" scoped>
.user-item {
  cursor: pointer;
  padding: $gap-half $gap-half;
  &:hover {
    background: $color-bg-lighter;
  }
  &.active {
    background: $color-bg-main;
  }
}
.avatar-box {
  margin-right: $gap-half;
  $size: 90px;
  position: relative;
  .avatar {
    @include shadow-main;
  }
  .auth-icon {
    color: $color-primary;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.info-box {
  .nickname {
    font-size: 13px;
    font-weight: 600;
    &:hover {
      color: $color-primary;
      text-decoration: underline;
    }
  }
  .tips-info {
    margin-bottom: $gap-qtr;
    font-size: 12px;
    color: $color-text-light;
  }
  .num-info {
    font-size: 12px;
  }
  .tag {
    width: fit-content;
  }
}
</style>
