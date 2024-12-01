import { CommonObj } from "@/vite-env";
import { typeOf } from "@/core/utils";

//整理Avatar审核的要传入组件的数据
export function getAvatarRowData(row: CommonObj): CommonObj {
  const { id, age, gender, nickname, avatar } = row.userData;
  const { cnt, noPassCnt } = row.avatarUploadData;
  return {
    userId: id,
    age,
    reason: row.reason,
    gender,
    nickname,
    uploadNum: cnt,
    rejectNum: noPassCnt,
    create_time: row.create_time,
    update_time: row.update_time,
    src: avatar,
    avatarData: row.avatarData,
  };
}

export function getBarObj(bar: any) {
  const type = typeOf(bar);
  if (["String", "Number"].includes(type)) return { text: bar };
  if (type === "Object") return bar;
  return {};
}
