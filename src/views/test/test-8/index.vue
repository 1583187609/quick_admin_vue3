<!-- 页面-聊天记录 -->
<!-- :pageAttrs="{ pageSizes: [5, 10, 15, 20, 25] }"
    :pagination="{ currPage: 1, pageSize: 10 }" -->
<template>
  <CustomCrud
    v-model="model"
    :fields="fields"
    :fetch="getFromUserList"
    :pageAttrs="{ pageSizes: [5, 10, 15, 20, 25] }"
    :pagination="{ currPage: 1, pageSize: 10 }"
    :showPagination="false"
  >
    <template #list="{ list, total, hasMore }">
      <div class="f-sb-s f-1" style="height: 100%">
        <section class="section f-1 f-fs-s-c">
          <header class="header f-c-c f-0">
            <b>搜索结果 ({{ fromUserInfo.list.length }}/{{ fromUserInfo.total }})</b>
          </header>
          <LoadMore
            class="f-1"
            @reachBottom="handleReachBottom('from')"
            :paddingBottom="fromUserInfo.hasMore ? 0 : paddingBottom"
            :loading="fromUserInfo.loading"
            emptyTips="换个姿势搜搜看~"
          >
            <UserItem
              userDataKey="fromUserData"
              @click="handleChangeActive('from', row)"
              :data="row"
              :active="fromUserInfo.activeId === row?.fromUserData?.id"
              isSearchResult
              v-for="(row, ind) in fromUserInfo.list"
              :key="ind"
            />
          </LoadMore>
        </section>
        <section class="section f-1 f-fs-s-c">
          <header class="header f-c-c f-0">
            <b>TA的好友 ({{ toUserInfo.list.length }}/{{ toUserInfo.total }})</b>
          </header>
          <LoadMore
            class="f-1"
            @reachBottom="handleReachBottom('to')"
            :paddingBottom="toUserInfo.hasMore ? 0 : paddingBottom"
            :loading="toUserInfo.loading"
            :emptyTips="fromUserInfo.activeId ? '暂无好友哦~' : '请在左侧选择用户'"
          >
            <UserItem
              userDataKey="toUserData"
              @click="handleChangeActive('to', row)"
              :data="row"
              :active="toUserInfo.activeId === row.toUserData.id"
              v-for="(row, ind) in toUserInfo.list"
              :key="ind"
            />
          </LoadMore>
        </section>
        <section class="section f-2 f-fs-s-c">
          <header class="header f-sb-fe f-0">
            <div class="f-fs-c">
              <div class="f-fs-c">
                【
                <el-tooltip :content="chatInfo.headInfo.fromUser.nickname">
                  <span class="nickname line-1">{{ chatInfo.headInfo.fromUser.nickname || "-" }}</span> </el-tooltip
                >】
              </div>
              <div>与</div>
              <div class="f-fs-c">
                【
                <el-tooltip :content="chatInfo.headInfo.toUser.nickname">
                  <span class="nickname line-1">{{ chatInfo.headInfo.toUser.nickname || "-" }}</span>
                </el-tooltip>
                】
              </div>
              <div class="line-1">的聊天记录</div>
            </div>
            <!-- <div class="first-time f-0">
              首次建立会话时间：{{chatInfo.headInfo.firstDate || '-'}}
            </div> -->
            <el-tooltip :content="'首次建立会话时间：' + chatInfo.headInfo.firstDate">
              <span class="first-time line-1">{{ chatInfo.headInfo.firstDate }}</span>
            </el-tooltip>
            <el-button
              @click="openSearchChat(chatInfo.headInfo.fromUser, chatInfo.headInfo.toUser, model.msgWord)"
              :icon="Search"
              size="small"
              :disabled="!toUserInfo.activeId"
              type="primary"
              class="ml-o"
              plain
              round
              >搜索</el-button
            >
          </header>
          <LoadMore
            class="f-1"
            padding-top="16"
            :paddingBottom="chatInfo.hasMore ? 16 : paddingBottom"
            :loading="chatInfo.loading"
            :topHasMore="chatInfo.prevHasMore"
            @reach-top="handleChatReach('prev')"
            @reach-bottom="handleChatReach('next')"
            :emptyTips="toUserInfo.activeId ? '暂无聊天记录哦~' : '请在左侧选择TA的好友'"
          >
            <template v-for="(row, ind) in chatInfo.list" :key="ind">
              <div class="tips time" v-if="isShowDateStr(row, ind)">
                {{ getDateStr(row.createdAt) }}
              </div>
              <MsgItem
                :data="row"
                :userInfo="chatInfo.headInfo[`${toUserInfo.activeId === row.fromUser.id ? 'to' : 'from'}User`]"
                :position="
                  row.msgType === 'TIMCustomElem' && !doubleTypes.includes(row.msgContent?.Data?.type)
                    ? 'center'
                    : toUserInfo.activeId === row.fromUser.id
                    ? 'left'
                    : 'right'
                "
              />
            </template>
          </LoadMore>
        </section>
      </div>
    </template>
  </CustomCrud>
