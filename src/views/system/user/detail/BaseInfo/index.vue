<!-- 基础信息 -->
<template>
  <!-- 图片审核 -->
  <BaseSection class="imgs" title="图片审核" bodyClass="f-fs-s p-o">
    <template #head-right>
      <el-button @click="openPopup('处理用户', '这是处理用户弹窗中的内容', 'confirm')" type="primary" style="margin-left: auto">处理用户</el-button>
      <el-popconfirm title="确定注销当前用户吗？" width="220" @confirm="showMessage('注销成功')">
        <template #reference>
          <el-button type="info">注销用户</el-button>
        </template>
      </el-popconfirm>
    </template>
    <div class="f-c-s-c mr-o">
      <strong class="title">封面头像</strong>
      <ImgItem rejected @click="handleReject" />
    </div>
    <div class="f-c-s-c mr-o">
      <strong class="title">学历头像</strong>
      <div class="img-item f-c-c-c">
        <BaseImg class="mb-q" />
        <el-button type="success" style="width: 5em" size="small" @click="openPopup(null, '是否要重新比对人脸？', 'dialog', 'confirm')">
          比对人脸
        </el-button>
      </div>
    </div>
    <div class="f-c-s-c mr-o">
      <strong class="title">相册</strong>
      <div class="f-fs-c">
        <ImgItem @click="handleReject" v-for="(item, ind) in 4" :key="ind" />
      </div>
    </div>
  </BaseSection>
  <!-- 基本信息 -->
  <BaseSection class="base-info" title="基本信息">
    <template #head-right>
      <div class="f-1 f-sb-c">
        <div class="tags f-fs-c mr-a">
          <BaseTag class="tag" name="AccountStatus" :value="status" />
          <el-tag class="tag" color="#F3DBFB" style="color: #d359f5; border: 1px solid #d359f5" v-if="true">优质嘉宾</el-tag>
          <el-tag class="tag" color="#CFFAFF" style="color: #2bb4c5; border: 1px solid #2bb4c5" v-if="true">代理人</el-tag>
          <el-tag class="tag" effect="dark">新人曝光期</el-tag>
        </div>
        <div class="comment mr-a f-fs-c">
          <el-button type="danger" size="small" text @click="openEvaluateListPopup(1)" class="f-c-c item positive"> 正面评价({{ 3 }}) </el-button>
          <el-button type="danger" size="small" text @click="openEvaluateListPopup(2)" class="f-c-c item negative"> 负面评价({{ 3 }}) </el-button>
        </div>
        <div class="attitude f-fs-c">
          <el-button type="warning" size="small" text @click="openReportListPopup(1)" class="item">举报({{ 3 }})</el-button>
          <el-button type="warning" size="small" text @click="openReportListPopup(2)" class="item">被举报({{ 3 }})</el-button>
          <el-button type="warning" size="small" text @click="openLoveListPopup(1)" class="item">超级喜欢({{ 3 }})</el-button>
          <el-button type="warning" size="small" text @click="openLoveListPopup(2)" class="item">被超级喜欢({{ 3 }})</el-button>
        </div>
      </div>
    </template>
    <BaseForm styleType="cell" pureText :fields="baseInfoFormFields" v-model="baseInfoForm" />
  </BaseSection>
  <!-- 商业化信息 -->
  <BaseSection class="business-info" title="商业化信息">
    <BaseForm v-model="businessInfoModelData" styleType="cell" pureText :fields="businessInfoFormFields">
      <template #jbye="{ form }">
        <el-button @click="openCoinListPopup" :disabled="!form.jbye" type="primary" size="small" style="min-width: 2em" text>
          {{ form.jbye || 0 }}
        </el-button>
      </template>
    </BaseForm>
  </BaseSection>
  <!-- 详细信息 -->
  <BaseSection class="detail-info" title="详细信息">
    <template #head-right>
      <el-tag :type="infoStatusMap['yes'].type" style="margin-right: auto">
        {{ infoStatusMap["yes"].text }}
      </el-tag>
    </template>
    <BaseForm v-model="detailInfoModelData" styleType="cell" pureText :fields="detailInfoFormFields">
      <template #yyjs>
        <BaseAudio />
      </template>
      <template #gyw="{ form }">
        <AboutTitle @submit="openAboutListPopup(1)" />
        <div>{{ form.gyw }}</div>
      </template>
      <template #wdlxx="{ form }">
        <AboutTitle @submit="openAboutListPopup(2)" type="you" rejected />
        <div>{{ form.wdlxx }}</div>
      </template>
      <template #qghwddf="{ field }">
        <el-tag class="mr-h" v-for="(item, ind) in 3" :key="ind">{{ "北京故宫" + ind }}</el-tag>
      </template>
    </BaseForm>
  </BaseSection>
  <!-- 偏好设置 -->
  <BaseSection title="偏好设置">
    <BaseForm styleType="cell" pureText :fields="preferSetFormFields" />
  </BaseSection>
  <!-- 关联账号 -->
  <BaseSection title="关联账号" class="mb-t">
    <BaseForm styleType="cell" pureText :fields="relatedAccountFormFields" />
  </BaseSection>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import ImgItem from "./_components/ImgItem.vue";
