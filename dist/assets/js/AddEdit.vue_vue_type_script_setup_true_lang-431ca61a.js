import{v as e,a1 as a,a2 as t,V as s,W as r}from"./index-06b7404a.js";import p from"./UploadAvatar-5006aa87.js";import{a as o}from"./cascader-72ceb873.js";import{d as l,$ as d,e as n,ai as u,o as i,P as m,Q as c,W as y,u as b,E as f,L as g}from"./@vue-2b5461a3.js";const h=l({name:"SystemUserAccountAddEdit",__name:"AddEdit",props:{id:{},pureText:{type:Boolean},refreshList:{}},setup(l){const{getOpts:h}=e(),x=h("Gender"),v=h("RoleType"),q=h("EnableStatus"),V=l,{id:j}=V;let T=d({gender:0,status:1,type:3,age:18});const U=n([{prop:"avatar",label:"头像",required:!1,type:"custom",tips:"只能上传.jpg,.png,.gif,.jpeg类型，且大小不超过1M"},{prop:"nickname",label:"昵称",required:!1,attrs:{maxlength:16}},{prop:"name",label:"姓名",attrs:{maxlength:6}},{prop:"gender",label:"性别",type:"radio-group",span:12,options:x,attrs:{type:"button"}},{prop:"age",label:"年龄",type:"input-number",span:12,attrs:{min:0,max:150}},{prop:"type",label:"角色类型",type:"select",required:!0,span:12,options:v},{prop:"status",label:"启用状态",type:"radio-group",required:!0,span:12,options:q,attrs:{type:"button"}},{prop:"phone",label:"电话",required:!0,span:12,valid:"phone"},{prop:"psd",label:"密码",required:!0,span:12,valid:"password"},{prop:"address",label:"居住地址",required:!1,type:"cascader",options:o("Region"),attrs:{style:"width: 100%"}},{prop:"remark",label:"备注",attrs:{type:"textarea"}}]);return j&&a({id:j}).then((e=>{Object.assign(T,e)})),(e,a)=>{const o=u("BaseForm");return i(),m(o,{request:b(t),modelValue:b(T),"onUpdate:modelValue":a[0]||(a[0]=e=>f(T)?T.value=e:T=e),style:g({width:e.pureText?"350px":"550px"}),fields:U.value,pureText:e.pureText,fetch:b(j)?b(s):b(r),fetchSuccess:e.refreshList},{avatar:c((({form:e})=>[y(p,{modelValue:e.avatar,"onUpdate:modelValue":a=>e.avatar=a},null,8,["modelValue","onUpdate:modelValue"])])),_:1},8,["request","modelValue","style","fields","pureText","fetch","fetchSuccess"])}}});export{h as _};
