import base from "./user";
import users from "./user";
import mocks from "./mock";

import { createRestfulApis } from "../create";

const restfulApis = [
  ...createRestfulApis("user"),
  ...createRestfulApis("role"),
  ...createRestfulApis("menu"),
  // ...createRestfulApis("department"),
];

export default [...base, ...users, ...mocks, ...restfulApis];
