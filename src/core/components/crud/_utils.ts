import { BtnItem } from "@/core/components/BaseBtn/_types";
import { FilterByAuthFn } from "./BaseCrud/_types";

//根据权限对按钮进行过滤
export function filterBtnsByAuth(btns: BtnItem[] = [], filterByAuth?: FilterByAuthFn) {
  if (!filterByAuth) return btns;
  return btns.filter(({ auth }) => {
    return auth?.length ? filterByAuth(auth) : true;
  });
}
