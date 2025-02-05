import base from "./base";
import users from "./user";

import { createRestfulApis } from "../create";

const restfulApis = [
  ...createRestfulApis("user"),
  ...createRestfulApis("role"),
  ...createRestfulApis("menu"),
  ...createRestfulApis("common"),
  ...createRestfulApis("department"),
];

export default [...base, ...users, ...restfulApis];
