import{a9 as e}from"./index-df51bfa3.js";import{b as t,P as a,a as r}from"./mock-82b0ce6c.js";import s from"./UploadAvatar-aef4dbf4.js";import{d as o,$ as p,e as l,ai as d,o as u,P as i,Q as n,W as m,u as c,L as b}from"./@vue-2b5461a3.js";const f=o({name:"StatisticsAnalyzeAddEdit",__name:"AddEdit",props:{id:{},pureText:{type:Boolean},refreshList:{}},setup(o){const f=o,{id:y}=f,h=p(f.id?{}:{gender:0,status:1}),x=l([{prop:"avatar",label:"头像",required:!1,type:"custom"},{prop:"nickname",label:"昵称",required:!1,attrs:{maxlength:16}},{prop:"name",label:"姓名",attrs:{maxlength:6}},{prop:"gender",label:"性别",type:"radio-group",options:"Gender",attrs:{type:"button"}},{prop:"age",label:"年龄",type:"input-number",attrs:{min:0,max:150}},{prop:"type",label:"类型",type:"select",required:!1,options:"RoleType"},{prop:"status",label:"状态",type:"radio-group",required:!1,options:"EnableStatus",attrs:{type:"button"}},{prop:"address",label:"地址",required:!1,type:"cascader",options:"Region",attrs:{style:"width: 100%"}},{prop:"phone",label:"电话",required:!0,extra:{valid:"phone"}}]);return function(t){if(!t)return;e({id:t}).then((e=>{Object.assign(h,e)}))}(y),(e,o)=>{const p=d("BaseForm");return u(),i(p,{request:c(t),modelValue:h,"onUpdate:modelValue":o[0]||(o[0]=e=>h=e),style:b({width:e.pureText?"350px":"500px"}),fields:x.value,pureText:e.pureText,fetch:c(y)?c(a):c(r),fetchSuccess:e.refreshList},{avatar:n((({form:e})=>[m(s,{modelValue:e.avatar,"onUpdate:modelValue":t=>e.avatar=t},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["request","modelValue","style","fields","pureText","fetch","fetchSuccess"])}}});export{f as _};