</template>
<script lang="ts" name="ChatRecords" setup>
import { ref, reactive, inject, watch } from "vue";
import { GetImSearchFromUserList, GetImSearchFriendList, GetImSearchP2pChatList } from "@/api-mock";
import { Search } from "@element-plus/icons-vue";
import CustomCrud from "@/components/CustomCrud/Index.vue";
import { FormField } from "@/components/BaseFormItem";
import UserItem from "./_components/UserItem.vue";
import MsgItem from "./_components/MsgItem/Index.vue";
import { useSelectOpts } from "@/hooks";
import { CommonObj, StrNum } from "@/vite-env";
import LoadMore from "@/components/LoadMore.vue";
import dayjs from "dayjs";
import SearchMsg from "./_components/SearchMsg.vue";

type ChatListQueryDirection = "prev" | "next"; //prev 向上/以前（默认） next向下/以后
const { getSearchOpts } = useSelectOpts();
const openPopup: any = inject("openPopup");
const paddingBottom = 250;
const doubleTypes = [8001, 8003, 8004, 8005, 8006];
const model = reactive<CommonObj>({});
const fromUserInfo = reactive<CommonObj>({
  loading: false,
  activeId: "",
  list: [],
  hasMore: true,
  total: 0,
  params: {
    page: 1,
    pageSize: 10,
  },
});
const toUserInfo = reactive<CommonObj>({
  loading: false,
  activeId: "",
  list: [],
  hasMore: true,
  total: 0,
  params: {
    page: 1,
    pageSize: 10,
  },
});
const chatInfo = reactive<CommonObj>({
  loading: false,
  list: [],
  prevHasMore: true,
  nextHasMore: false,
  total: 0,
  params: {
    // page: 1,
    pageSize: 20,
    prevCreatedAt: 0,
  },
  headInfo: {
    fromUser: {},
    toUser: {},
    firstDate: "",
  },
});
const fields: FormField[] = [
  { prop: "fromUserId", label: "用户ID" },
  { prop: "fromUserCode", label: "号码牌" },
  { prop: "fromUserNickname", label: "昵称" },
  { prop: "toUserId", label: "好友ID" },
  { prop: "msgWord", label: "关键词" },
  { prop: "friendNumScope", label: "好友数量", type: "BaseNumberRange" },
  getSearchOpts("school", { prop: "fromUserSchoolId", label: "学校" }),
  getSearchOpts("company", { prop: "fromUserCompanyId", label: "公司" }),
  { prop: "fromUserRegisterTimeScope", label: "注册时间", type: "date-picker" },
  { prop: "chatTimeScope", label: "会话时间", type: "date-picker" },
];
watch(
  () => fromUserInfo.activeId,
  newFromActiveId => {
    toUserInfo.params.page = 1;
    toUserInfo.activeId = "";
    toUserInfo.list = [];
    chatInfo.list = [];
    getToUserList(newFromActiveId);
  },
  { immediate: true }
);
watch(
  () => toUserInfo.activeId,
  async newToId => {
    if (newToId) {
      const keyWord = model.msgWord;
      const fromId = fromUserInfo.activeId;
      const result = await isOpenSearchMsgPopup(fromId, newToId, keyWord);
      if (result) {
        const { fromUser, toUser } = result;
        openSearchChat(fromUser, toUser, keyWord);
      } else {
        chatInfo.params.prevCreatedAt = 0;
        getChatList(fromUserInfo.activeId, newToId);
      }
    } else {
      chatInfo.list = [];
    }
  },
  { immediate: false }
);
//是否显示日期
function isShowDateStr(row: CommonObj, ind: number, gap = 3 * 60 * 1000) {
  return ind === 0 || chatInfo.list[ind - 1].createdAt < row.createdAt - gap;
}
//发送消息的时间
function getDateStr(time: number) {
  // const y = dayjs().diff(dayjs(time), "years");
  // const M = dayjs().diff(dayjs(time), "months");
  // const d = dayjs().diff(dayjs(time), "days");
  const h = dayjs().diff(dayjs(time), "hours");
  const m = dayjs().diff(dayjs(time), "minutes");
  // const s = dayjs().diff(dayjs(time), "seconds");
  if (h > 1) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return m > 1 ? `${m}分钟前` : "刚刚";
  }
}

