# 这是面试笔记（面试突击）数据库 sql 语句生成器

## 后端

### api

```js 共计45个接口
/*** 基础通用 ***/
// get  /captcha      // 验证码

/*** 字典（下拉项）相关 ***/
// 字典名称：important（重要性）、fresh（重要性）、frequency（出现频率）、mastery（掌握程度）、feedback（反馈类型）
// post    /dictionary/add {name: '字典名称',  module: '所属模块', data: [{label: '', value: ''}]} // 新增字典
// delete /dictionary/delete/:id {value: '字典值'} // 删除字典或删除字典的值
// put   /dictionary/update/:id {label: '', value: '',  module: '所属模块',} // 修改字典
// get  /dictionary/list {name: '字典名称',  module: '所属模块',} // 获取字典列表
// get  /dictionary/detail/:id  // 获取字典详情信息

/*** 开关（配置）相关 ***/
// post    /config/add {name: '配置名称', module: '所属模块', status: '是否启用'} // 新增配置
// delete /config/delete/:id // 删除配置
// put   /config/update/:id {status: '是否启用', module: '所属模块'} // 修改配置
// get  /config/list {id: '配置id', module: '所属模块', name: '配置名称'} // 获取配置列表
// get  /config/detail/:id  // 获取配置详情信息

/*** 用户相关 ***/
// post /user/login {phone: '电话号码', password: '6~16位字母+数字组合密码', captcha: '验证码'} // 用户登录（初次登录即注册）
// delete /user/:id // 删除用户
// put /user/update/:id {userName: '用户名称', ...} // 修改用户
// get /user/list {id:'用户id', role: '用户角色'} // 获取用户列表
// get  /user/detail/:id  // 获取用户信息
// post /user/logout  // 用户登出
// post /user/cancellation  // 用户注销

/*** 内容相关 ***/
// post /topic/add {industryId: '行业分类id', title:'标题', content:'内容'} // 新增题目
// delete /topic/:id  // 删除题目
// put /topic/update/:id {title: '标题', content: '内容'} // 修改题目
// get  /topic/list {industryId: '行业分类id', userId: '用户id', importantLevel: '重要程度',}   // 获取题目列表
// get  /topic/list/recommend {userId: '用户id'}   // 获取题目列表推荐
// get  /topic/detail/:id  // 获取题目信息

/*** 多级分类、树等相关 ***/
// 树名称：industry（行业）、
// post /tree/add  {name: '树的名称', label: '', value: ''} // 单个新增树（根节点）  {pId: '父级id', label: '', value: ''} // 单个新增树（子节点）
// post /tree/add/batch  {name: '树的名称', data: []} // 批量新增树（根节点） {pId: '父级id', data: []} // 批量新增树（子节点）
// delet /tree/delete/:id // 删除树
// put   /tree/update/:id  {label: '', value: ''} // 修改树
// get   /tree/list {name: '树的名称'} // 获取树列表
// get   /tree/detail {name: '树的名称'} // 获取树的数据

/*** 套餐相关 ***/
// post /set-meals/add {endTime:'套餐截止时间', content: '套餐内容'}  // 新增套餐
// delete /set-meals/delete/:id  // 删除套餐
// put /set-meals/update/:id {endTime:'套餐截止时间', content: '套餐内容'} // 修改套餐
// get /set-meals/list {id: '套餐id', endTimeRange: '套餐截止时间范围', content: '套餐内容模糊搜索'} // 套餐列表
// get /set-meals/detail/:id  // 套餐详情

/*** 订单相关 ***/
// post /order/add {userId: '用户id', goodsId: '商品id', setMealsId: '套餐id', orderType: '订单类型', monetaryType: '货币类型', amount: '订单数量'}  // 新增订单
// delete /order/delete/:id  // 删除订单
// put /order/update/:id {goodsId: '商品id', setMealsId: '套餐id', orderType:'订单类型', amount: '订单数量'} // 修改订单
// get /order/list {id: '订单id', orderType: '订单类型', amountRange: '订单数量区间', priceRange: '订单价格区间'} // 订单列表
// get /order/detail/:id  // 订单详情

/*** 反馈相关 ***/
// post /feedback/add {userId: '用户id', type: '反馈类型', content: '反馈内容'}  // 提交（新增）反馈信息
// delete /feedback/delete/:id  // 删除反馈
// put /feedback/update/:id {type:'反馈类型', content: '反馈内容'} // 修改反馈
// get /feedback/list {id: '反馈id', type: '反馈类型'} // 反馈记录
// get /feedback/detail/:id  // 反馈详情
```

## 前端
