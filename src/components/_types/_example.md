# 这个文件仅用作示例

```ts
import { ref } from "vue";
import LookApplyForm from "./components/LookApplyForm.vue";
const applyFormRef = ref<InstanceType<typeof LookApplyForm>>();
<LookApplyForm ref="applyFormRef" />;
```

```ts
const user = {
  name: "ray",
  age: 20,
  location: "西安",
};
function handler<T extends object, K extends keyof T>(obj: T, propName: K) {}

handler(user, "name");
handler(user, "abc");
```
