<!-- 基础信息 -->
<template>
  <!-- 头像、图片 -->
  <BaseSection class="imgs" title="图片审核" bodyClass="f-fs-s p-o">
    <template #head-right>
      <el-button type="primary" style="margin-left: auto">处理用户</el-button>
      <el-button type="info">注销用户</el-button>
    </template>
    <div class="f-c-s-c mr-o">
      <strong class="title">封面头像</strong>
      <ImgItem rejected @click="handleReject" />
    </div>
    <div class="f-c-s-c mr-o">
      <strong class="title">学历头像</strong>
      <div class="img-item f-c-c-c">
        <BaseImg class="mb-q" />
        <el-button type="success" style="width: 5em" size="small" @click="openPopup(null, '是否要重新比对人脸？', 'dialog')">
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
        <div class="tags f-fs-c" style="margin-right: auto">
          <el-tag class="tag" v-bind="statusMap[status]">{{ statusMap[status].text }}</el-tag>
          <el-tag class="tag" color="#F3DBFB" style="color: #d359f5; border: 1px solid #d359f5" v-if="true">优质嘉宾</el-tag>
          <el-tag class="tag" color="#CFFAFF" style="color: #2bb4c5; border: 1px solid #2bb4c5" v-if="true">代理人</el-tag>
          <el-tag class="tag" effect="dark">新人曝光期</el-tag>
        </div>
        <div class="comment f-fs-c">
          <div class="f-c-c item positive">
            <BaseIcon class="mr-q" />
            <span>正面评价 {{ 3 }}</span>
          </div>
          <div class="f-c-c item negative">
            <BaseIcon class="mr-q" />
            <span>负面评价 {{ 3 }}</span>
          </div>
        </div>
        <div class="attitude f-fs-c">
          <span class="item">被举报 {{ 3 }}</span>
          <span class="item">举报 {{ 3 }}</span>
          <span class="item">超级喜欢 {{ 3 }}</span>
          <span class="item">被超级喜欢 {{ 3 }}</span>
        </div>
      </div>
    </template>
    <!-- <CellForm :fields="baseInfoFormFields" v-model="baseInfoForm" /> -->
    <CellTable :fields="baseInfoFormFields" :data="baseInfoForm" />
    <!-- <CellTable :data="baseInfoTableData" /> -->
  </BaseSection>
  <!-- 商业化信息 -->
  <BaseSection class="business-info" title="商业化信息">
    <!-- <CellForm :fields="businessInfoFormFields" /> -->
    <CellTable :fields="businessInfoFormFields" />
  </BaseSection>
  <!-- 详细信息 -->
  <BaseSection class="detail-info" title="详细信息">
    <template #head-right>
      <el-tag :type="infoStatusMap['yes'].type" style="margin-right: auto">
        {{ infoStatusMap["yes"].text }}
      </el-tag>
    </template>
    <CellTable :fields="detailInfoFormFields">
      <template #yyjs-label>
        <strong style="line-height: 28px">语音介绍</strong>
      </template>
      <template #yyjs-value>
        <VideoPannel />
      </template>
      <template #gyw-label>
        <AboutTitle />
      </template>
      <template #wdlxx-label>
        <AboutTitle type="you" rejected />
      </template>
      <template #gyw-value>
        <div>
          江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍江西人，清华本科，关于我的介绍……
        </div>
      </template>
      <template #wdlxx-value>
        <div>
          希望是90后，净身高希望是90后，净身高希望是90后，希望是90后，净身高希望是90后，净身高希望是90后，净身高净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高希望是90后，净身高……
        </div>
      </template>
      <template #xqah>
        <div class="f-sb-c">
          <strong style="margin-right: auto">兴趣爱好</strong>
          <el-button type="info" size="small">选择</el-button>
          <el-button type="primary" size="small">驳回</el-button>
        </div>
      </template>
      <template #qghwddf="{ field }">
        <el-tag class="mr-h" v-for="(item, ind) in 3" :key="ind">{{ "北京故宫" + ind }}</el-tag>
      </template>
    </CellTable>
  </BaseSection>
  <!-- 偏好设置 -->
  <BaseSection title="偏好设置">
    <!-- <CellForm :fields="preferSetFormFields" /> -->
    <CellTable :fields="preferSetFormFields" />
  </BaseSection>
  <!-- 关联账号 -->
  <BaseSection title="关联账号">
    <!-- <CellForm :fields="relatedAccountFormFields" /> -->
    <CellTable :fields="relatedAccountFormFields" />
  </BaseSection>
  <div class="mt-o">
    <el-button @click="openCoinListPopup" type="primary">打开金币列表弹窗</el-button>
    <el-button @click="openReportListPopup(1)" type="primary">打开举报记录弹窗</el-button>
    <el-button @click="openReportListPopup(2)" type="primary">打开被举报记录弹窗</el-button>
    <el-button @click="openLoveListPopup(1)" type="primary">打开喜欢记录弹窗</el-button>
    <el-button @click="openLoveListPopup(2)" type="primary">打开被喜欢记录弹窗</el-button>
    <el-button @click="openEvaluateListPopup(1)" type="primary">打开正面评价记录弹窗</el-button>
    <el-button @click="openEvaluateListPopup(2)" type="primary">打开负面评价记录弹窗</el-button>
    <el-button @click="openAboutListPopup(1)" type="primary">打开关于你提交记录弹窗</el-button>
    <el-button @click="openAboutListPopup(2)" type="primary">打开关于我提交记录弹窗</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject, h } from "vue";
