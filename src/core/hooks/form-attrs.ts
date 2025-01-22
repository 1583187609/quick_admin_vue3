import { useFormItem } from "element-plus";
import { defaultCommonSize } from "@/core/config";
import { defaultFormAttrs } from "../components/form";

export default () => {
  const { form, formItem } = useFormItem();
  const {
    size = defaultCommonSize,
    inline,
    disabled,
    // readonly = false,
    // clearable = true,
    labelWidth = defaultFormAttrs.labelWidth,
    labelSuffix = defaultFormAttrs.labelSuffix,
    labelPosition = defaultFormAttrs.labelPosition,
  } = formItem ?? form ?? {};
  return {
    size,
    inline,
    disabled,
    // readonly,
    // clearable,
    labelWidth,
    labelSuffix,
    labelPosition,
    // rules: [],
    // statusIcon: false,
  };
};
