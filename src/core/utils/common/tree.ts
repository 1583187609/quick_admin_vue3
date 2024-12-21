/********************************************************************/
/********************** 处理树相关的系统级方法 **********************/
/********************************************************************/

import { CommonObj, StrNum } from "@/core/_types";

export function getPropsMapKeys(propsMap?: CommonObj) {
  if (!propsMap) return ["value", "label", "children"];
  const { value: valueKey, label: labelKey, children: childrenKey } = propsMap;
  return [valueKey, labelKey, childrenKey];
}

/**
 * 处理树节点
 * @param tree 树形数据
 * @param value 要查找的值（一般是指id）
 * @param propsMap 树属性的映射关系
 * @param level 树层级深度
 * @returns
 */
function handleTreeNodeByValue(tree: CommonObj[], value: StrNum, propsMap?: CommonObj, isDelete = false, level = 0): CommonObj | undefined {
  if (!tree?.length) return;
  const [valueKey, labelKey, childrenKey] = getPropsMapKeys(propsMap);
  let targetNode: CommonObj | undefined;
  tree.find((item, ind) => {
    const isFind = item[valueKey] === value;
    if (isFind) {
      targetNode = item;
      if (isDelete) tree.splice(ind, 1);
      return true;
    }
    const children = item[childrenKey];
    if (children?.length) {
      targetNode = handleTreeNodeByValue(children, value, propsMap, isDelete, level + 1);
      return targetNode;
    }
  });
  if (level === 0 && !targetNode) throw new Error(`未找到树节点：${value}`);
  return targetNode;
}

/**
 * 根据值获取树节点
 * @param tree 树形数据
 * @param value 要查找的值（一般是指id）
 * @param propsMap 树属性的映射关系
 * @returns
 */
export function getTreeNodeByValue(tree: CommonObj[], value: StrNum, propsMap?: CommonObj) {
  return handleTreeNodeByValue(tree, value, propsMap);
}

/**
 * 根据值删除树节点
 * @param tree 树形数据
 * @param value 要查找的值（一般是指id）
 * @param propsMap 树属性的映射关系
 * @returns
 */
export function deleteTreeNodeByValue(tree: CommonObj[], value: StrNum, propsMap?: CommonObj) {
  return handleTreeNodeByValue(tree, value, propsMap, true);
}

/**
 * 根据值获取树链路上的节点
 * @param tree 树形数据
 * @param value 要查找的值（一般是指id）
 * @param propsMap 树属性的映射关系
 * @returns
 */
export function getTreeNodesByValue(tree: CommonObj[], value: StrNum, propsMap?: CommonObj) {
  // return handleTreeNodeByValue(tree, value, propsMap, false, undefined);
  if (!tree?.length || !value) return [];
  return ["组件示例", "表单", "基础表单", "基础用法"];
}
