import { MockMethod } from "vite-plugin-mock";
import apis from "./apis";
// import { responseData, getRequestParams } from "./utils";

// module.exports = [
//   ...apis,
//   // {
//   //   url: "/example/test",
//   //   method: "post",
//   //   response: (req: CommonObj) => {
//   //     const { name } = getRequestParams(req);
//   //     console.log(name, "req---------------");
//   //     return responseData({ data: "Hello World, Test!" });
//   //   },
//   // },
// ] as MockMethod[];
export default apis as MockMethod[];