//搜索结果列表
async function getFromUserList(params: CommonObj) {
  const { hasMore, list: oldList } = fromUserInfo;
  const { page } = fromUserInfo.params;
  if (!hasMore && page !== 1) return;

  fromUserInfo.loading = true;

  try {
    const res: CommonObj = await GetImSearchFromUserList(params);
    const { list: newList, total, hasMore, currentPage } = res;
    currentPage === 1 && (fromUserInfo.params.page = 1);
    Object.assign(
      fromUserInfo,
      {
        list: currentPage === 1 ? newList : oldList.concat(newList),
        total,
        hasMore,
      },
      currentPage === 1 ? { activeId: newList?.[0]?.fromUserData?.id ?? "" } : undefined
    );
    // return res;
  } catch (err) {
    console.error(err);
  } finally {
    fromUserInfo.loading = false;
  }
}

// Ta的好友列表
function getToUserList(fromUserId: number) {
  if (!fromUserId) return;
  const { hasMore, list: oldList, params } = toUserInfo;
  const { page } = params;
  if (!hasMore && page !== 1) {
    return;
  }
  toUserInfo.loading = true;
  GetImSearchFriendList({
    fromUserId,
    msgWord: model.msgWord,
    chatTimeScope: model.chatTimeScope,
    ...params,
  })
    .then((res: CommonObj) => {
      const { list: newList, total, hasMore, currentPage } = res;
      currentPage === 1 && (toUserInfo.params.page = 1);
      Object.assign(toUserInfo, {
        list: currentPage === 1 ? newList : oldList.concat(newList),
        total,
        hasMore,
      });
    })
    .finally(() => {
      toUserInfo.loading = false;
    });
}
//聊天记录列表
function getChatList(fromUserId: number, toUserId: number, direction: ChatListQueryDirection = "prev") {
  if (!fromUserId || !toUserId) return;
  const { prevHasMore, nextHasMore, list: oldList, params } = chatInfo;
  const { page, prevCreatedAt } = params;
  const isFirstPage = prevCreatedAt === 0;
  if (!isFirstPage) {
    if (direction === "next" && !nextHasMore) {
      return;
    } else if (direction === "prev" && !prevHasMore) {
      return;
    }
  }
  chatInfo.loading = true;
  GetImSearchP2pChatList({
    fromUserId,
    toUserId,
    queryDirection: direction,
    ...params,
  })
    .then((res: CommonObj) => {
      const { list, total, hasMore, firstDate, fromUser, toUser } = res;
      const newList = list.map(item => {
        const { msgContent = {}, ...rest } = item;
        const { Data, Ext } = item.msgContent;
        msgContent.Data = JSON.parse(Data || "{}");
        msgContent.Ext = JSON.parse(Ext || "{}");
        return {
          fromUser: fromUser.id === item.fromUserId ? fromUser : toUser,
          toUser: toUser.id === item.toUserId ? toUser : fromUser,
          msgContent,
          ...rest,
        };
      });
      // console.log(newList, "newList-------------");
      const _list = isFirstPage ? newList : direction === "next" ? [...oldList, ...newList] : [...newList, ...oldList];
      Object.assign(chatInfo, {
        list: _list,
        total,
        [`${direction}HasMore`]: hasMore,
        headInfo: {
          firstDate,
          fromUser,
          toUser,
        },
      });
    })
    .finally(() => {
      chatInfo.loading = false;
    });
}
/**
 * 是否要自动打开消息搜索弹窗
 * @return 返回类型 null | { fromUser: CommonObj; toUser: CommonObj }
 */
