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

28、完善滚动触顶触底加载 demo 示例  
45、尝试借助 yaml 根据文件目录结构自动生成路由  
50、打包配置，设置开关，让生产环境不包含 mock 数据文件  
55、给 Quick Admin 找个合适的图标：在线生成网址：https://www.x-design.com/logo-design/?channel=sllbd336&bd_vid=10705723341415589721  
64、封装 TreeCrud 组件（自行拼装即可）
74、将 Quick 的内核抽离成 npm 包
124、`Quick Echarts Vue3`、`Quick Storage` 抽成 npm 包
76、请求参数加解密（对登录密码进行处理）  
86、移除 `src/core/components/_test_components` 文件夹（记录下 vue 文件中的写法示例之后就移除）  
90、对于常见的请求下拉项（自定义下拉项文案等）采用 tpl 方式提供
94、用 G6 一类的三方库实现 Quick 的功能点或优势点树形梳理图
99、完善图片上传 BaseUpload 组件
104、最好去掉 BaseCrud 中的 showPagination 属性（需要权衡下）
106、视情况将 BaseTable、BaseCrud 的公共 props 属性合并
82、字典管理是否用 localStorage 存储异步请求的数据，用配置进行管理决定（自测逻辑是否无误）。
101、处理升级 ElementPlus、vue3、vite、vitepress 升级后的启动页面警告问题
107、BarsImg 视情况而改名。
110、完善扩展的表格列（表单控件），详见：`InnerExtendTableColComps.vue`，处理值编辑不动的问题
111、处理拖动排序不生效的问题
113、仔细思考 BaseCrud、BaseForm 等应该暴露哪些方法
114、将 docs、demos 文件夹放入.vitepress 中
116、新增虚拟列表组件
118、qrcode 支持传入 url（即外部传入的图片）
119、针对多行表头的列设置功能，表格展示时，也用表格合并方式进行展示
120、表格列宽默认宽度为：label 的字符数+1
121、处理打包后，页面空白的问题
122、查询条件支持弹性布局（待完善）
123、Crud 的 next 回调函数处理由编辑页面返回到列表页面的刷新列表情况
127、将公司下拉项组件合并到 BaseOption 中
128、处理功表单项切换为 tpl 后，重置值，textarea 不生效的问题（prop 为 undefined），还有验证下电话号码、密码等的校验是否生效，并修正
136、将`BaseCrud`的数组 prop 改为逗号拼接的 prop 传入
135、完善 importFileFromPaths 方法
136、完善 BaseCountTo 方法
137、增加演示功能模块
138、按新划分菜单模块进行菜单重组
139、完善自动路由逻辑
140、处理导入逻辑
141、爬取 ElementPlus 官网中的表格属性数据
142、让 scripts 中的文件能够解析 ts：参考（需要升级 node 版本到 22.6.0 以上）`https://blog.csdn.net/weixin_44846945/article/details/142204033`
143、整理 menuTree 组件
144、抽离 IconPicker 组件

## 待定事项

1、采用`git submodule`方式维护 mock 和基础方法（待定）
141、将 SectionForm 改为 BaseSectionForm（待确定）
143、考虑移除 sass

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

## Docs 功能清单

1、让 docs 主题色跟 admin 主题色保持一致
2、处理左侧和顶部菜单高亮不生效的问题

## 未来功能清单

59、写 Gis 示例

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
~~71、将 BaseImg、BarsImg 放到同一个文件夹`img`下~~  
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

16、完善 small 之后的 compact 的样式及统一调整（compact 应该提取成公共配置，而不是采用参数传递方式，将 compact 改成 mini）；  
17、将 Echarts 的配置纳入到 config 中  
18、将 WangEditor 的配置纳入到 config 中  
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
66、使用`vue-draggle-plus`替换 sortable.js
67、测试验证所有文件都通过 index 文件统一导出带来的性能影响
68、在 http 请求封装中全局捕获异常并统一处理：使得实际开发中不用 try catch
69、将 FieldItem 组件中的 AddDelList、AnyEleList 组件用插槽的方式载入
70、完善下载模板 mock 接口

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

34、vue 动态与非动态路由加载优化；
47、FormItem 为 date-picker，type 为 dateRange 时，设置默认值 value: ["2023-02-08", "2023-02-09"], 会引发报错
61、BaseForm 的 @change 事件对 input 未生效，上级菜单选中后，也未触发 change 事件（系统管理 -> 菜单管理）；顺便让初始时候不要触发 change 事件  
65、处理 BaseCrud 中，刚初始加载页面时： 当 BaseNumberRange 设有默认值时，会触发两次搜索（在测试 3 页面复现）  
66、点击学校公司下拉项获取焦点时，会触发 crud 列表的请求 && 同时刚加载页面时，会连续触发两次请求（在测试 3 页面复现）  
67、处理 AddDelList 中，初始为一行，然后新增了 n 项后，然后点击重置按钮，并没有回到最初一行的状态的 bug  
68、处理系统设置-> 选择非默认的布局风格 -> 点击恢复默认设置按钮 -> 布局风格选中为默认值了，但是左侧的页面并没有恢复到默认布局的 bug  
73、通过请求获取到的下拉项，放到 BaseCrud 中的 BaseTag 时，获取不到 currMap，导致获取不到文本（/test/3）中可复现
74、处理 tpl 为 phone 时，校验不生效的问题（复现页面：/system/user/account 中的编辑弹窗）
76、优化 BaseNumberRange 嵌套层级
77、处理操作栏宽度有误的 bug。复现页面（`/system/user/account`）
~~78、用 BaseConfig 的 provide、inject 方式提供配置（待定）~~
79、处理菜单管理页（`system/menu`）栈溢出问题：`Maximum call stack size exceeded`
80、刷新页面，菜单未展开对应的菜单项，`common-center/menu/automate` 可复现
81、动态菜单全选后，删除按钮仍是禁用状态：`/common-center/menu/dynamic`

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

## 八、工程推广相关

~~1. 正式推广之前，将工程改个名字（Quick Admin Vue3、Quick Admin React18）~~  
2. 配置 jkenjs  
3. 自制脚手架，需要用到的库：commander.js、download-git-repo、inquirer、ora、chalk

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
