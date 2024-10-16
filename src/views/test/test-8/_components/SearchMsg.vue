<!-- 组件-聊天记录搜索-->
<template>
  <div class="search-msg f-fs-s-c">
    <el-input
      class="mb-h f-0"
      v-debounce:input="(e:any)=>handleInput(e)"
      v-model="searchVal"
      placeholder="请输入关键词"
      clearable
      @clear="handleClear"
      :suffix-icon="Search"
      v-focus
    />
    <LoadMore :loading="msgsInfo.loading" class="list" @reachBottom="handleReachBottom" max-height="calc(100vh - 200px)">
      <div @click="handleClick(item)" class="item" v-for="(item, ind) in msgsInfo.list" :key="ind">
        <div class="f-fs-c">
          <b class="nickname mr-o">{{ item.user.nickname }}</b>
          <time class="time">{{ item.createdDate }}</time>
        </div>
        <div class="line-1" v-html="getHtml(item)"></div>
      </div>
    </LoadMore>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, inject, watchEffect } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ClosePopupInject, CommonObj } from "@/vite-env";
import { GetImSearchP2pChatList } from "@/api-mock";
import LoadMore from "@/components/LoadMore.vue";
import cssVars from "@/assets/styles/_var.module.scss";
import { ElMessage } from "element-plus";

const closePopup = inject<ClosePopupInject>("closePopup");

const props = withDefaults(
  defineProps<{
    fromUser: CommonObj;
    toUser: CommonObj;
    keyWord?: string;
  }>(),
  {}
);
const $emit = defineEmits(["select"]);
const searchVal = ref(props.keyWord);
const msgsInfo = reactive<CommonObj>({
  loading: false,
  list: [],
  hasMore: true,
  params: {
    prevCreatedAt: 0,
    pageSize: 15,
  },
});
const stopWatch = watchEffect(() => {
  getMsgsList(props.keyWord);
});
stopWatch();
function getHtml(data: CommonObj, style: string = `color:${cssVars.colorPrimary};`) {
  const { msgContent } = data;
  const val = searchVal.value?.trim();
  return msgContent.Text.replaceAll(val, `<span style='${style}'>${val}</span>`);
}
//处理输入框输入事件
function handleInput(e: any) {
  getMsgsList(searchVal.value);
}
//点击清除按钮
function handleClear() {
  Object.assign(msgsInfo, { list: [], prevCreatedAt: 0, hasMore: true });
}
//处理触底事件
function handleReachBottom() {
  const { list } = msgsInfo;
  msgsInfo.params.prevCreatedAt = list.slice(-1)?.[0]?.createdAt + 1;
  getMsgsList(searchVal.value);
}
//获取查询到的消息列表
function getMsgsList(val: string = "") {
  val = val?.trim();
  if (!val) {
    handleClear();
    return;
  }
  const { fromUser, toUser } = props;
  const { hasMore, list: oldList, params } = msgsInfo;
  const { prevCreatedAt } = params;
  const isFirstPage = prevCreatedAt === 0;
  if (!isFirstPage && !hasMore) {
    ElMessage.warning("底部没有更多了");
    return;
  }
  msgsInfo.loading = true;
  GetImSearchP2pChatList({
    fromUserId: fromUser.id,
    toUserId: toUser.id,
    // queryDirection: "next",
    msgWord: val,
    isListReverse: 0, //数据列表顺序是否反转,1=是(默认),0不
    ...msgsInfo.params,
  })
    .then((res: CommonObj) => {
      const { fromUser, toUser } = props;
      const { list, hasMore, fromUserId } = res;
      const newList = list.map((item: CommonObj, ind: number) => {
        item.user = fromUserId === item.fromUserId ? fromUser : toUser;
        return item;
      });
      Object.assign(msgsInfo, {
        list: isFirstPage ? newList : oldList.concat(newList),
        hasMore,
      });
    })
    .finally(() => {
      msgsInfo.loading = false;
    });
}
function handleClick(row: CommonObj) {
  $emit("select", row, searchVal.value, () => {
    closePopup();
  });
}
</script>
<style lang="scss" scoped>
.search-msg {
  width: 700px;
}
.list {
  // max-height: calc(100vh - 200px);
  overflow: auto;
  .item {
    cursor: pointer;
    padding: $gap-half;
    &:hover {
      background: $color-bg-lighter;
    }
    &:not(:last-child) {
      border-bottom: $border-main;
    }
    .nickname {
      color: $color-text-main;
      font-size: 13px;
    }
    .time {
      color: $color-text-light;
      font-size: 13px;
    }
  }
}
</style>
