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

```ts
// 类型拼接、泛型、对象的属性名（非symbol）集合
type Watcher<T> = {
  on<K extends string & keyof T>(eventName: `${K}Changed`, callback: (oldValue: T[K], newValue: T[K]) => void): void;
};

declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

personWatcher.on("ageChanged", (oldValue, newValue) => {
  // do something
});
```
