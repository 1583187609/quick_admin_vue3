<!-- 高颜值工作台 -->
<template>
  <div class="q-page-view f-sb-s">
    <div class="f-3 main">
      <div class="row pannels f-fs-s">
        <div class="pannel f-1" v-for="(item, ind) in 3" :key="ind">
          <div class="head">金融公司</div>
          <div class="body f-sb-c">
            <BaseNumber :value="98921" />
            <BaseIcon size="1.3em" />
          </div>
          <div class="foot">上周新增了<span>10%</span></div>
        </div>
      </div>
      <BaseSection title="总体数据" class="row">
        <template #head-right>
          <el-radio-group v-model="nearType" class="ml-a">
            <el-radio-button value="week">近一周</el-radio-button>
            <el-radio-button value="month">近一月</el-radio-button>
            <el-radio-button value="year">近一年</el-radio-button>
          </el-radio-group>
        </template>
        <ChartLine />
      </BaseSection>
      <BaseSection title="货币类型" class="row">
        <BaseTable :cols="cols" :data="tableData"></BaseTable>
      </BaseSection>
    </div>
    <div class="f-1 side">
      <BaseSection title="金融" class="row financial">
        <div class="f-sb-c data">
          <div class="money">
            <div class="f-fs-b">5276.33<span class="unit">元</span></div>
          </div>
          <BaseIcon class="icon" />
        </div>
        <ChartBar />
      </BaseSection>
      <BaseSection title="兑换" class="row exchange">
        <div class="f-sb-c alert">
          <div>兑换</div>
          <BaseIcon />
          <div>兑换</div>
        </div>
        <el-button type="primary" style="width: 100%">立即购买</el-button>
      </BaseSection>
      <BaseSection title="兑换记录" class="row">
        <BaseTable :cols="exchangeCols" :data="exchangeTableData"></BaseTable>
      </BaseSection>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import ChartLine from "@/core/components/chart/ChartLine.vue";
import { TableColAttrs } from "@/core/components/table/_types";
import ChartBar from "@/core/components/chart/ChartBar.vue";

const nearType = ref("week");
const cols: TableColAttrs[] = [
  { prop: "id", label: "ID" },
  { prop: "price", label: "价格" },
  { prop: "date", label: "日期" },
  { prop: "type", label: "类型" },
  { prop: "is_rise", label: "盈亏" },
  { prop: "status", label: "订单状态" },
];
const tableData: CommonObj[] = Array(12)
  .fill("")
  .map((item, ind) => {
    return { id: ind, price: "12.00", date: "2025-01-17", type: "1", is_rise: ind % 2, status: ind % 2 };
  });
const exchangeCols: TableColAttrs[] = [
  { prop: "monetary_1", label: "货币" },
  { prop: "monetary_2", label: "货币" },
  { prop: "is_rise", label: "盈亏" },
];
const exchangeTableData: CommonObj[] = Array(10)
  .fill("")
  .map((item, ind) => {
    return { monetary_1: 1232, monetary_2: 23243, is_rise: "1.6%" };
  });
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: $gap;
}
.main {
}
.side {
  margin-left: $gap;
  min-width: 300px;
}
.pannels {
  .pannel {
    background: $color-bg-main;
    border-radius: $radius-main;
    padding: $gap;
    @include shadow-main();
    &:not(:last-child) {
      margin-right: $gap;
    }
    .head {
      font-weight: bold;
      font-size: $font-size-heavy;
    }
    .body {
      padding: $gap-half 0 $gap-qtr;
      font-size: 2.2em;
    }
    .foot {
      font-size: $font-size-light;
    }
  }
}
.financial {
  font-size: 2.5em;
  .data {
    padding: $gap 0;
    .money {
      .unit {
        font-size: 0.5em;
        margin-left: $gap-qtr;
      }
    }
    .icon {
    }
  }
}
.exchange {
  .alert {
    font-size: 1.2em;
    padding: $gap;
    margin-bottom: $gap;
  }
}
</style>
