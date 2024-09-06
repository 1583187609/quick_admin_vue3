# 进一步降低开发心智负担清单 - 针对 Aui Plus

下面带删除线标识的为不必要，但可参考项，标红为重点项。

## 设计原则

~~[在线预览](https://1583187609.github.io/quick_admin/vue3/preview/#/test/3) ~~

~~（1）全继承 + 强扩展 + 严统一 + 活配置 + 易使用 + 高效率 + 低代码 + 高内聚 + 低耦合~~  
~~（2）上手成本：~~  
~~（3）完全继承：~~  
~~（4）多级配置：子类覆盖父类~~  
~~（5）逻辑解耦：~~  
~~<1> 一个组件只做一件事：BaseForm、SectionForm、StepForm、BaseTable、EditTable、……~~  
~~<2> 弹窗跟弹窗内部内容解耦：~~  
~~（6）工程移植性：自定义一套 scss 变量，方便工程移植和快速上手~~

## 开发体验

1、<span style="color:red">按钮（BaseBtn）</span>  
（1）一处配置新增、编辑、删除、导入、导出等按钮，并设置好：文字、图标、样式、位置、权限、路由跳转  
（2）整合确认提示：例：删除按钮的 popconfirm  
（3）整合导入功能：弹窗（文案描述、下载模板、直接导入）  
（4）整合导出功能：导出确认、最大导出条数等  
2、<span style="color:red">弹窗（BasicPopup）</span>  
（1）openPopup、closePopup：支持 dialog 和 drawer。一处配置弹窗属性  
~~（2）next 回调（可传参进行覆盖）：一次性完成：提示成功，关闭弹窗，刷新列表~~  
3、<span style="color:red">字典（dict）：</span>  
（1）整合 select、cascader、tree 下拉项  
（2）整合标签：在字典中配置 el-tag 的样式属性（常用于表格列中展示），使得全局统一  
4、表单：  
（1）<span style="color:red">默认配置：placeholder、clearable、showWordLimit、required、……</span>  
（2）字段单双 prop：  
（3）<span style="color:red">内置表单校验规则：{rulesType: 'phone'} //password、age、……</span>  
（4）整合字段说明 popover  
（5）表单提交防抖处理（防重复提交）  
（6）next 回调  
（7）响应式栅格布局（grid）：  
~~（8）readonly、disabled、pureText~~
5、表格：  
（1）内置组件：BaseTag、BaseCopy、BaseText、BaseImg、BaseTag、……  
（2）内嵌组件：UserInfo、……  
（3）<span style="color:red">设置默认列宽：备注、时间、创建时间、更新时间等……</span>  
6、增删改查  
（1）<span style="color:red">未联调提示（标红处理）：</span>  
（2）整合表格头字段说明 popover：  
（3）操作栏按钮自动展示更多下拉按钮、自动计算列宽：  
（4）<span style="color:red">统一处理空占位符：用 '-' 表示</span>  
7、工程级处理  
（1）对请求参数、响应参数的 console.log 进行颜色标识处理：  
（2）易上手、工程移植性：配置一套核心简洁易记得 scss 变量，去影响控制 UI 框架的 css 变量  
~~（3）文件夹嵌套建立遵循原则：删除或移动某个模块功能时，对整个工程的文件改动影响最小~~  
~~（4）文件、文件夹、变量等命名规则（降低心智负担）：特殊文件夹以下划线开头命名（置顶、区分同级其他文件夹）~~  
（5）vite 配置自动生成组件名称：  
（6）多级可配置（全局->局部）：子类覆盖父类  
（7）<span style="color:red">文件内变量区分：TS 使用大驼峰、api 使用大驼峰，并以 Get 或 Post 开头（避免一个文件中，搜一个变量名，一搜一大堆，不利于问题处理排查）</span>  
（8）<span style="color:red">axios 封装，让 get 和 post 传参行为一致：目前是 `get=>params  post=> data`，可以稍微处理下</span>  
（9）<span style="color:red">国际化语言块应该写在各个模块下：有利于一旦某个功能模块（文件夹）移动或删除，对整个工程代码的改动影响最小</span>  
~~8、快速开发：~~  
~~（1）重置样式 + 弹性布局基础类 + 占位组件（BaseIcon、BaseImg）快速完成页面布局：~~  
~~（2）编辑器配置代码片段：~~

~~上述罗列的点大概占 Quick Admin 的约 90%，暂时想到这些。~~

## 用户体验

1、增删改查列表：防抖 change 事件触发列表请求  
2、表单校验失败，自动滚动到错误字段处  
3、<span style="color:red">增删改查列表页：基于弹性布局和一些 ElementPlus el-table 的样式改造，可以实现列表区域滚动高度自适应</span>

## 更多工具

（1）弹性布局基础类（[点击查看](https://1583187609.github.io/produce/flex-layout/) ）：针对 UI 100%还原，配合全局样式重置，提升静态页面开发效率约 30%。  
（2）生成 api 文件：依赖 Eolink 或 Yapi 一类的在线文档，通过 node 生成 api 文件  
~~（3）低代码：配置 JSON 生成（[点击查看](https://1583187609.github.io/quick_admin/vue3/preview/#/test/9)）、通过拖拽生成~~

对当前后管的进一步降低心智负担点，暂时想到这些。
