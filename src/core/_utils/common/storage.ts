/********************************************************************/
/***** 构造cookie存储，让api跟localStorage、sessionStorage保持一致 *****/
/********************************************************************/

export type StorageType = "local" | "session" | "cookie";
interface StorageMap {
  [key: string]: any;
}

const defaultStorageType = "local";

const cookieStorage = {
  setItem(key: string, val: any, hours = 24) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 3600 * 1000);
    document.cookie = key + "=" + val + ";expires=" + date.toUTCString();
  },
  getItem(key: string) {
    const arrCookie = document.cookie.split(";");
    let val: null | string = null;
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split("=");
      if (key == arr[0]) {
        val = arr[1];
        break;
      }
    }
    return val;
  },
  removeItem(key: string) {
    const date = new Date();
    date.setTime(date.getTime() - 1000);
    document.cookie = key + "=0; expires =" + date.toUTCString();
  },
  clear() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (!keys) return;
    for (let i = keys.length; i--; ) document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
  },
};

//定义一个映射关系，方便下面直接动态赋予属性
const storageMap: StorageMap = {
  cookieStorage,
  localStorage,
  sessionStorage,
};

/**
 * 获取要转换的值
 * @param {any} val 要转化的值
 * @returns any
 */
function getTransferVal(val: any) {
  if (val === null) return null;
  if (val === "undefined") return;
  if (val === "false") return false;
  if (val === "true") return true;
  if (val.startsWith("{") || val.startsWith("[")) return JSON.parse(val);
  return val;
}

export const storage = {
  /**
   * 存数据
   * @param {string} key  要存储数据的键名
   * @param {any} val 要存储的数据值
   * @param {StorageType} type  存储类型：local, session, cookie
   * @param {number} hours  cookie的过期时间，只有当type为cookie时，才会用到这个参数
   */
  setItem(key: string, val: any, type: StorageType = defaultStorageType, hours?: number) {
    if (typeof val === "object") val = JSON.stringify(val);
    return storageMap[type + "Storage"].setItem(key, val, hours);
  },
  /**
   * 取数据
   * @param {string} key  要取数据的键名
   * @param {StorageType} type 存储类型：local, session, cookie
   * @param {function} transfer 值转换处理规则
   */
  getItem(key: string, type: StorageType = defaultStorageType, transfer = getTransferVal) {
    return transfer(storageMap[type + "Storage"].getItem(key));
  },
  /**
   * 删除指定键名对应的数据
   * @param {string} key  要删除数据的键名
   * @param {StorageType} type  删除类型：local, session, cookie
   */
  removeItem(key: string, type: StorageType = defaultStorageType) {
    storageMap[type + "Storage"].removeItem(key);
  },
  /**
   * 删除所有存储数据
   * @param {StorageType} type
   */
  clear(type: StorageType = defaultStorageType) {
    storageMap[type + "Storage"].clear();
  },
  /**
   * 获取所有存储的键名
   * @param {StorageType} type
   */
  getKeys(type: StorageType = defaultStorageType): string[] {
    const storage = storageMap[type + "Storage"];
    if (!storage) return [];
    return Object.keys(storage);
  },
};

/**
 * 多级路径存储
 * @param {string} pathStr 存储路径，例：map, map.test
 * @param {any} vals 要存的值
 * @param {StorageType} storageType 存储类型
 */
export function setStorage(pathStr = "", vals: any, storageType: StorageType = defaultStorageType) {
  const [name, ...restPaths] = pathStr.split(".");
  if (!restPaths?.length) storage.setItem(name, vals, storageType);
  let data = storage.getItem(name, storageType);
  if (!data) {
    data = {};
    let tempData = data;
    restPaths.forEach((key, ind) => {
      const obj = {};
      const isLast = ind >= restPaths.length - 1;
      tempData[key] = isLast ? vals : obj;
      tempData = obj;
    });
  } else {
    let tempData = data;
    restPaths.forEach((key, ind) => {
      const val = tempData[key];
      const isLast = ind >= restPaths.length - 1;
      if (val) return isLast ? (tempData[key] = vals) : (tempData = val);
      return (tempData[key] = isLast ? vals : {});
    });
  }
  storage.setItem(name, data, storageType);
}

/**
 * 多级路径取值
 * @param {string} pathStr 取值路径，例：map, map.test
 * @param {StorageType} storageType 存储取值类型
 */
export function getStorage(pathStr = "", storageType: StorageType = defaultStorageType) {
  const [name, ...restPaths] = pathStr.split(".");
  let data = storage.getItem(name, storageType);
  if (!restPaths.length || !data) return data;
  restPaths.find(key => {
    const val = data[key];
    if (val === undefined) {
      data = null;
      return true;
    }
    data = val;
  });
  return data;
}
