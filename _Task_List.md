# 任务清单列表

::: tips 注意事项  
已实现的功能大都没记录在下方列表中。以下清单是为了记录平时开发中临时发现（或想到的）的 bug、优化、功能点等。正持续完善中……  
:::

## 在线访问地址：https://1583187609.github.io/quick_admin/vue3/preview/#/login

## 一、功能清单

~~2、KeepAlive 完善缓存功能~~  
~~4、搜索菜单栏~~  
~~6、同页面不同 id 的缓存~~  
~~7、菜单权限分配页面&逻辑完善~~  
~~3、完善 mock 真实性~~  
~~4、完善组件属性全继承~~  
~~6、完成导入 Excel 功能（联调 Mock）~~  
~~7、dialog 弹出层中 Modal 可拖动~~  
~~1、年龄区间表单控件：除了支持区间数组，还要支持传入两个字段~~  
~~3、BaseCrud 行拖动排序功能~~  
~~5、不退出直接点击按钮刷新整个系统~~  
~~1、基础路径等环境差异的文件配置在环境文件里，即完善根目录下的 env 文件~~  
~~3、新增、编辑菜单，表格列表更新一次之后，会整个页面重新刷新再更新一次优化处理（会有闪屏现象）~~  
~~4、用可写的计算属性来优化一些基础组件的逻辑~~  
~~5、打开 Eslint ts 类型处理~~  
~~6、统一为表单输入框添加 v-model.trim 修饰~~  
~~7、考虑看看能不能用 watchEffect 优化 watch~~  
~~9、添加左侧一、二级菜单、并实现可折叠功能（带动效）~~  
~~10、配置只允许 pnpm 安装~~  
~~9、hooks 全都采用 use 开头~~  
~~10、路由动画待完善~~  
~~11、三级路由缓存问题（降维成二级再进行处理）~~  
~~11、完善 Error.vue 的状态传参使用场景~~  
~~12、未授权跳转登录页，登录成功后重定向处理~~  
~~16、查询条件日期支持数组和两个字段~~  
~~23、BaseCrud 操作栏列：operateBtns 有值（有按钮）时才显示操作栏，反之不显示~~  
~~24、用文件夹形式优化代码结构（ts 类型和页面文件代码分开）~~  
~~1、根据文件路径自动生成路由~~  
~~2、刷新之后菜单状态保留~~  
~~3、角色管理、权限控制逻辑完善~~  
~~5、Eolink 接口自动化工具~~  
~~6、传递 vue 组件（https://cn.vuejs.org/api/render-function.html#resolvecomponent）~~  
~~8、路由信息根据后端菜单数据动态生成~~  
~~9、登录 md5 加密~~  
~~10、自动判断是否出现了省略号，封装 hooks~~  
~~11、vite 全局注入 log，无需引入 log~~  
~~12、研究 ts、eslint 配置~~  
~~13、借鉴 Vue3 后台管理模板，完善本后台内容，可借鉴 Geeker admin~~  
~~14、常用自定义指令封装~~  
~~15、请求接口数据定义路由 title~~  
~~16、menu 键值对转化配置~~  
~~17、动态路由和权限问题处理：https://blog.csdn.net/m0_57071129/article/details/123770656~~  
~~角色类型：开发者、面试官、超级管理员、普通管理员、游客~~  
~~18、缺省页优化~~  
~~19、动态路由，页面刷新之后，404 问题~~  
~~20、Eolink 接口自动化：https://juejin.cn/post/7129386886446972965~~  
~~21、https 重复提交拦截处理(并不推荐这样使用)~~  
~~22、换用 vite mock~~  
~~23、ts 类型优化~~  
~~27、完善 KeepAlive 缓存~~  
~~29、某些页面的 ts 类型错误，需要统一处理~~  
~~31、完善 menuStore，userStore，均采用 pinia 实现~~  
~~32、退出登录后再进入时，进入到上次的页面~~  
~~33、打包优化研究~~  
~~34、关于系统弹窗中的内容（右上角头像->关于系统）在开发环境中有，在生产环境中没有了~~  
~~35、给菜单栏标题增加徽章 number，支持动态设置数值~~  
~~38、让每一个表单按 enter 键，都能触发提交事件~~  
~~39、参照公司后台完善菜单权限页面~~  
~~40、国际化~~  
~~41、引导页~~  
~~43、数据大屏优化~~  
~~44、菜单及其结构调整~~  
~~46、工程化配置：eslint、prettier、git husk~~  
~~47、把用户管理挪到系统管理下面：做 menus 层级拉平成两级处理~~  
~~48、表格拖动排序功能实现~~  
~~49、keepAlive 路由缓存、移除缓存功能暂未完善~~  
~~51、处理菜单跳转内链问题~~  
~~52、完善系统管理 -> 字典管理~~  
~~53、树形筛选器组件封装~~  
~~54、增加文档链接、个人博客链接~~  
~~60、写大屏示例~~  
~~66、让 select，cascader 的 options 可以传入 name 名称实现下拉项的正常渲染展示~~  
~~17、openPopup component 解析 v-model~~  
~~21、用 TS 的 enum 类型替代 map 对象~~  
~~16、自动跳转至 403, 500 页面处理~~  
~~10、账号管理-详情 点击驳回对话框，确认，取消事件绑定不上。~~  
~~78、BaseRender 考虑使用 {is: '',...otherAttrs} 来进行替换~~  
~~7、Vue 组件深入极致优化~~
~~73、删除 `src/test_components` 文件夹下的内容~~  
~~81、storage 的 clear 方法完善~~  
~~91、openPopup Dialog 的确定取消按钮的 confirm 和 cancel 方法用 onConfirm 和 onCancel 代替~~
~~92、改造 el-dialog 弹窗居中方式（为了处理`position:fixed`失效问题，详见：https://www.jb51.net/article/213186.htm）~~
~~95、完善 filterBtnsByAuth 按钮权限，处理操作栏按钮不显示问题~~
~~22、文件目录结构改为 monorepo 式~~  
~~19、完善列设置是否显示对应列的功能~~  
~~12、添加 batch 按钮及其子按钮~~  
~~24、增加批量操作按钮，并完善功能~~  
~~97、表格的序号列、拖动列、操作列支持可覆盖~~
~~72、将 SetTable 用 FormTable 改造~~
~~80、日期区间组件，增加 `defaultTime` 属性~~  
~~93、el-dialog 关闭时销毁功能优化~~
~~86、关于系统信息完善；并考虑移除`BaseKeyVal`组件~~
~~83、tpl 增加 price 类型（自测）。~~
~~57、给 BaseCrud 导入/导出按钮添加 customRules 自定义规则功能并自测，换用 handleClickType（可选值：'common' | 'custom'）~~  
~~85、验证 FieldItem 的 tpl 为 price 时是否正常~~
~~98、完善批量按钮栏中：导入按钮的 导入组件的配置及展示~~
~~102、用 map 映射优化 api 代理~~
~~103、将表格的 columns 的 prop 支持.多级属性访问，并验证~~
~~104、扩展 BaseBtn 的 handleClickType 功能~~
~~89、BasicDialog 完善 header 和 footer 的自定义渲染并自测~~
~~88、完善`UserDetail`页面~~
~~101、SlotRender 组件视情况移除或完善~~
~~108、完善 table 的 type 为 switch 的属性绑定~~
~~112、扩展常用弹窗 `openPopupByName('name',{onConfirm(){}, onCancel(){}},{...attrs})`, 依次为弹窗类型名称、弹窗属性，弹窗内部组件属性~~
~~115、完善 FieldItem 的插槽、完善 BaseCrud 的标记为联调 icon~~
~~117、将核心代码移入 core 文件夹中~~  
~~118、将 useSlots 替换为 defineSlots()~~  
~~120、在 el-table-column 默认插槽中处理 formatter~~
~~114、FieldItem 中的 el-input 的`v-debounce:input=`换用普通方法实现~~
~~84、验证 FieldItem 的 date-picker 的各项内容显示、传值等正常~~
~~96、表格 BaseCrud、BaseTable 等的 index 、selectable、dragSortable（拖拽排序功能待完善）支持可传入函数，以及 TS 类型处理~~
~~69、把组件 hooks 等抽成一个单独的文件夹（core），为拆包做准备（稍微晚一点再拆）~~
~~79、BaseCopy 支持复制文本同时，可以跳转路由~~
~~80、将 vite.config.ts 提取出配置文件，让 vite.config.ts 简洁清爽~~  
~~121、处理跳转路由时，跳转的 vue 文件不存在时，给出恰当的异常提示~~  
~~75、完善 http 的 ts 类型书写~~  
~~77、大屏页面第一个水滴图未正常显示~~
~~78、StepForm 必填项完成后，自动跳到下一步骤~~  
~~123、完善 `BaseNumRangeNew` 组件~~
~~124、统一跳转错误页面、登录、登出时候的路由方法、重定向等逻辑处理~~
~~100、升级 ElementPlus、vue3、vite、vitepress 再完善代码~~
~~80、完善如果存在点击事件时，自动将 clickIconCopy 设为 true 的逻辑~~
~~107、换用 pnpm 进行包管理，且只允许 pnpm~~
~~105、极致优化白屏时长问题~~
~~108、对`vue3、vue-router、pinia、axios、dayjs、driver.js、echarts、echarts-liquidfill、@wangeditor/editor-for-vue、lodash、nprogress、sortablejs、vuedraggable、xlsx、element-plus、vite-plugin-mock、vue-i18n`使用 cdn~~
~~115、删除.vitepress/inner 文件夹~~
~~69、将@/vite-env 的 ts 全部改为 core 中的引入方式，例：`@core/_types`~~
~~131、当 type 和 tpl 一致时，作等价处理~~
~~126、尽可能多地提取表单项、表格列的模板~~
~~129、提供一个方法，当使用同样的模板名称时，对搜索表单和新增编辑表单做差异化显示处理~~
~~125、替换表格的 `refreshList` 方法~~
~~130、并对不存在的模板（表单项模板、表格列模板）做抛出异常处理~~
~~4、接入自动化路由（vue-auto-routing 貌似只适用于 Vue2）~~
~~117、处理`@wangeditor/editor/dist/css/style.css`找不到的问题~~
~~132、将表格项、表格列、按钮、校验规则等配置项都单独提取到一个模板文件夹下统一管理（维持现状，不改动）~~
~~136、将`BaseCrud`的数组 prop 改为逗号拼接的 prop 传入（维持现状，不改动）~~
~~132、将表格项、表格列、按钮、校验规则等配置项都单独提取到一个模板文件夹下统一管理（待定）~~
~~142、删除 db 脚本及其相关项~~
~~107、BarsImg 视情况而改名。~~
~~149、简化按钮 loading，用 ElementPlus 提供的 loading 属性完成~~
~~150、BaseBtn 的 validateForm 属性有待重新确定~~
~~139、完善自动路由逻辑~~
~~144、抽离 IconPicker 组件~~
~~148、整合 extraBtns 中的导入按钮逻辑到 BaseBtn 中~~
~~153、将公共 Css 加上前缀~~
~~159、将 BaseForm、BaseCrud 中的 onSubmit、onSearch 与 fetch 合并下，共用同一个属性，去掉 fetch 属性（待定）~~
~~161、将 modules 中的文件夹、文件进行统计，放入文件分析中~~
~~164、支持表单 tips 自定义~~
~~166、删除 addDel、childrenFields 类型~~
~~170、后端返回的日期进行统一格式化处理~~
~~171、取消表格创建时间、更新时间列，改用 type: UserTime~~
~~172、更名`filterByAuth`为 `handleAuth`~~
~~145、将表格列的 type 支持传入任意组件~~
~~146、将对表单的字段处理，分别放在 FormItem、FieldItem、FieldItemCol 中~~
~~152、将 formItem 的子项拆分出来（不应该放入里面，会导致组件变得臃肿庞大）~~
~~136、将`BaseCrud`的数组 prop 改为逗号拼接的 prop 传入~~
~~104、最好去掉 BaseCrud 中的 showPagination 属性（需要权衡下）（不能去掉）~~
~~106、视情况将 BaseTable、BaseCrud 的公共 props 属性合并（不能合并会导致，文档插件不能正常解析出 ts）~~
~~136、完善 BaseNumber 方法~~
~~137、增加演示功能模块~~
~~138、按新划分菜单模块进行菜单重组~~
~~156、将各个组件的属性实现继承~~
~~160、合并并移除 afterSuccess、afterFail、afterReset 等 api（待定）~~
~~163、disabled、readonly 属性，不应该放在 quickAttrs 中~~
~~113、仔细思考 BaseCrud、BaseForm 等应该暴露哪些方法~~
~~120、表格列宽默认宽度为：label 的字符数+1~~
~~123、Crud 的 next 回调函数处理由编辑页面返回到列表页面的刷新列表情况~~
~~169、将学校、公司下拉项转成`T_`模板写法~~
~~90、对于常见的请求下拉项（自定义下拉项文案等）采用 tpl 方式提供~~
~~127、将公司下拉项组件合并到 BaseOption 中~~
~~168、options 后跟一个异步函数，直接获取到 options 数据~~
~~118、qrcode 支持传入 url（即外部传入的图片，暂不考虑这样做了）~~
~~174、完善字典缓存逻辑（不要让 hooks 和 store 中的 useDict 重名了）~~
~~175、考虑要不要将 全局弹窗的弹窗类型和底部按钮参数，一起放入弹窗属性中~~
~~154、全局控件大小增加 mini 选项~~
~~155、完善用户端全局设置：国际化、控件大小、主题切换~~
~~176、完善全局字典缓存逻辑（将处理文本、数组、对象、Promise、批量请求到的字典通过赋值方式，完善字典映射，并将这个方法放在 hooks 中）~~
~~174、完善字典缓存逻辑（不要让 hooks 和 store 中的 useDict 重名了）~~
~~99、完善图片上传 BaseUpload 组件~~
~~172、完善`Suspense`~~
~~110、完善扩展的表格列（表单控件），详见：`InnerExtendTableColComps.vue`，处理值编辑不动的问题~~
~~143、整理 menuTree 组件~~
~~162、处理自动引入后，ref、reactive 编辑器会报错未引入的 问题~~
~~174、使用`encodeURIComponent`、`decodeURIComponent`进行 url 后面的参数转码、解码处理~~
~~101、处理升级 ElementPlus、vue3、vite、vitepress 升级后的启动页面警告问题~~
~~50、打包配置，设置开关，让生产环境不包含 mock 数据文件~~
~~111、处理拖动排序不生效的问题~~
~~64、封装 TreeCrud 组件（完成拼装好后的示例）~~
~~86、移除 `src/core/components/_test_components` 文件夹（记录下 vue 文件中的写法示例之后就移除）~~
~~128、处理功表单项切换为 tpl 后，重置值，textarea 不生效的问题（prop 为 undefined），还有验证下电话号码、密码等的校验是否生效，并修正~~
~~180、整理全局配置文件~~
~~151、按钮自定义权限方法控制，继续完善扩展更复杂场景的功能~~
~~173、完善菜单（静态路由还需处理权限情况）、组件、按钮、代码级别的权限控制~~
~~157、在弹窗属性中实现 v-model 的写法（试试 vModel 应该可以使功能正常）(待定：暂不考虑双向绑定，在弹窗表单中不应该再使用 vModel 用法，而应该是解耦，让逻辑层次清晰，各自组件干各自的事情)~~
~~121、处理打包后，页面空白的问题~~
~~177、mockServer 在 dom 渲染完成之前进行加载，避免首屏白屏时间过长~~
~~177、当处于 docs 时，不进行登录校验~~
~~178、待办事项：完善演示中心、布局设置、docs 文档高亮问题、docs 文档样式错乱问题~~
~~179、自动路由的菜单权限处理（含直接输入路由地址的情况）~~
~~180、打包分包优化~~

