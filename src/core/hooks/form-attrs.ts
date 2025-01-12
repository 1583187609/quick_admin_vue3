import { useFormItem } from "element-plus";
import { defaultCommonSize } from "../utils";
import { defaultFormAttrs } from "../components/form";

export default () => {
  const { form, formItem } = useFormItem();
  const {
    size = defaultCommonSize,
    disabled,
    inline,
    labelWidth = defaultFormAttrs.labelWidth,
    labelSuffix = defaultFormAttrs.labelSuffix,
    labelPosition = defaultFormAttrs.labelPosition,
  } = formItem ?? form ?? {};
  return {
    size,
    disabled,
    inline,
    labelWidth,
    labelSuffix,
    labelPosition,
    // rules: [],
    // statusIcon: false,
  };
};
