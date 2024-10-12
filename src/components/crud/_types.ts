export interface CrudProps {
  // modelValue?: CommonObj; //表单数据
  // rowKey?: string;
  // formAttrs?: CommonObj; //el-form的属性配置
  // tableAttrs?: CommonObj; //el-table的属性配置
  // pageAttrs?: CommonObj; //分页配置
  // disabled?: boolean; //是否禁用
  // operateBtnsAttrs?: OperateBtnsAttrs; //分页配置
  // pagination?: false | TablePaginationAttrs; //是否分页
  // fields?: FormField[];
  // sections?: SectionFormItemAttrs[];
  // cols?: TableCol[];
  // selectAll?: boolean;
  // fetch?: UniteFetchType;
  // fetchSuccess?: (res: any) => void; //请求成功的回调函数
  // fetchFail?: (err: any) => void; //请求成功的回调函数
  // immediate?: boolean; //页面刚创建时是否立即发起请求获取数据
  // extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
  // operateBtns?: OperateBtnsType; //分组按钮，在表格的操作一栏
  // reqMap?: ReqMap; //请求参数的键名映射
  // resMap?: ResMap; //响应参数的键名映射
  // showPagination?: boolean;
  // summaryList?: SummaryListType; //汇总请求数据的 list
  // exportCfg?: {
  //   limit: number; //一次性导出数据的上限条数
  // };
  // extraParams?: CommonObj; //额外的参数
  // log?: boolean; //是否console.log(rows)
  // debug?: boolean; //是否在打印请求数据之后不执行请求的逻辑
  // isOmit?: boolean; //是否剔除掉undefined, ''的属性值
  // changeFetch?: boolean; //是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
  // inputDebounce?: boolean; //输入框输入时，是否通过防抖输入，触发搜索
  // filterByAuth?: FilterByAuthFn;
  // grid?: Grid;
  // compact?: boolean; //表单项之间排列是否紧凑点
  // size?: CommonSize;
  // rowNum?: number; //筛选条件的表单展示几行
  // handleRequest?: (args: CommonObj) => CommonObj; //处理参数
  // handleResponse?: (res: any) => any; //处理响应数据
}