## Demo 功能验证清单

~~18、重新确定下 handleRequest、handleResponse 的名称（换个 api 名字，考虑要不要移除）~~
~~22、table 的 cols、rows 属性考虑要不要改名称~~
~~1、BaseIcon 的默认值~~
~~2、BaseBtn 的默认值（用新增按钮），验证继承的`el-button`属性是否生效（重点关注 icon 传入字符串或组件时是否渲染正常，不考虑支持直接传入字符串（考虑性能，跟 el-button 保持一致就好））~~  
~~3、验证按钮权限的 auth 功能是否正常，重点关注 auth 为函数状态时的表现~~  
~~4、移除 BaseCopy、BaseText 的 text 属性，采用直接传入 slot 的方式~~  
~~5、注意验证 BaeCopy 传入 html 字符串时候的表现情况~~  
~~7、验证 BaseImg 的 iconSize 属性大小是否满足 UI 美观要求~~  
~~8、验证 BaseNumberRange 在 BaseCrud 的传参情况，和默认值情况~~  
~~9、验证数字上升、数字过渡组件功能是否完善~~
~~10、写一个新的工作台页面~~
~~12、当某个类型的表单项不存在时，应该直接抛出错误，而不是继续标红展示~~
~~13、BaseImg 的图片大小属性是否正常~~
~~14、级联`C_Region`不生效~~
~~15、验证 BaseEditor 是否能在表单中正常展示~~
~~16、将 childrenFields、addDel 抽离出去~~
~~17、BaseForm、SectionForm 的 FootBtns 的 MoreBtns、插槽功能是否正常~~
~~19、BaseForm 的 pureText 属性未生效~~
~~20、BaseForm debug、log 属性是否生效，log 为字符串时，改变标头文本~~
~~22、docs 脚本中删除因改动文件或文件夹名称，而导致旧的 md 文件成为多余文件的问题~~
~~24、验证嵌套的各个插槽是否生效~~
~~24、增加判断是否是初始化数据时触发的表单 change 事件~~
~~25、验证 BaseForm、SectionForm 的 onBlur、onChange、onFocus 事件是否生效~~
~~26、处理每个页面中的...配置，应该提取到某个全局公共处（考虑性能，用户体验，采用懒加载，少混合处理的模式实现）~~
~~28、处理字段类型为 custom 的情况（不被包裹在 el-form-item 中）。并考虑传入字段的方式，对象 OR 可被 BaseRender 渲染的数据信息或者`{type: 'custom',renderData:''}`更倾向于最后一种~~
~~32、将各个 Demo 示例用空文件占好位置（罗列好组件要包含的内容，方便随时查漏补缺），用`待完善示意`~~
~~34、处理 BaseCrud 中的表单的创建时间区间的 props，考虑要不要用 quickAttrs 来传递属性 rangeProps: [minProp, maxProp]（待确定）~~
~~33、将 BaseCrud 中的表格的创建、更新时间，用组件来展示（有利于扩展性和消除 prop 的字符串和数组的二义性）~~
~~34、SectionForm 换用 BaseSection 验证功能~~
~~35、完善 AddDelList、AnyEleList、AddDelTags 组件功能~~
~~36、表格列支持下 el-input、BaseEditor、BaseImg 等功能验证~~
~~37、完善`InnerExtendTableColComps`组件~~

