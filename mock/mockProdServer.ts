import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import apis from "./apis";
export function setupProdMockServer() {
  createProdMockServer(apis);
}

// import mockServer from "vite-plugin-mock/es/createProdMockServer";
// import apis from "./apis";
// const { createProdMockServer } = mockServer;
// export function setupProdMockServer() {
//   createProdMockServer(apis);
// }

// import Mock from "mockjs";
// import apis from "./apis";
// export function setupProdMockServer() {
//   Object.keys(apis).forEach(path => {
//     // Mock.mock(new RegExp(`^${process.env.VITE_API_BASE_URL}${path}`), apis[path]);
//     Mock.mock(new RegExp(path), apis[path]);
//   });
// }
