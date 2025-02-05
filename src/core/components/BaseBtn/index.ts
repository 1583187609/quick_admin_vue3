import config from "@/core/config";
import { deepFreeze, getExportData } from "@/core/utils";
import btns from "./_config";

export * from "./_utils";

const customBts = config?.tpls?.baseBtns;

export const defaultBtns = deepFreeze(getExportData(btns, customBts, "merge"));
export const btnNames = Object.keys(defaultBtns);
