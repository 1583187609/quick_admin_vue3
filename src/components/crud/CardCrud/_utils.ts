import { CommonObj } from "@/vite-env";
import { typeOf } from "@/components/_utils";

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
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    src: avatar,
    avatarData: row.avatarData,
  };
}

export function getBarObj(bar: any) {
  const type = typeOf(bar);
  if (["String", "Number"].includes(type)) {
    return { text: bar };
  } else if (type === "Object") {
    return bar;
  } else {
    return {};
  }
}