import { ElMessage } from "element-plus";
import RejectAvatar from "./_components/RejectAvatar.vue";
import CoinList from "./_components/CoinList.vue";
import ReportList from "./_components/ReportList.vue";
import LoveList from "./_components/LoveList.vue";
import EvaluateList from "./_components/EvaluateList.vue";
import AboutList from "./_components/AboutList.vue";
import AboutTitle from "./_components/AboutTitle.vue";
import { CommonObj } from "@/vite-env";
import { useDict, usePopup } from "@/hooks";
import { PostMockCommon } from "@/api-mock";
import { showMessage } from "@/utils";
import { FormFieldAttrs } from "@/core/components/form/_types";

const { openPopup, closePopup } = usePopup();
const { getOpts, getText } = useDict();
const genderOpts = getOpts("Gender");
const infoStatusMap: CommonObj = {
  yes: {
    text: "已完善资料",
    type: "success",
  },
  no: {
    text: "未完善资料",
    type: "info",
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
const status = ref(0);
const detailInfoModelData = reactive<CommonObj>({
  gyw: "江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍……",
  wdlxx:
    "希望是90后，净身高希望是90后，净身高希望是90后，希望是90后，净身高希望是90后，净身高希望是90后，净身高净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高……",
});
const baseInfoColAttrs = {
  xs: 24, // <768
  sm: 24, // >=768
  md: 12, // >=992
  lg: 8, // >=1200
  xl: 6, // >=1920
};
const baseInfoFormFields: FormFieldAttrs[] = [
  {
    prop: "yhid",
    label: "用户ID",
    required: true,
  },
  {
    prop: "nc",
    label: "昵称",
  },
  {
    prop: "xb",
    label: "性别",
    type: "select",
    attrs: {
      options: genderOpts,
    },
  },
  {
    tpl: "age",
    prop: "nl",
    label: "年龄",
    type: "input-number",
    quickAttrs: {},
  },
  {
    prop: "sr",
    label: "生日",
    type: "date-picker",
    attrs: {
      type: "date",
    },
  },
  {
    prop: "xz",
    label: "星座",
    attrs: {
      disabled: true,
    },
  },
  {
    prop: "sg",
    label: "身高",
    type: "input-number",
    attrs: {
      min: 100,
      height: 250,
    },
  },
  {
    prop: "xh",
    label: "学号",
  },
  {
    prop: "zy",
    label: "职业",
    type: "select",
  },
  {
    prop: "sru",
    label: "收入",
    type: "BaseNumberRange",
  },
  {
    prop: "hyzk",
    label: "婚姻状况",
    type: "select",
  },
  {
    prop: "wxh",
    label: "微信号",
  },
  {
    tpl: "phone",
    prop: "sr",
    label: "手机号",
    quickAttrs: {},
  },
  {
    prop: "sjh",
    label: "资料完善度",
    type: "input-number",
  },
  {
    prop: "phcs",
    label: "偏好城市",
    type: "cascader",
  },
  {
    prop: "xjd",
    label: "现居地",
    type: "cascader",
  },
  {
    prop: "jx",
    label: "家乡",
  },
  {
    prop: "dwcs",
    label: "定位城市",
  },
  {
    prop: "hjcs",
    label: "户籍城市",
    type: "cascader",
  },
  {
    prop: "lyqd",
    label: "来源渠道",
    type: "select",
  },
  {
    prop: "zczd",
    label: "注册终端",
  },
  {
    prop: "zcip",
    label: "注册IP",
    quickAttrs: {
      grid: baseInfoColAttrs,
    },
  },
  {
    prop: "zjdlip",
    label: "最近登录IP",
    quickAttrs: {
      grid: baseInfoColAttrs,
    },
  },
  {
    prop: "zcsj",
    label: "注册时间",
    quickAttrs: {
      grid: baseInfoColAttrs,
    },
  },
  {
    prop: "zjdlsj",
    label: "最近登录时间",
    required: true,
    attrs: {},
    quickAttrs: {
      popover: "最近登录时间",
      grid: baseInfoColAttrs,
    },
  },
];
const baseInfoForm = reactive<CommonObj>({ yhid: 1, nc: 12233 });
const businessInfoModelData = reactive<CommonObj>({ jbye: 10 });
const businessInfoFormFields: FormFieldAttrs[] = [
  {
    prop: "jbye",
    label: "金币余额",
    type: "custom",
    quickAttrs: {
      grid: 8,
    },
  },
  {
    prop: "tdtq",
    label: "脱单特权",
    quickAttrs: {
      grid: 8,
    },
  },
];
const detailInfoFormFields: FormFieldAttrs[] = [
  {
    prop: "yyjs",
    label: "语音介绍",
    type: "custom",
    quickAttrs: {
      grid: 24,
    },
  },
  {
    prop: "gyw",
    label: "关于我",
    type: "custom",
    quickAttrs: {
      grid: 12,
      valueAlignContent: "flex-start",
    },
  },
  {
    prop: "wdlxx",
    label: "我的理想型",
    type: "custom",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "qghwddf",
    label: "去过好玩的地方",
    type: "custom",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "xhdyd",
    label: "喜欢的运动",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "xhdys",
    label: "喜欢的影视",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "xhdsj",
    label: "喜欢的书籍",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "xhdms",
    label: "喜欢的美食",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "scdlq",
    label: "擅长的乐器",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "cmmldah",
    label: "充满魅力的爱好",
    quickAttrs: {
      grid: 24,
    },
  },
];
const preferSetFormFields: FormFieldAttrs[] = [
  {
    prop: "ppcs",
    label: "匹配城市",
    type: "cascader",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    prop: "yxqx",
    label: "优先权限",
    type: "select",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    tpl: "age",
    prop: "nlfw",
    label: "年龄范围",
    type: "BaseNumberRange",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    prop: "xlyq",
    label: "学历要求",
    type: "select",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    prop: "qgzt",
    label: "情感状态",
    type: "select",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    prop: "sgfw",
    label: "身高范围",
    type: "BaseNumberRange",
    quickAttrs: {
      grid: 6,
    },
    attrs: {
      min: 100,
      max: 250,
    },
  },
  {
    prop: "jx",
    label: "家乡",
    type: "cascader",
    quickAttrs: {
      grid: 6,
    },
  },
  {
    prop: "sfsfrz",
    label: "是否身份认证",
    type: "select",
    quickAttrs: {
      grid: 6,
    },
  },
];
const relatedAccountFormFields: FormFieldAttrs[] = [
  {
    prop: "glsl",
    label: "关联数量",
  },
  {
    prop: "yzx",
    label: "已注销",
  },
];
function handleReject(rejected: boolean) {
  if (rejected) {
    openPopup(
      {
        title: "温馨提示",
        onConfirm() {
          PostMockCommon({}).then(res => {
            ElMessage.success("已取消驳回");
            closePopup("dialog");
          });
        },
      },
      `确定${rejected ? "取消" : ""}驳回？`,
      "dialog",
      "confirm"
    );
  } else {
    openPopup("头像驳回", RejectAvatar);
  }
}
function openCoinListPopup() {
  openPopup("金币明细", CoinList);
}
function openReportListPopup(type: number) {
  openPopup((type === 2 ? "被" : "") + "举报记录", [ReportList, { type }]);
}
function openLoveListPopup(type: number) {
  openPopup((type === 2 ? "被" : "") + "喜欢记录", [LoveList, { type }]);
}
function openEvaluateListPopup(type: number) {
  openPopup((type === 2 ? "负" : "正") + "面评价", [EvaluateList, { type }]);
}
function openAboutListPopup(type: number) {
  openPopup((type === 1 ? "关于我" : "我的理想型") + "提交记录", [AboutList, { type }]);
}
</script>
<style lang="scss" scoped>
.base-section {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
}
:deep(.img-item) {
  .base-img {
    border-radius: $radius-main;
  }
}
.base-info {
  .tags {
    .tag {
      width: 6em;
      &:not(:last-child) {
        margin-right: $gap-half;
      }
    }
  }
  .comment {
    & > .item {
      &:not(:last-child) {
        margin-right: $gap;
      }
    }
    .positive {
      color: $color-danger;
    }
    .negative {
      color: $color-info;
    }
  }
  .attitude {
    color: $color-primary;
    & > .item {
      &:not(:last-child) {
        margin-right: $gap;
      }
    }
  }
}
</style>