async function isOpenSearchMsgPopup(
  fromUserId: StrNum,
  toUserId: StrNum,
  keyWord: string
): null | { fromUser: CommonObj; toUser: CommonObj } {
  if (keyWord) {
    return await GetImSearchP2pChatList({
      fromUserId,
      toUserId,
      msgWord: keyWord,
    })
      .then((res: CommonObj) => {
        if (res?.list?.length >= 2) {
          const { fromUser, toUser } = res;
          return { fromUser, toUser };
        } else {
          return null;
        }
      })
      .catch(() => null);
  }
}
//处理点击搜索结果、Ta的好友的用户项时
function handleChangeActive(type: "from" | "to", row: CommonObj) {
  if (type === "from") {
    fromUserInfo.activeId = row?.fromUserData?.id;
    toUserInfo.params.page = 1;
  } else if (type === "to") {
    toUserInfo.activeId = row.toUserData.id;
    Object.assign(chatInfo, {
      nextHasMore: true,
      prevHasMore: true,
      prevCreatedAt: 0,
    });
  }
}
//触底事件
function handleReachBottom(type: "from" | "to") {
  if (type === "from") {
    fromUserInfo.params.page++;
    getFromUserList({ ...model, ...fromUserInfo.params });
  } else if (type === "to") {
    toUserInfo.params.page++;
    getToUserList(fromUserInfo.activeId);
  }
}
//处理聊天列表触顶/触底事件
function handleChatReach(direction: ChatListQueryDirection) {
  const last = direction === "prev" ? chatInfo.list[0] : chatInfo.list.slice(-1)[0];
  if (!last) return;
  chatInfo.params.prevCreatedAt = last.createdAt + (direction === "prev" ? -1 : 1);
  getChatList(fromUserInfo.activeId, toUserInfo.activeId, direction);
}
//打开聊天记录搜索对话框
function openSearchChat(fromUser: CommonObj, toUser: CommonObj, keyWord?: string) {
  openPopup(`【${fromUser.nickname || "-"}】与【${toUser.nickname || "-"}】的聊天记录搜索`, {
    component: SearchMsg,
    attrs: {
      fromUser,
      toUser,
      keyWord,
      onSelect: handleSearchSelectItem,
    },
  });
}
//处理搜索聊天记录时选中某个聊天项
function handleSearchSelectItem(row: CommonObj, searchVal: string, next: () => void) {
  // model.msgWord = searchVal;
  // chatInfo.params.prevCreatedAt = 0;
  chatInfo.list = [];
  chatInfo.prevHasMore = true;
  chatInfo.nextHasMore = true;
  chatInfo.params.prevCreatedAt = row.createdAt + 1;
  getChatList(fromUserInfo.activeId, toUserInfo.activeId);
  next();
}
</script>
<style lang="scss" scoped>
$padding-bottom: 250px;
.section {
  height: 100%;
  border-radius: $radius-main;
  background: #fff;
  overflow: hidden;
  @include shadow-main();
  .header {
    padding: $gap-half $gap;
    border-bottom: $border-main;
    .first-time {
      color: $color-text-light;
      font-size: 13px;
      margin: 0 auto 0 $gap-half;
    }
  }
  &:not(:last-child) {
    margin-right: $gap-half;
  }
  &:nth-child(3) {
    .header {
      .nickname {
        max-width: 10em;
      }
    }
    .load-more {
      padding: 0 $gap;
      .tips {
        padding: $gap-qtr 0;
        text-align: center;
        color: $color-text-light;
        font-size: 13px;
        &.time {
        }
        &.text {
          font-size: 12px;
        }
      }
      .time-box {
      }
      .message {
        &:not(:last-child) {
          margin-bottom: $gap-one-half;
        }
      }
    }
  }
}
</style>