6、完善所有基础组件的描述类信息
11、完善 BaseNumber.vue 后去掉 BaseNum.vue 组件
21、清除 Demo 的 vue 文件中的 scss 变量写法（待定，也可能不用删除）
23、SectionForm 按下 enter 键是否触发提交
27、考虑合并 StepForm 中 formAttrs 属性和 stepAttrs 属性
29、统一 SectionForm 的 title 为 label 属性名称（待确定）
30、验证 SectionForm 有 props、无 props、整体插槽内容是否生效
31、BaseTable 提供 fetch、params 等参数，不分页(待确定)
38、表单全局禁用，但允许底部某个按钮不禁用
39、BaseRender 的 h 函数渲染，和 html 字符串渲染未按预期
40、BaseForm 表单的 JSON 插槽规则，未按预期
41、BaseTable 中的表格样式混乱
42、BaseCrud 中的表格样式混乱

## Demo 功能 Bug 清单

~~1、前一个按钮设置了 icon 会影响后一个按钮的 icon，还有其他的 auth 属性也会影响到，复现页面：`http://localhost:5090/comp/basic/BaseBtn#/login`~~
~~3、处理 SectionForm 中，带嵌套属性时，重置不生效的 bug，复现页面：`test-center/test-2`~~
~~4、处理打包后顶层不能使用 await 的 bug，参考：`https://www.jianshu.com/p/fb1ad30fd743`~~
~~5、自动路由组件缓存失效~~

