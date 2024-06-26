// 获取下拉项 select 的 options
import { ref, reactive, computed, nextTick, h } from "vue";
import CompanyOption from "./_components/CompanyOption.vue";
import { GetMockSchoolList, GetMockCompanyList } from "@/api-mock";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { merge } from "lodash";

export type SelectSearchType = "school" | "company";
//  | "major" | "subject"

const typeMap: CommonObj = {
  school: {
    reqNameKey: "name",
    resValKey: "id", //跟下方的handleItem中的value对应的键名保持一致
    fetchApi: GetMockSchoolList,
    defaultField: { prop: "xx", label: "学校", type: "select" },
    handleItem(item: CommonObj) {
      const { name, id } = item;
      return { label: name, value: id };
    },
  },
  company: {
    reqNameKey: "name",
    resValKey: "id",
    fetchApi: GetMockCompanyList,
    defaultField: { prop: "gs", label: "公司", type: "select" },
    handleItem(item: CommonObj) {
      const { fullName, shortName, id } = item;
      return {
        label: fullName,
        customOption: h(CompanyOption, { fullName, shortName }),
        value: id,
      };
    },
  },
  // major: {
  //   reqNameKey: "majorName",
  //   resValKey: "id",
  //   fetchApi: PostUserList,
  //   defaultField: { prop: "zy", label: "专业", type: "select" },
  //   handleItem(item: CommonObj) {
  //     const { majorName, id } = item;
  //     return { label: majorName, value: id };
  //   },
  // },
  // subject: {
  //   reqNameKey: "name",
  //   resValKey: "name",
  //   fetchApi: PostUserList,
  //   defaultField: { prop: "subject", label: "学科名称", type: "select" },
  //   handleItem(item: CommonObj) {
  //     const { name, code } = item;
  //     return { label: name, value: code };
  //   },
  //   extraParams: { groupType: 2 },
  // },
};

export default () => {
  /**
   * 获取输入并搜索的下拉项
   * @tips 作为 "school" | "company" | "major" | "subject" 四个搜索下拉项的整合
   */
  function getSearchOpts(
    type: SelectSearchType,
    field: FormFieldAttrs,
    name?: string,
    cb?: (val: StrNum, row: CommonObj) => void
  ) {
    if (!typeMap[type]) throw new Error(`不存在type为${type}的类型`);
    const { fetchApi, defaultField, handleItem, reqNameKey = "name", resValKey = "id", extraParams } = typeMap[type];
    const loading = ref<boolean>(false);
    const resList = ref<CommonObj[]>([]);
    const opts = computed<OptionItem[]>(() => {
      const _opts: OptionItem[] = resList.value.map(handleItem);
      return _opts;
    });
    name && fetchOpts(name);

    //获取学校的下拉项，可输入搜索
    function fetchOpts(val = "", isFocus = false) {
      if (!val && !isFocus) return; //为了规避当确定选择项后，会再次触发remoteMethod方法，导致opts的选项发生变化，影响其他逻辑
      loading.value = !!val;
      fetchApi({ [reqNameKey]: val, ...extraParams })
        .then((res: CommonObj) => {
          resList.value = res || [];
        })
        .finally(() => {
          loading.value = false;
        });
    }

    //处理change回调函数
    function handleChange(val: StrNum) {
      const target = resList.value.find((it: CommonObj) => it[resValKey] === val) as CommonObj;
      //为了处理回调之后，再重新选择下拉项，change事件已触发，但选中的项渲染列未更新的bug（此时需要点击两次）
      nextTick(() => {
        cb!(val, target);
      });
    }

    return {
      ...merge({}, defaultField, field),
      options: opts,
      attrs: {
        filterable: true,
        remote: true,
        remoteShowSuffix: true,
        defaultFirstOption: true,
        onFocus: () => fetchOpts("", true),
        remoteMethod: fetchOpts,
        onChange: cb ? handleChange : undefined,
        loading,
      },
    };
  }

  return {
    getSearchOpts,
  };
};
