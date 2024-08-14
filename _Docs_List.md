# 待做事项

~~1、多行注释默认 hidden。对这类的注释隐藏掉：凡是`/** hidden`后面跟了文字的，例如 hidden~~
~~4、全局 Dialog 和 Drawer 不能正常打开。全局弹出层处理~~
~~5、tsPath 如果是 vue 文件，则获取其 ts 类型并展示出来~~
~~6、换行符使用变量代替~~
~~7、/src/examples 文件夹 改名为 /src/demos~~
~~8、从 vue 文件中读取 ts 声明类型，保留注释与写入顺序。~~
~~11、完善 demos 中更改文件或文件夹名之后，跟随删除 docs 中的文件及文件夹名逻辑处理~~
~~12、处理 `getItemsFromObjStr` 中解析不正确的问题~~
~~13、/demos 路径提取到变量中~~
~~14、完善 vuets 文件（Vue ts 文件的解析）~~
~~15、换行符替换变量为 N~~
~~16、替换注释中 tip danger warning details 的写法。默认为 tip~~
~~18、将 docs 和 demos 的路径整合成一样的嵌套结构~~
~~20、把配置文件提取出来，如：docsPath、demosPath~~
~~21、将 getNearLineIndex 的 sum 变量优化下~~
~~23、线上环境过滤 docs 文件夹下的第一级 test、demo~~
~~23、设置内容区域宽度~~
~~24、完善首页信息描述，并生成首页~~
~~25、将路径中空格后面的中文移出~~
~~27、console.log 标识打印颜色~~
~~28、展示文件去除文档注释~~

2、菜单项高亮、上下一页失效问题处理
3、表单示例中，多个表单貌似共用了同一个实例。提交表单触发表单校验时，会自动触发其他表单的自动滚动位置
9、把文件处理单独提取到一个文件夹中
10、把文件改名、写入新文件等辅助方法提取到一个文件夹中
26、更改主题色
19、把 Quick Vitepress Docs 抽成 可配置型的
~~22、修改 createGitHubUrl 中的 `folder = "demos/"`为`folder = "${demosPath}`~~
~~29、整合 GlobalPopup 组件，内部包含 BasicDialog 和 BasicDrawer 组件~~
~~30、对不确定的增加 beta 标识~~

# 组件优化事项

1、BarsImg
2、AddDelTag
3、BaseAudio
3、BaseVideo
4、BaseCopy 图标换用 DocumentCopy
5、BaseEditor
6、完善 BaseKeyVal 的 optsName
7、BaseNum
8、BaseQrcode
9、LoadMore
10、OpenFile 考虑看要不要移出
11、TestView 考虑改名
12、CellTable 考虑用其他方式替代，并移出这个组件
13、ValidTable 考虑用其他方式替代，并移出这个组件
14、BaseTree
14、AuthTree
15、OrgTree
16、BaseUpload、及其同类型的三个

## 重大尝试革新

~~1、将.vue 文件放入文件夹中，通过 export default 暴露出来，保持原有引用路径不变~~
~~3、将 BaseImg, BarsImg 放入 img 文件夹下~~
~~4、全局 Ts 类型处理~~
~~5、将 `export * from "./_types";` 从 `index.ts中移除`~~
~~2、将 dict 拆为 select、cascader、tree 三种进行管理~~
6、创建一个读取器去解析字典
7、完成 http Ts 类型的书写
8、当 summary 的描述类文字为多个换行时，则换行展示
