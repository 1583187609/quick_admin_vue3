import{X as e}from"./index-df51bfa3.js";import{b as t}from"./mock-82b0ce6c.js";import"./dayjs-70c6b0b9.js";import{d as a,D as s,ai as o,o as r,P as p,u as n}from"./@vue-2b5461a3.js";const m=a({name:"TestTest3SimpleFormIndex",__name:"Index",props:{exampleProp:{default:()=>({})}},setup(a){const m=s("openPopup"),l=[{prop:"tx",label:"头像",type:"BaseUpload"},{prop:"dhhm",label:"电话号码",required:!0,extra:{valid:"phone"}},{prop:"xm",label:"姓名",extra:{popover:"请注意输入真实姓名"},attrs:{maxlength:6}},{prop:"zwjs",label:"自我介绍",attrs:{type:"textarea",maxlength:100,rows:3}}];function i(a,s,o){e({pass:()=>t().then((()=>o())),view:()=>m("第二个纯文本弹窗示例","你好！这是第二个纯文本弹窗示例")},a)}function x(e){return e}return(e,a)=>{const s=o("BaseForm");return r(),p(s,{style:{width:"500px"},fetch:n(t),fields:l,moreBtns:[{name:"pass",popconfirm:!1},{name:"view",text:"查看"}],onMoreBtns:i,handleRequest:x},null,8,["fetch"])}}});export{m as _};
