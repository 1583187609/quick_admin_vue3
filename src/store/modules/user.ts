import { ref, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PostUserLogin, PostUserLogout } from "@/api-mock";
import { storage, isProd, defaultHomePath, defaultIconName } from "@/utils";
import { CommonObj } from "@/vite-env";
import { useInit } from "@/hooks";
import { ElNotification, dayjs } from "element-plus";
import { defineStore } from "pinia";
import { useMenuStore, useRouteStore, useDictStore } from "@/store";
import { MenusItem } from "@/layout/_components/SideMenu/Index.vue";

export default defineStore("user", () => {
  const router = useRouter();
  const route = useRoute();
  const userInfo = ref<CommonObj | null>(storage.getItem("userInfo"));
  const dictStore = useDictStore();
  const routeStore = useRouteStore();
  const menuStore = useMenuStore();
  //过期日期
  const expired = ref(new Date(storage.getItem("expiredDate")).getTime() || Date.now());
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
  function getHandleNavs(navs: MenusItem[], level = 0): MenusItem[] {
    if (!navs) return [];
    return navs.map((item: MenusItem) => {
      const { icon, children = [] } = item;
      //为了保持统一及美观，对于嵌套两层以上的菜单项不展示图标
      item.icon = level > 1 ? "" : icon || defaultIconName;
      item.children = getHandleNavs(children, level + 1);
      return item;
    });
  }
  async function handleLoginIn(data: CommonObj, expiration = 24 * 60 * 60 * 1000) {
    const { remember, ...params } = data;
    if (remember) {
      storage.setItem("rememberAccount", params);
    } else {
      storage.removeItem("rememberAccount");
    }
    return PostUserLogin(params).then(async (res: CommonObj) => {
      const { user, navs } = res;
      const _navs = getHandleNavs(
        navs.filter((it: MenusItem) => {
          const { auth_codes } = it;
          if (!auth_codes) return true;
          return auth_codes.includes(user.type);
        })
      );
      const { id = "", name = "", nickname = "", type_text = "" } = user;
      user._title = name || nickname || type_text + id;
      userInfo.value = user;
      expired.value = Date.now() + expiration;
      menuStore.initAllMenus(_navs);
      storage.setItem("userInfo", user);
      storage.setItem("token", user?.token ?? "");
      storage.setItem("allMenus", _navs);
      storage.setItem("expiredDate", dayjs(expired.value).format("YYYY-MM-DD HH:mm:ss"));
      await dictStore.initMap();
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
      storage.getKeys().forEach((key: string) => {
        if (!["rememberAccount", "set", "hasGuide"].includes(key)) storage.removeItem(key);
      });
      storage.clear("session"); //清除sessionStorage的数据
      dictStore.clearMap();
      expired.value = Date.now();
      userInfo.value = null;
      // menuStore.changeActiveIndex(0);
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
