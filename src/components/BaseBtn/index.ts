import config from "@/config";
import { getExportData } from "@/components/_utils";
import { btnsMap } from "./_config";

export * from "./_utils";
export * from "./_types";

const customBtsMap = config?.BaseBtn?.btnsMap;

export default getExportData(btnsMap, customBtsMap, "merge");
