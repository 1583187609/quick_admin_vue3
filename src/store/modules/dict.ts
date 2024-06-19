import { merge } from "lodash";
import { reactive, ref, computed } from "vue";
import dict, { DictName } from "@/dict";
import { printLog, storage, typeOf } from "@/utils";
import { CommonObj, StrNum, OptionItem, FetchType } from "@/vite-env";
import { defineStore } from "pinia";
// import { GetAdminUserList } from "@/apis";
import { GetMockAddress } from "@/api-mock";

/**
 * 将对象按属性排序（整理文件按属性排序的时候会用到）
 * @param map CommonObj
 */
function sortMapByKey(map: CommonObj) {
  const keys = Object.keys(map);
  keys.sort();
  const obj: CommonObj = {};
  keys.forEach((key, ind) => {
    obj[key] = map[key];
  });
  return obj;
}

/**
 * 处理storage存储中的tags，方便后续正确合并本地的tagsMap文件数据
 */
function handleStorageTags(_dictMap: CommonObj | null) {
  if (!_dictMap) return;
  for (const key in _dictMap) {
    for (const k in _dictMap[key]) {
      const map = _dictMap[key][k];
      for (const j in map) {
        if (map[j] === "") {
          delete map[j];
        } else if (typeOf(map[j]) === "Object") {
          for (const i in map[j]) {
            if (map[j][i] === "") {
              delete map[j][i];
            }
          }
        }
      }
    }
  }
  return _dictMap;
}

export default defineStore("dict", () => {
  const dictMap = reactive<CommonObj>(merge({}, dict, handleStorageTags(storage.getItem("dictMap"))));

  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DictName, codeMap?: CommonObj) {
    const currMap = dictMap[name];
    if (currMap) {
      if (codeMap) {
        const tempMap: CommonObj = {};
        for (const key in codeMap) {
          tempMap[key] = currMap[codeMap[key]];
        }
        return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
      }
      return currMap;
    } else {
      console.error("未找到name为" + name + "的tagMap");
      return {};
    }
  }

  /**
   * 设置tagMap
   */
  function setMap(name: DictName, newMap: CommonObj): void {
    const oldMap = dictMap[name];
    if (oldMap) {
      if (!newMap) return;
      const endMap: CommonObj = {};
      for (const key in newMap) {
        endMap[key] = merge(oldMap[key], newMap[key]);
      }
      dictMap[name] = endMap;
      storage.setItem("dictMap", dictMap);
    } else {
      console.error("未找到name为" + name + "的tagMap");
    }
  }

  /**
   * 获取字典文本内容
   * @param name string 字典名称
   * @param key string 字典中的建名
   * @param char string 为空时的占位符号
   */
  function getText(name: DictName, key: StrNum, char = "-"): string {
    const currMap = getMap(name);
    return currMap[key]?.text || char;
  }

  /**
   * 获取字典下拉项
   * @param name DictName 字典名称
   * @param includeKeys string[] 过滤时要包含的keys
   * @param isExclude boolean 是否排除掉要包含的keys
   */
  function getOpts(name: DictName, includeKeys: StrNum[] = [], isExclude = false): OptionItem[] {
    const currMap = getMap(name);
    let opts: OptionItem[] = [];
    for (const key in currMap) {
      const { text, disabled } = currMap[key];
      const val = isNaN(Number(key)) ? key : Number(key);
      const opt: OptionItem = { label: text, value: val };
      if (disabled !== undefined) {
        opt.disabled = disabled;
      }
      opts.push(opt);
    }
    if (typeOf(includeKeys) !== "Array") {
      throw new Error("请传入一个数组");
    }
    if (includeKeys?.length) {
      opts = opts.filter(it => {
        const isInclude = includeKeys.includes(it.value as StrNum);
        return isExclude ? !isInclude : isInclude;
      });
    }
    return opts;
  }

  /**
   * 初始化所有tags映射
   */
  async function initMap(names?: string[]) {
    const fetchs: FetchType[] = [
      // GetAdminUserList,
      GetMockAddress,
    ].filter((it: CommonObj) => {
      return names ? names.includes(it.name) : true;
    });
    //初始化前，先清理干净allTags
    storage.removeItem("dictMap");
    clearMap();
    merge(dictMap, dict);

    const ends = await Promise.all(
      fetchs.map((fetch: FetchType, ind: number) => {
        const apiName = fetch.name;
        return fetch({ page: 1, pageSize: 1 })
          .then((res: CommonObj) => {
            const map: CommonObj = {
              // GetAdminUserList: () => handleSetTagMap("AdminRole", res.roles),
              GetMockAddress() {
                storage.setItem("regions", res);
              },
            };
            map[apiName] ? map[apiName]() : console.error("未找到名为" + apiName + "的api");
            return "success";
          })
          .catch(() => {
            return "fail";
          });
      })
    );
    let sucLen = 0;
    let faiLen = 0;
    ends.forEach(it => {
      if (it === "success") {
        sucLen++;
      } else if (it === "fail") {
        faiLen++;
      }
    });
    if (faiLen) printLog(undefined, "danger", `成功：${sucLen}；失败：${faiLen}`);
    if (faiLen) {
      console.error("初始化下拉选项时，请求失败");
    } else {
      storage.setItem("dictMap", dictMap);
    }
  }

  /**
   * 处理设置标签映射
   */
  function handleSetTagMap(key: DictName, data: any, keys: [string, string] = ["label", "value"]) {
    const type = typeOf(data);
    const map: CommonObj = {};
    if (type === "Object") {
      Object.entries(data).map(([value, label], ind: number) => {
        map[value] = {
          text: label,
        };
      });
    } else if (type === "Array") {
      const [labProp, valProp] = keys as [string, string];
      data.map((item: CommonObj, ind: number) => {
        const value = item[valProp];
        const label = item[labProp];
        map[value] = {
          text: label,
        };
      });
    }
    setMap(key, map);
  }
  // 清空字典上的属性，默认清除所有
  function clearMap(keys = Object.keys(dictMap)) {
    keys.forEach(key => {
      delete dictMap[key];
    });
  }

  return {
    dictMap,
    initMap,
    getMap,
    setMap,
    getText,
    getOpts,
    clearMap,
    handleSetTagMap,
  };
});
