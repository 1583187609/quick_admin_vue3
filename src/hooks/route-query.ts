import { useRoute } from "vue-router";
/**
 * 将route.query中的能转成数字的值都转成数字，用于BaseCrud中的下拉项正确识别数字code
 * @param excpKeys 要排除掉转成数字的键名
 */
export default (excpKeys?: string[]) => {
  const route = useRoute();
  const { query } = route;
  for (const key in query) {
    if (!excpKeys?.includes(key)) {
      const num = Number(query[key]);
      if (!isNaN(num)) {
        query[key] = num;
      }
    }
  }
  return query;
};
