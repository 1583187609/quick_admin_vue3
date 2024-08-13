import config from "@/config";
import { getExportData } from "@/components/_utils";
import btns from "./_config";

export * from "./_utils";

const customBtsMap = config?.BaseBtn?.btnsMap;

export const btnsMap = getExportData(btns, customBtsMap, "merge");