import ImgItem from "./_components/ImgItem.vue";
import CellForm, { CellFormField } from "@/components/form/CellForm.vue";
import CellTable, { CellTableFieldItem } from "@/components/table/CellTable.vue";
import { ElMessage } from "element-plus";
import RejectAvatar from "./_components/RejectAvatar.vue";
import CoinList from "./_components/CoinList.vue";
import ReportList from "./_components/ReportList.vue";
import LoveList from "./_components/LoveList.vue";
import EvaluateList from "./_components/EvaluateList.vue";
import AboutList from "./_components/AboutList.vue";
import AboutTitle from "./_components/AboutTitle.vue";
import VideoPannel from "./_components/VideoPannel.vue";
import { CommonObj } from "@/vite-env";
import { useDictMap } from "@/hooks";
const openPopup: any = inject("openPopup");
const closePopup: any = inject("closePopup");
const { getOpts } = useDictMap();
const genderOpts = getOpts("Gender");
const statusMap: CommonObj = {
  normal: {
    text: "正常",
    type: "success",
  },
  forbidden: {
    text: "封禁",
    type: "danger",
  },
  signOut: {
    text: "注销",
    type: "warning",
  },
  singleOut: {
    text: "已脱单",
    type: "primary",
  },
  limitActive: {
    text: "限制互动",
    type: "info",
  },
};
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
const status = ref("normal");
const baseInfoColAttrs = {
  xs: 24, // <768
  sm: 24, // >=768
  md: 12, // >=992
  lg: 8, // >=1200
  xl: 6, // >=1920
};
const baseInfoFormFields: CellTableFieldItem[] = [
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
    options: genderOpts,
  },
  {
    prop: "nl",
    label: "年龄",
    type: "input-number",
    extraAttrs: {
      valid: "age",
    },
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
    prop: "sr",
    label: "手机号",
    extraAttrs: {
      valid: "phone",
    },
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
  // {
  //   prop: "",
  //   label: "",
  //   type: "empty",
  // },
  {
    prop: "zczd",
    label: "注册终端",
  },
  {
    prop: "zcip",
    label: "注册IP",
    // style: "flex-basis: 400px;",
    // colAttrs: baseInfoColAttrs,
    attrs: {},
  },
  {
    prop: "zjdlip",
    label: "最近登录IP",
    // style: "flex-basis: 400px;",
    // colAttrs: baseInfoColAttrs,
    attrs: {},
  },
  {
    prop: "zcsj",
    label: "注册时间",
    // style: "flex-basis: 400px;",
    // colAttrs: baseInfoColAttrs,
    attrs: {},
  },
  {
    prop: "zjdlsj",
    label: "最近登录时间",
    // style: "flex-basis: 400px;",
    // colAttrs: baseInfoColAttrs,
    required: true,
    attrs: {},
    extraAttrs: {
      popover: "最近登录时间",
    },
  },
];
const baseInfoForm = reactive({ yhid: 1, nc: 12233 });
const businessInfoFormFields: CellTableFieldItem[] = [
  {
    prop: "jbye",
    label: "金币余额",
    // colAttrs: { span: 6 },
  },
  {
    prop: "tdtq",
    label: "脱单特权",
    // colAttrs: { span: 6 },
  },
];
const detailInfoFormFields: CellTableFieldItem[] = [
  {
    prop: "yyjs-label",
    label: "语音介绍",
    type: "none",
    colAttrs: { span: 12 },
    // style: "flex-basis: 100%",
  },
  {
    prop: "yyjs-value",
    label: "语音介绍",
    type: "none",
    colAttrs: { span: 12 },
    // style: "flex-basis: 100%",
  },
  {
    prop: "gyw-label",
    label: "关于我",
    type: "none",
    colAttrs: { span: 12 },
    attrs: {
      direction: "vertical",
    },
    // style: "flex-basis: 50%",
  },
  {
    prop: "wdlxx-label",
    label: "我的理想型",
    type: "none",
    colAttrs: { span: 12 },
    // style: "flex-basis: 50%",
  },
  {
    prop: "gyw-value",
    label: "关于我",
    type: "none",
    colAttrs: { span: 12 },
    attrs: {
      direction: "vertical",
    },
    // style: "flex-basis: 50%",
  },
  {
    prop: "wdlxx-value",
    label: "我的理想型",
    type: "none",
    colAttrs: { span: 12 },
    // style: "flex-basis: 50%",
  },
  {
    prop: "xqah",
    label: "兴趣爱好",
    type: "none",
    colAttrs: { span: 24 },
    // style: "flex-basis: 50%",
  },
  {
    prop: "qghwddf",
    label: "去过好玩的地方",
    direction: "vertical",
    type: "custom",
    // colAttrs: { span: 3 },
  },
  {
    prop: "xhdyd",
    label: "喜欢的运动",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
  {
    prop: "xhdys",
    label: "喜欢的影视",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
  {
    prop: "xhdsj",
    label: "喜欢的书籍",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
  {
    prop: "xhdms",
    label: "喜欢的美食",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
  {
    prop: "scdlq",
    label: "擅长的乐器",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
  {
    prop: "cmmldah",
    label: "充满魅力的爱好",
    direction: "vertical",
    // colAttrs: { span: 3 },
  },
];
// const hobbyFormFields: CellTableFieldItem[] = [
//   {
//     prop: "qghwddf",
//     label: "去过好玩的地方",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "xhdyd",
//     label: "喜欢的运动",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "xhdys",
//     label: "喜欢的影视",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "xhdsj",
//     label: "喜欢的书籍",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "xhdms",
//     label: "喜欢的美食",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "scdlq",
//     label: "擅长的乐器",
//     colAttrs: { span: 3 },
//   },
//   {
//     prop: "cmmldah",
//     label: "充满魅力的爱好",
//     colAttrs: { span: 3 },
//   },
// ];
const preferSetFormFields: CellTableFieldItem[] = [
  {
    prop: "ppcs",
    label: "匹配城市",
    type: "cascader",
    // colAttrs: { span: 6 },
  },
  {
    prop: "yxqx",
    label: "优先权限",
    type: "select",
    // colAttrs: { span: 6 },
  },
  {
    prop: "nlfw",
    label: "年龄范围",
    type: "BaseNumberRange",
    // colAttrs: { span: 6 },
    extraAttrs: {
      valid: "age",
    },
  },
  {
    prop: "xlyq",
    label: "学历要求",
    type: "select",
    // colAttrs: { span: 6 },
  },
  {
    prop: "qgzt",
    label: "情感状态",
    type: "select",
    // colAttrs: { span: 6 },
  },
  {
    prop: "sgfw",
    label: "身高范围",
    type: "BaseNumberRange",
    // colAttrs: { span: 6 },
    attrs: {
      min: 100,
      max: 250,
    },
  },
  {
    prop: "jx",
    label: "家乡",
    type: "cascader",
    // colAttrs: { span: 6 },
  },
  {
    prop: "sfsfrz",
    label: "是否身份认证",
    type: "select",
    // colAttrs: { span: 6 },
  },
];
const relatedAccountFormFields: CellTableFieldItem[] = [
  {
    prop: "glsl",
    label: "关联数量",
  },
  {
    prop: "yzx",
    label: "已注销",
  },
];
const baseInfoTableData: CommonObj = {};
function handleReject(rejected: boolean) {
  if (rejected) {
    openPopup(
      {
        title: "温馨提示",
        confirm() {
          ElMessage.success("已取消驳回");
          closePopup("dialog");
        },
      },
      `确定${rejected ? "取消" : ""}驳回？`,
      "dialog",
      true
    );
  } else {
    openPopup("头像驳回", RejectAvatar, "dialog", false);
  }
}
function openCoinListPopup() {
  openPopup("金币明细", CoinList, "dialog", false);
}
function openReportListPopup(type: number) {
  openPopup((type === 2 ? "被" : "") + "举报记录", h(ReportList, { type }), "dialog", false);
}
function openLoveListPopup(type: number) {
  openPopup((type === 2 ? "被" : "") + "喜欢记录", h(LoveList, { type }), "dialog", false);
}
function openEvaluateListPopup(type: number) {
  openPopup((type === 2 ? "负" : "正") + "面评价", h(EvaluateList, { type }), "dialog", false);
}
function openAboutListPopup(type: number) {
  openPopup((type === 2 ? "关于我" : "关于你") + "提交记录", h(AboutList, { type }), "dialog", false);
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
    margin-right: $gap-two;
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
.detail-info {
}
</style>
