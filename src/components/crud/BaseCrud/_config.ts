import { BtnName, BtnItem } from "@/components/BaseBtn";

/**
 * 可以进行批量操作的按钮；
 * 有dialog提示又有popconfirm提示，且不需要popconfirm提示的按钮
 */
export const batchBtnNames: BtnName[] = ["delete", "export", "pass", "reject", "repeal", "enable", "forbid", "download"];

// 能够自定义逻辑规则的按钮
export const customableRuleBtns: BtnName[] = ["export"];
