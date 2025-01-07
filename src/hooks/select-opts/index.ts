// 获取下拉项 select 的 options
import { ref, computed, nextTick } from "vue";
import { GetMockOptions } from "@/api-mock";
import { CommonObj, OptionItem, StrNum } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import BaseOption from "@/core/components/BaseOption.vue";
import { typeOf } from "@/utils";

export type SelectSearchType = "school" | "company";

const typeMap: CommonObj = {
  school: {
    reqNameKey: "name",
    resValKey: "id", //跟下方的handleItem中的value对应的键名保持一致
    fetchApi: GetMockOptions,
    defaultField: { prop: "xx", label: "学校" },
    extraParams: { type: "school" },
    handleItem(item: CommonObj) {
      const { name, id } = item;
      return { label: name, value: id };
    },
  },
  company: {
    reqNameKey: "name",
    resValKey: "id",
    fetchApi: GetMockOptions,
    defaultField: { prop: "gs", label: "公司" },
    extraParams: { type: "company" },
    handleItem(item: CommonObj) {
      const { full_name, short_name, id } = item;
      return {
        label: full_name,
        value: id,
        short_name,
        slots: [BaseOption, { rightKey: "short_name" }],
      };
    },
  },
};

export default () => {
  /**
   * 获取输入并搜索的下拉项
   * @tips 作为 "school" | "company" 两个搜索下拉项的整合
   */
  function getSearchOpts(type: SelectSearchType, fieldAttrs: FormFieldAttrs, name?: string, changeCb?: (val: StrNum, row: CommonObj) => void) {
    if (!typeMap[type]) throw new Error(`不存在type为${type}的类型`);
    let allOpts: CommonObj[] = [];
    const { fetchApi, defaultField, handleItem, reqNameKey = "name", resValKey = "id", extraParams } = typeMap[type];
    const loading = ref<boolean>(false);
    const resList = ref<CommonObj[]>([]);
    const opts = computed<OptionItem[]>(() => resList.value.map(handleItem));
    name && fetchOpts(name);

    // 获取学校/公司的下拉项，可输入搜索
    function fetchOpts(val = "", isFocus = false) {
      if (!val) {
        if (allOpts.length) return (resList.value = allOpts); // 优化网络请求（减少网络请求次数）
        if (!isFocus) return; // 为了规避当确定选择项后，会再次触发remoteMethod方法，导致opts的选项发生变化，影响其他逻辑
      }
      loading.value = !!val;
      fetchApi({ [reqNameKey]: val, ...extraParams })
        .then((res: CommonObj[]) => {
          if (!allOpts.length && !val) allOpts = res || [];
          resList.value = res || [];
        })
        .finally(() => {
          loading.value = false;
        });
    }

    // 处理change回调函数
    function handleChange(val: StrNum) {
      const target = resList.value.find((it: CommonObj) => it[resValKey] === val) as CommonObj;
      // 为了处理回调之后，再重新选择下拉项，change事件已触发，但选中的项渲染列未更新的bug（此时需要点击两次）
      nextTick(() => changeCb!(val, target));
    }

    return {
      ...defaultField,
      ...fieldAttrs,
      type: "select",
      attrs: {
        options: opts,
        filterable: true,
        placeholder: "支持输入名称/id进行搜索",
        remote: true,
        remoteShowSuffix: true,
        defaultFirstOption: true,
        onFocus: () => fetchOpts("", true),
        remoteMethod: fetchOpts,
        onChange: changeCb ? handleChange : undefined,
        loading,
      },
    };
  }

  return {
    getSearchOpts,
  };
};
