import{v as e,V as t,W as a}from"./index-06b7404a.js";import{d as s,$ as r,ai as d,o as p,P as l,u as o,E as i}from"./@vue-2b5461a3.js";const u=s({name:"__tplAddEdit",__name:"AddEdit",props:{data:{},refreshList:{}},setup(s){const{getOpts:u,getText:n}=e();u("EnableStatus");const c=s;let m=r(Object.assign({},c.data));const f=[{prop:"ffdx",label:"发放对象",required:!0,attrs:{type:"textarea"},tips:"多个用户用，分隔"},{prop:"ffje",label:"发放金额",required:!0,type:"input-number"},{prop:"imtz",label:"IM通知",attrs:{type:"textarea"}},{prop:"bz",label:"备注",required:!0,attrs:{type:"textarea"}}];return(e,s)=>{const r=d("BaseForm");return p(),l(r,{style:{width:"600px"},modelValue:o(m),"onUpdate:modelValue":s[0]||(s[0]=e=>i(m)?m.value=e:m=e),fields:f,fetch:e.data?o(t):o(a),fetchSuccess:e.refreshList,extraParams:e.data?{id:e.data.id}:void 0},null,8,["modelValue","fetch","fetchSuccess","extraParams"])}}});export{u as _};
