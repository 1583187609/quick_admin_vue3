# 这个文件仅用作示例

```ts
import { ref } from "vue";
import LookApplyForm from "./components/LookApplyForm.vue";
const applyFormRef = ref<InstanceType<typeof LookApplyForm>>();
<LookApplyForm ref="applyFormRef" />
```