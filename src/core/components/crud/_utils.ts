import { BtnItem, HandleAuthFn } from "@/core/components/BaseBtn/_types";

//根据权限对按钮进行过滤
export function getHandleAuthBtns(btns: BtnItem[] = [], handleAuth?: HandleAuthFn) {
  if (!handleAuth) return btns;
  return btns.filter((btn: BtnItem) => {
    const { auth, attrs } = btn;
    if (!auth?.length) return true;
    const showBtn = handleAuth(auth);
    if (!showBtn) return false;
    if (showBtn === "disabled") attrs!.disabled = true;
    return true;
  });
}
