<script lang="ts">
//博客参考地址：https://www.cnblogs.com/-pdd/p/15617970.html
import * as Icons from "@element-plus/icons-vue";
import { createVNode, computed } from "vue";
import { toCssVal, defaultIconName } from "@/utils";

export default {
  name: "BaseIcon",
  props: {
    //icon名称
    name: {
      type: String,
      default: defaultIconName,
    },
    //icon的宽高一样
    size: {
      type: [String, Number],
      default: "1em",
    },
  },
  setup(props) {
    const Icon = computed(() => Icons[props.name as keyof typeof Icons]);
    return () => {
      return createVNode(
        Icon.value || "span",
        {
          class: "base-icon",
          style: { height: toCssVal(props.size), width: toCssVal(props.size) },
        },
        Icon.value ? undefined : props.name
      );
    };
  },
};
</script>
