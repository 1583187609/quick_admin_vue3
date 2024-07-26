// export enum OrderDropKeyEnum {
//   OrderType = '订单类型'
// }
// export type OrderDropListRes = {
//   [k in keyof typeof OrderDropKeyEnum]: OrderDropItem[];
// };

import { writeComponentDoc, writeTestMdDoc } from "./create/index.js";

writeComponentDoc();
writeTestMdDoc();
