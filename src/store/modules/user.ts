import { ref, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PostUserLogin, PostUserLogout } from "@/api-mock";
import { storage, isProd, defaultHomePath, defaultIconName, defaultLoginExpired } from "@/utils";
import { CommonObj } from "@/vite-env";
import { ElNotification, dayjs } from "element-plus";
import { defineStore } from "pinia";
import { useMenuStore, useRouteStore } from "@/store";
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
// import md5 from "@/services/md5";
import md5 from "md5";

export default defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();
  const userInfo = ref<CommonObj | null>(storage.getItem("userInfo"));
  const routeStore = useRouteStore();
  const menuStore = useMenuStore();
  //过期日期
  const expired = ref(new Date(storage.getItem("loginExpiredDate")).getTime() || Date.now());
  const isLogin = computed(() => {
    if (!storage.getItem("token")) return false;
    return Date.now() < expired.value;
  });

  /**
   * 登录
   * @param data
   * @param {number} expiration 过期时间，单位：秒，默认24小时不登录即会过期
   * @returns
   */
  function getHandleNavs(navs: ResponseMenuItem[], level = 0): ResponseMenuItem[] {
    if (!navs) return [];
    return navs.map((item: ResponseMenuItem) => {
      const { icon, children = [] } = item;
      //为了保持统一及美观，对于嵌套两层以上的菜单项不展示图标
      item.icon = level > 1 ? "" : icon || defaultIconName;
      item.children = getHandleNavs(children, level + 1);
      return item;
    });
  }
  async function handleLoginIn(data: CommonObj, expiration = defaultLoginExpired) {
    const { remember, ...params } = data;
    if (remember) {
      storage.setItem("rememberAccount", params);
    } else {
      storage.removeItem("rememberAccount");
    }
    // params.psd = md5(params.psd); // 启用 md5 进行加密
    return PostUserLogin(params).then(async (res: CommonObj) => {
      const { user, navs } = res;
      const _navs = getHandleNavs(
        navs.filter((it: ResponseMenuItem) => {
          const { auth_codes } = it;
          if (!auth_codes) return true;
          return auth_codes.includes(user.type);
        })
      );
      const { id = "", name = "", nickname = "", type_text = "" } = user;
      user._title = name || nickname || type_text + id;
      userInfo.value = user;
      expired.value = Date.now() + expiration;
      menuStore.initMenus(_navs);
      storage.setItem("userInfo", user);
      storage.setItem("token", user?.token ?? "");
      storage.setItem("allMenus", _navs);
      storage.setItem("loginExpiredDate", dayjs(expired.value).format("YYYY-MM-DD HH:mm:ss"));
      router.push(route.query.redirect?.toString() ?? defaultHomePath);
      ElNotification({
        type: "success",
        title: "登录成功",
        duration: 2000,
        dangerouslyUseHTMLString: true,
        message: `欢迎回来，<b>${userInfo.value!._title}</b>`,
      });
    });
  }

  /**
   * 用户登出
   * @returns
   */
  function handleLoginOut(isFetch = true) {
    function handleClear() {
      //等一秒后再清空，避免userInfo无值时，有些页面会报错
      setTimeout(() => {
        storage.getKeys().forEach((key: string) => {
          if (!["rememberAccount", "set", "hasGuide"].includes(key)) storage.removeItem(key);
        });
        storage.clear("session"); //清除sessionStorage的数据
        expired.value = Date.now();
        userInfo.value = null;
        // menuStore.changeActiveIndex(0);
      }, 1000);
      const { path, fullPath, name } = route;
      router.push({
        name: "login",
        query: name !== "login" && path !== defaultHomePath ? { redirect: fullPath } : undefined,
      });
    }
    if (!isFetch) return handleClear();
    PostUserLogout({ phone: userInfo.value!.phone }).then(() => handleClear());
  }
  return {
    isLogin,
    userInfo,
    handleLoginIn,
    handleLoginOut,
  };
});
