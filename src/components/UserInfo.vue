<!-- 组件 - 用户信息 -->
<template>
  <div class="user-info f-sb-s" v-if="data">
    <template v-if="simple">
      <BaseAvatar class="avatar simple f-0 mr-8" :src="data.avatar" :gender="data.gender" />
      <div class="f-1 f-sb-s-c">
        <b @click="toUserDetail" class="nickname q-line-1">{{ data.nickname || "-" }}</b>
        <div class="f-fs-c">
          <div class="f-0 mr-o">
            ID：<BaseCopy maxLine="1">{{ data.id }}</BaseCopy>
          </div>
          <BaseTag class="f-0 gender" name="D_Gender" :value="data.gender" size="small" pureText />
        </div>
        <div class="f-sb-c">
          <BaseTag class="f-0" name="D_AccountStatus" :value="data.account_status" size="small" />
          <BaseTag class="f-0" name="D_AuthCase" :value="getAuthStatus(data)" size="small" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="avatar-box f-0 mr-8">
        <el-popover :show-after="200" :hide-after="0" trigger="hover" v-if="data.company_status === 0">
          <template #reference>
            <BaseTag class="company" name="D_AuthCase" value="3">公司</BaseTag>
          </template>
          <div>{{ data.company_name }}</div>
        </el-popover>
        <BaseAvatar class="avatar" :src="data.avatar" :gender="data.gender" />
        <el-popover :show-after="200" :hide-after="0" trigger="hover" v-if="data.school_status === 0">
          <template #reference>
            <BaseTag class="education" name="D_AuthCase" value="2">学历</BaseTag>
          </template>
          <div>
            {{ getText("D_EducationType", data.school_certificate_level ?? 0) || "-" }}
          </div>
        </el-popover>
      </div>
      <div class="f-1 f-sb-s-c">
        <div class="f-sb-c">
          <b @click="toUserDetail" class="nickname q-line-1">{{ data.nickname || "-" }}</b>
          <BaseTag class="f-0 gender" name="D_Gender" :value="data.gender" size="small" pureText />
          <span class="f-0 age">{{ data.age || "0" }}岁</span>
          <BaseTag class="f-0 ml-h mr-a" name="D_MatrimonyStatus" :value="data.single_type" size="small" pureText />
          <BaseTag class="f-0" name="D_AccountStatus" :value="data.account_status" size="small" />
        </div>
        <div class="f-sb-c">
          <div class="item">
            ID：<BaseCopy maxLine="1">{{ data.id }}</BaseCopy>
          </div>
          <div class="item">
            学号：<BaseCopy maxLine="1">{{ data.user_code }}</BaseCopy>
          </div>
        </div>
        <div class="f-sb-c">
          <div class="item">
            学历：<b>{{ getText("D_EducationType", data.school_certificate_level ?? 0) || "-" }}</b>
          </div>
          <div class="item q-line-1">
            学校：<b>{{ data.school_name || "-" }}</b>
          </div>
        </div>
        <div class="f-sb-fs">
          <div class="item q-line-1">
            职业：<b>{{ data.job_name || "-" }}</b>
          </div>
          <div class="item">
            收入：<b>{{ data.income_type_name || "-" }}</b>
          </div>
        </div>
        <div class="f-sb-c">
          <div class="item q-line-1">
            现居地：<b>{{ liveCityText }}</b>
          </div>
          <div class="item q-line-1">
            家乡：<b>{{ cityText }}</b>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { useDict } from "@/hooks";
import { getCascaderText } from "@/core/hooks/dict";

const router = useRouter();
const { getText, getOpts } = useDict();
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    simple?: boolean;
  }>(),
  {
    data: () => ({}),
  }
);
const liveCityText = ref("");
const cityText = ref("");
init();
function init() {
  const text = getText("C_Region", props.data.live_city ?? []);
  if (text === "string") {
    liveCityText.value = text as string;
    cityText.value = getText("C_Region", props.data.city ?? []) as string;
    return;
  }
  getOpts("C_Region").then((res: OptionItem[]) => {
    liveCityText.value = getCascaderText(res, props.data.live_city, "-");
    cityText.value = getCascaderText(res, props.data.city, "-");
  });
}

function getAuthStatus(data) {
  const { company_status, school_status } = data;
  let status = 0;
  if (company_status === 0 && school_status === 0) {
    status = 4;
  } else {
    if (company_status === 0) {
      status = 3;
    } else if (school_status === 0) {
      status = 2;
    } else {
      status = 1;
    }
  }
  return status;
}
function toUserDetail() {
  router.push({ name: "systemUserDetail", query: { id: props.data.id } });
}
</script>
<style lang="scss" scoped>
.user-info {
  text-align: left;
  line-height: 1.4em;
}
.avatar-box {
  position: relative;
  .el-tag {
    position: absolute;
    top: 0;
    z-index: 1;
    opacity: 0.6;
    &.company {
      left: 0;
    }
    &.education {
      right: 0;
    }
  }
}
.avatar {
  height: 8.6em;
  width: 8.6em;
  border-radius: $radius-light;
  &.simple {
    height: 5em;
    width: 5em;
  }
}
.nickname {
  font-size: $font-size-main;
  &:hover {
    cursor: pointer;
    color: $color-primary;
    text-decoration: underline;
  }
}
.gender {
  margin: 0 $gap-half;
}
.item {
  flex-basis: 50%;
  &:first-child {
    margin-right: 0.1em;
  }
}
</style>
