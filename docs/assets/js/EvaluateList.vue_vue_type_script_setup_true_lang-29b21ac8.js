import{d as p,ai as s,o as r,P as j,u as e}from"./@vue-2b5461a3.js";const t=p({name:"SystemUserDetailBaseInfo_componentsEvaluateList",__name:"EvaluateList",props:{type:{default:1}},setup(p){const t=p,l=[{prop:"pjr",label:"评价人",width:100},{prop:"pjlx",label:"评价类型",width:80},{prop:"pjnr",label:"评价内容",width:250},{prop:"pjsj",label:"评价时间",width:110}],a=[{pjr:"李一",pjsj:"2023-07-26",pjnr:"有礼貌",pjlx:"否"},{pjr:"李二",pjsj:"2023-07-26",pjnr:"没礼貌",pjlx:"是"},{pjr:"李三",pjsj:"2023-07-26",pjnr:"有礼貌",pjlx:"否"},{pjr:"李四",pjsj:"2023-07-26",pjnr:"没礼貌",pjlx:"否"}].filter(((p,s)=>1===t.type?s%2==0:s%2==1));return(p,t)=>{const o=s("BaseTable");return r(),j(o,{cols:l,rows:e(a),class:"report-list"},null,8,["rows"])}}});export{t as _};
