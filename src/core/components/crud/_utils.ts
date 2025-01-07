import { BtnItem } from "@/core/components/BaseBtn/_types";
import { HandleButtonAuth } from "./BaseCrud/_types";

//根据权限对按钮进行过滤
export function getHandleAuthBtns(btns: BtnItem[] = [], handleAuth?: HandleButtonAuth) {
  if (!handleAuth) return btns;
  return btns.filter(({ auth }) => {
    return auth?.length ? handleAuth(auth) : true;
  });
}