2、BaseForm pureText 为 true 时，未解析出字典名称对应的文本值

## 待定事项

1、采用`git submodule`方式维护 mock 和基础方法（待定）
141、将 SectionForm 改为 BaseSectionForm（待确定）
~~143、考虑整合 sass 并加入 css 变量~~
~~144、采用 pnpm 下载的包可能存在问题，比如 WangEditor 的 css 文件找不到~~

## TS 类型处理

1、从对象中获取键名作为 ts 的 type 类型

```ts
// 示例：export type BtnAllNames = keyof InstanceType<typeof btnsMap>;
```

## vip 功能清单

- base 基础分支
- vip1 分支（试用 3 个月）
- vip2 分支（永久）

1、完善配置 JSON 的低代码
2、完善拖拽生成的低代码
63、接入钉钉或飞书群通知消息
17、vue3 封装敏感词、错别字检查的 WangEditor 组件
~~18、生成 docs 文档~~
19、生成 api 文件（提取成 npm 包，Quickly generate api files）
77、上传文件加一项，上传 zip 压缩文件（选择后，解压缩并展开，可勾选部分文件进行上传）
25、增加个性化工作台可以拖动改变布局甚至大小处理功能（拖拽组件，可拖动的工作台）
26、完善 echarts 图表类型
15、完善换肤主题样式  
19、BaseCurd 打印功能  
65、完善浏览器页签通信 hooks 封装（useBroadcastChannel）
21、用上之前内江市国资委系统的皮肤  
62、全局错误拦截，在 App.vue 中处理
63、localStorage、sessionStorage、cookie 汇总 npm 包
64、采用多页面划分多中心模块
65、实现离线存储，预览整个网页（.appcache、manifest）
66、处理低代码创建 Section 表单时，为数组的情况
67、路由多级缓存（参照：Fantastic Admin）
68、菜单标记（数字、点、文字标签标记）
69、增加编辑表单时页面离开提醒
116、新增虚拟列表组件
117、打开文件&预览通用组件（打开并预览 pdf）
147、完善低码中心的配置 JSON 生成页面的逻辑

## Docs 功能清单

1、让 docs 主题色跟 admin 主题色保持一致
2、处理左侧和顶部菜单高亮不生效的问题
3、视情况将 BaseTable、BaseCrud 的公共 props 属性合并（不能合并会导致，文档插件不能正常解析出 ts）
114、将 docs、demos 文件夹放入.vitepress 中

## Npm 包清单

74、将 Quick 的内核抽离成 npm 包
124、`Quick Echarts Vue3`、`Quick Storage` 抽成 npm 包

## 未来功能清单

1、写 Gis 示例
2、扩展 BaseForm 中的非嵌套对象功能（页面：`test-center/test-1`）
3、用 G6 一类的三方库实现 Quick 的功能点或优势点树形梳理图
4、让 scripts 中的文件能够解析 ts：参考（需要升级 node 版本到 22.6.0 以上）`https://blog.csdn.net/weixin_44846945/article/details/142204033`
5、爬取 ElementPlus 官网中的表格属性数据，从而完善低码平台的控件属性设置
6、查询条件支持弹性布局（待完善）
7、支持暗黑模式主题（参照：https://zhuanlan.zhihu.com/p/374732644）
8、BaseCrud 表单控件列完善
9、完善补齐 FormItem 属性
10、完善二维码登录
11、完善多点登录
12、写单元测试
13、从 cookie 中获取 token
14、验证 cookie 存取多个值时的功能是否正常
45、尝试借助 yaml 根据文件目录结构自动生成路由
55、给 Quick Admin 找个合适的图标：在线生成网址：https://www.x-design.com/logo-design/?channel=sllbd336&bd_vid=10705723341415589721
28、完善滚动触顶触底加载 demo 示例
76、请求参数加解密（对登录密码进行处理）
77、减少 import.meta 的出现次数
119、针对多行表头的列设置功能，表格展示时，也用表格合并方式进行展示
171、完善`watch isSimple` 引起的死循环问题，复现地址：`test-center/test-3`
175、yaml 实现自动路由的 meta 配置（待定）
140、处理导入逻辑（完善功能）
141、处理重置 BaseAddDelList 不会变为一项的问题（待定，如果初始值有多项，会涉及重置后展示多项的问题）
158、重新提取并整理，全局配置（尽量不要使用合并对象的方式，考虑完善 importFileFromPaths 方法）
159、批量导出多级表头中的数据
178、完善`T_Number`，输入框类型的数值（最大值不生效），可以考虑 v-model.number 在 input 上
179、实现 v-model 修饰符的动态绑定
180、FormTable 功能不对，并完善功能
181、跳转内部 iframe、新窗口打开跳转链接逻辑需要继续完善
182、写一个程序监控 main.js 的资源加载情况

## 二、优化清单

~~1、优化 App.vue 中的全局弹窗~~  
~~2、登录页面 code 错误时，BaseForm 的 loading 状态处理，考虑采用 fetch 方式进行整理~~  
~~3、去掉 BaseCrud 的 onTableChange 事件~~  
~~6、ExtraBtn 按钮加载渲染时很慢，大概延迟了 0.5s 才渲染出来~~  
~~7、BaseCrud 组件的加载渲染优化~~  
~~6、删除 file-saver 包~~  
~~9、登录页面按 Enter 键时实现登录~~  
~~10、echarts 按需加载~~  
~~11、传入对象优化 onOperateBtns 和 onExtraBtns~~  
~~12、解决 开发环境中 mock 下的图片警告路径的问题~~  
~~13、统一 package.name 和 全局变量 VITE_APP_NAME，都统一使用 VITE_APP_NAME~~  
~~14、优化水印会加深的问题~~  
~~19、popover 自定义~~  
~~20、popconfirm 自定义（貌似不能自定义 title 的内容，因为没提供这个插槽）~~  
~~21、24 小时不登录，则强制重新登录~~  
~~22、登录进去后会出现两个首页 Tag 标签。~~  
~~24、ElementPlus 提示条如果提示同样内容，则做防抖处理~~  
~~25、表单高度过高，点击提交，校验未通过时，自动定位到未校验通过的字段位置处。~~  
~~16、登录页不应该出现水印，且多次登录/出操作，水印不应该逐渐加深。~~  
~~18、打包配置、分包优化；按需加载（例：wangEditor、echarts）降低首屏白屏时间；~~  
~~19、请求失败尝试重新请求，最多三次~~  
~~20、公共库（vue、echarts 等）使用 CDN~~  
~~22、顶部添加路由进度条~~  
~~23、当屏幕宽度较小时，会出现双层滚动条（为复现）~~  
~~25、当打开外链时，若浏览器已打开，则不要新建窗口打开逻辑处理；~~  
~~27、全局 drawer、modal 区分关闭之后是否销毁弹出层~~  
~~33、联调时后端未返回此字段作标记处理~~  
~~40、国际化处理的配置文件（langs）应该分别放在各个模块下方~~  
~~67、完善 CellTable 组件~~
~~68、将级联、下拉项分开，且分同步异步文件夹~~
~~71、将 BaseImg、TagImg 放到同一个文件夹`img`下~~  
~~5、FormItem type==='empty' 相关逻辑完善~~  
~~45、BasicDialog 中 query-table 类名需要提取出来~~  
~~29、大屏数据页面用统一的基础 Echarts 组件~~
~~39、大屏页面的 Echarts 基础组件统一处理~~
~~45、简化 BaseCrud 的 next 回调的刷新列表逻辑~~
~~26、点击导入按钮，弹出的弹窗使用动态引入并解析该弹出层组件~~  
~~36、将{component: '' }的组件渲染方式统一改成 h 函数渲染~~
~~39、操作栏宽度如果指定了，则不会自动进行计算~~  
~~42、组件采用按需加载（例：BaseCrud 中的导入组件、设置表格的组件、打印组件等）~~
~~47、完善从虚拟 dom 中获取 innerText 文本的方法（getVNodeInnerText）~~
~~48、用 h 函数重写 BaseIcon 组件（将全局中的低阶组件中的 BaseIcon 用`<el-icon></el-icon>`形式改写）~~
~~50、`datetimerange`自动设值处理~~
~~51、接入自动引入 vue、vue-router api 的 npm 包`unplugin-auto-import/vite`~~
~~39、调整 slots 的位置到 attrs.slots 中~~
~~35、处理测试专用 BaseCrud 中，label 为自定义组件时，控制台提示 `using `shallowRef`instead of`ref`` 警告的问题~~
~~4、处理 Echarts 警告：DEPRECATED: label.emphasis has been changed to emphasis.label since 4.0~~
~~134、换用富文本编辑器（quill），编辑器推荐参考地址：https://cloud.tencent.com/developer/article/1975072（位置现状，不改动）~~
~~16、完善 small 之后的 compact 的样式及统一调整（compact 应该提取成公共配置，而不是采用参数传递方式，将 compact 改成 mini）；~~
~~17、将 Echarts 的配置纳入到 config 中~~  
~~18、将 WangEditor 的配置纳入到 config 中~~
~~69、将 FieldItem 组件中的 AddDelList、AnyEleList 组件用插槽的方式载入~~

34、通过外链打开新标签页面时，没有页签图标显示  
37、（处理/test/1 页面中的 slots 和 popover 不能用 h 函数写的问题）、
38、全局 Loading 中增加取消请求按钮，并实现取消请求逻辑  
41、layout 系统设置的国际化语言的 bug 处理  
42、研究能被 img 标签 src 属性识别的 svg 配置(参见：https://blog.51cto.com/jackiehao/10750501)  
45、重新处理方法 initBodyHeight，让 dialog 内部 form 和 table 自适应高度  
18、编辑时，如果未保存就关闭弹窗，给出提示还未保存，确认关闭？（统一处理），还有未作任何改动时前端统一提示未作任何修改
40、优化全局加载的图标及样式（在 index.html 文件中）
44、将缓存数据采用本地数据库或其他方式存储（要缓存的数据：字典映射、mock 数据）  
46、找一个通用的深度克隆方法（可以持续完成这个方法：commonClone）  
46、增加一个优化属性`optimization`，用于规避表格、表单中的复杂的计算，默认为 false。计算开销较多的场景示例：操作栏列宽计算、组按钮的属性值及计算
122、深入研究浏览器缓存策略（包括但不限于本地数据库、localStorage、sessionStorage 等），并做好缓存优化
36、进行排序 hooks 封装；并优化点击重置之后，排序参数已重置，但是排序三角形图标仍然高亮的问题
56、借助文件指令优化打包速度（使得不用每次都生成一大堆文件指令改变了的新文件）
109、自测 dialog 和 drawer 内部自动计算自适应滚动高度（并可以考虑将两个的共用逻辑提取成 hooks）
57、按需导入 element-plus
58、不要在 defineEmits 中定义本身就有的 click 事件
59、使用 WeakMap 优化代码
60、使用枚举替换 code 值
61、压缩字体文件和中国地图数据文件
62、使用 iframe 时，动态给 src 赋值，可以避免阻塞主页面的 onLoad 事件、影响页面的并行加载
63、meta 设置进行 SEO 优化
64、保证打包后的静态资源（图片等）路径正确，使用`getWholeUrl`方法
65、研究自动部署：完善 `deploy.sh` 文件，参见：`https://www.vitejs.net/guide/static-deploy.html#github-pages`
~~66、使用`vue-draggle-plus`替换 sortable.js（暂不替换）~~
67、测试验证所有文件都通过 index 文件统一导出带来的性能影响
68、在 http 请求封装中全局捕获异常并统一处理：使得实际开发中不用 try catch
70、完善下载模板 mock 接口
~~71、使用 `useModelData` 进行双向绑定（暂不处理）~~
72、简化 BaseForm 底部按钮覆盖场景的传参类型

## 三、Bug 清单

~~1、登录页点击免费注册和找回密码，direction 会复用（未重置对象引用地址）~~  
~~1、页面标签 404 处理~~  
~~2、route-tags 右键禁用项、按钮事件重构；多个不同的标签右键，出现多个右键菜单的问题处理；~~  
~~3、完善 openDialog、openDrawer~~  
~~layout header 菜单自适应；~~  
~~4、缩放屏幕时，表格宽度自适应，~~  
~~5、增删改查表格操作列右放置，选择列左放置~~  
~~6、导航 tag 关闭之后，将左右视情况按钮禁用，貌似不生效~~  
~~7、关于系统信息：开发者信息透露，给面试官看，增加面试机会~~  
~~8、增删改查组件序号、批量选择~~  
~~9、BaseBtn 按钮大小处理，有弹出框的~~  
~~11、操作栏按钮进一步优化处理~~  
~~12、表格过宽问题处理~~  
~~13、添加导出功能~~  
~~14、BaseGroupBtns 的弹窗功能~~  
~~15、导入~~  
~~16、表格添加汇总栏~~  
~~17、输入框类型校验：密码（确认密码）、手机号~~  
~~18、给不同的操作按钮上不同的颜色~~  
~~20、BaseCrud 的额外按钮添加是否删除所有？请选择数据？等提示~~  
~~21、BaseCrud 中 switch 的值切换不动~~  
~~23、BaseCrud 组件换用 BaseExtraBtns 组件（extraBtns 按钮写入文字未替换成功）~~  
~~23、表格汇总功能完善~~  
~~24、BaseCrud 出现滚动条时，表头固定~~  
~~25、表格全选所有或全不选的功能~~  
~~27、env 环境文件配置~~  
~~28、vite 全局变量 VUE_APP_NAME 配置~~  
~~29、表单防重复提交处理~~  
~~31、Drawer 的 header 的 margin-bottom 改为 0~~  
~~32、Table 组件的表头增加背景色~~  
~~33、vue 动态组件加载优化；~~  
~~35、基础组件逻辑优化~~  
~~36、Echarts 基础图表组件常用参数配置~~  
~~37、日期组件数组转成两个子字段~~  
~~38、提取项目通用的 hooks 或代码片段，比如 loginIn、loginOut 之类的~~  
~~39、将 regexp.ts 提到 config 文件夹下~~  
~~40、相对路径的引用 ts 报错~~  
~~41、表格组件默认值处理~~  
~~42、GroupBtns 按钮三元表达式不生效处理~~  
~~43、封装地址组件（省市区+详细地址）~~  
~~44、后台管理采用动态路由刷新页面会出现 404 页面处理~~  
~~45、自动导入图片脚本执行~~  
~~46、表单默认值处理~~  
~~48、优化 vue3 中使用了过多的 watch~~  
~~49、接口自动化添加默认值~~  
~~50、APP_NAME~~  
~~51、按钮权限问题处理~~  
~~52、列设置点击列名的开关按钮，对应表格会出现多个选择、排序、序号栏目~~  
~~54、cascader 的 placeholder 只显示了 '请选择三个字'~~  
~~55、Excel 导出时，如果有多条数据，则数据不会换行~~  
~~56、打包后 Mock 生效后，工作台页面成 404 了问题解决~~  
~~57、列表页多选选择不了~~  
~~58、看情况要不要添加只允许 pnpm 安装包，添加命令："preinstall": "npx only-allow pnpm"~~  
~~62、从统计数据 -> 统计分析页面退出登录后，再次登录进入不是统计分析页面，而是数据概览页面~~  
~~63、测试专用 - 测试 10 页面出现警告提示：该页面组件未设置组件名，会导致缓存失效，请检查~~  
~~63、处理 nprogress 进度条加载到最后不会消失的 bug~~  
~~64、处理打包分析页面线上环境 404 的 bug；处理内嵌弹性布局基础类页面白屏的 bug；~~  
~~69、http 请求封装增加取消请求功能~~  
~~22、子级、父级表单的部分或整体属性控制（仍需进一步完善）~~  
~~59、右上角头像 - 个人资料 - 点击编辑按钮 - 再点击查看按钮（不能回到有编辑按钮的页面了）~~  
~~60、右上角头像 - 个人资料 - 点击编辑按钮 - 上方的头像的删除图标被挡住了~~  
~~30、图片上传组件处理（并实现默认本地上传并展示出来）~~  
~~75、处理 BaseForm `type='cell' pureText` 时，custom 列未靠上对齐，tabs 的头部应该固定，底部自适应高度滚动，还有疑问气泡未跟 label 文字水平对齐，复现页面：/common-center/user/detail~~
~~71、BaseForm 上设置 `label-suffix="："` 不生效~~
~~34、vue 动态与非动态路由加载优化；~~
~~61、BaseForm 的 @change 事件对 input 未生效，上级菜单选中后，也未触发 change 事件（系统管理 -> 菜单管理）；顺便让初始时候不要触发 change 事件~~  
~~65、处理 BaseCrud 中，刚初始加载页面时： 当 BaseNumberRange 设有默认值时，会触发两次搜索（在测试 3 页面复现）~~  
~~66、点击学校公司下拉项获取焦点时，会触发 crud 列表的请求 && 同时刚加载页面时，会连续触发两次请求（在测试 3 页面复现）~~  
~~73、通过请求获取到的下拉项，放到 BaseCrud 中的 BaseTag 时，获取不到 currMap，导致获取不到文本（/test/3）中可复现~~
~~74、处理 tpl 为 phone 时，校验不生效的问题（复现页面：/system/user/account 中的编辑弹窗）~~
~~76、优化 BaseNumberRange 嵌套层级~~
~~77、处理操作栏宽度有误的 bug。复现页面（`/system/user/account`）~~
~~78、用 BaseConfig 的 provide、inject 方式提供配置（待定）~~
~~81、动态菜单全选后，删除按钮仍是禁用状态：`/common-center/menu/dynamic`~~
~~82、`T_Phone`的电话号码，正则校验无效 bug 处理~~

47、FormItem 为 date-picker，type 为 dateRange 时，设置默认值 value: ["2023-02-08", "2023-02-09"], 会引发报错
67、处理 AddDelList 中，初始为一行，然后新增了 n 项后，然后点击重置按钮，并没有回到最初一行的状态的 bug  
68、处理系统设置-> 选择非默认的布局风格 -> 点击恢复默认设置按钮 -> 布局风格选中为默认值了，但是左侧的页面并没有恢复到默认布局的 bug  
79、处理菜单管理页（`system/menu`）栈溢出问题：`Maximum call stack size exceeded`
80、刷新页面，菜单未展开对应的菜单项，`common-center/menu/automate` 可复现
83、当初次加载进入，路径为根路径时，不会自动跳转到登录页
84、演示中心中的，图例图片路径不正确
85、完善下 ReadMe 中的图例图片（重新截图）

## 四、Vue 极致优化清单

~~1、BaseCopy 中的复制图标采用按需引入方式~~
~~2、将全局的覆盖样式写到各个组件里~~
~~3、将 CellForm、CellTable 融合到 BaseForm 里面，只更改样式就行了~~
~~70、工程量大了后，全局字典，以及命名是否会重复的优化处理手段~~
61、给 BaseForm、SectionForm 初始加载时添加骨架屏
20、利用 color-scheme 设置夜间模式
24、Ts 类型命名优化，尽可能复用使用 UI 框架的 Ts 类型  
38、全局 Ts 命名语义化，从 UI 库中继承，从当前工程定义好的基础类型继承  
28、看浏览器面板，做好细致性能分析  
31、Eslint 优化处理
43、整理全局的 any、CommonObj TS 类型
116、用 markRaw 优化代码
41、使用位运算等优化代码  
43、将 mock 数据进行缓存
49、当 extraBtns 渲染的组件过多时，采用陆续渲染的方式进行呈现（优化改写）
52、加入 Suspense 优化渲染显示
119、考虑使用 v-once 和 v-memo 来优化渲染性能
52、关注`resolveComponent`、`mergeProps` api
53、Ts 相关的定义`PropType `
70、配置 VsCode 的列表页、新增编辑页 的快速代码片段，并放到：`EditorConfig.md`文件里（vuePage、vueComponent、vueForm、vueSectionForm、vueTable、vueCrud、vueAddEdit），先在`src/_code-tpl` 中完善代码片段。
30、BaseForm 中 addDel 类型的组件，点击右侧加号之后，默认让第一个元素聚焦
15、测试 3 页面选择多标签时，自动根据宽度，控制是否显示+1 图标  
37、每次打开或新进入一个表单时，默认让第一个表单项聚焦
38、完善 isOptimization 优化内容的撰写
1、 大一点的 vue 组件采用按需加载（例：BaseCrud 中的导入、设置表格、打印 excel 组件等）
2、 引入 js 文件的模块采用按需加载；
3、 采用位运算优化；
4、 设置 isOptimization （是否优化开关），来避免较为复杂的运算逻辑
5、 高阶组件不能用于低阶通用组件中（例：通用组件的图标不用 BaseIcon）
65、WeakMap 优化
66、低码中心，配置简化 JSON 时候，进行校验并纠错提示
67、找一种更好的传递上下级 grid、disabled、pureText、readonly 之类属性的方式
68、当表单项、表格列只有模板属性时，可以简化为写一个字符串（模板名称）
69、菜单默认为管风琴模式，支持可切换、菜单搜索放在菜单上方搜索处
70、优化 mergeRules 算法
71、定义 noGrid 属性进行表单优化（减少 dom 渲染数量）
72、表单项的宽度不设置 style="width:100%"。只有查询表单中才这样设置
73、完善全局字典本地缓存逻辑
74、全局字典本地缓存请求，并使用 weakMap 来进行缓存优化

### 动画优化相关

1、菜单 main-menu 的 hover CSS 动画过渡效果  
~~2、切换路由时页面的过渡动画~~

### 逻辑优化相关

1、可以考虑 $emit 的优化，示例：

```js
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

## 五、Mock 清单

## 六、工程配置清单

## 七、说明文档清单

1、完善使用说明文档
2、完善注释语法规则说明
3、深入完善 vue-docgen-api 功能

## 八、工程推广相关

~~1. 正式推广之前，将工程改个名字（Quick Admin Vue3、Quick Admin React18）~~  
2. 配置 jkenjs  
3. 自制脚手架，需要用到的库：commander.js、download-git-repo、inquirer、ora、chalk  
4. 创建开源许可（根据 gitee 的提示进行创建）

## 一些参照链接地址

~~1、配置 husky：https://juejin.cn/post/7261862616095146042~~

## 菜单模块划分

1. 测试中心（test-center）  
   -（各类测试、要求覆盖面广而全）
2. 演示中心（demo-center）  
   -（各类组件、控件示例，参照 Fantastic）
   -TreeCrud  
   -开发示例模板
3. 低码中心（low-code-center）  
   -模板管理
   --基础模板  
   ---表字段（只能查看）
   ---表单项（只能查看、查询表单、通用表单）  
   ---表格列（只能查看）  
   --组件模板  
   --页面模板  
   --模块模板  
   -代码生成（参照当前系统并逐步完善）
   --拖拽生成  
   --JSON 配置  
   --JSON 生成
4. 通用中心（common-center）  
   -权限管理  
   -字典管理  
   -开关管理
5. 监控中心（monitor-center）  
   -开发分析
   --组件分析  
   --页面分析  
   -性能分析  
   -异常监控
6. 运营中心（business-center 服务中心）  
   -售卖  
   -售后  
   -意见反馈
7. 营销中心  
   -促销活动
8. 资料中心  
   -文档、仓库等
9. 项目中心（project-center）  
   -智慧教育  
   -轻松笔记

## 包版本升级

```

npm update vue@latest

npm install element-plus@latest
npm install sass@latest sass-loader@latest

npm install vite@latest
```
