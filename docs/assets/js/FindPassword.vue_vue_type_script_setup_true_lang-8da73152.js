import a from"./Captcha-38ed1be2.js";import{d as e,$ as o,o as s,P as t,Q as l,u as p,E as r,ai as d,W as n}from"./@vue-2b5461a3.js";const c=e({name:"Login_componentsFindPassword",__name:"FindPassword",setup(e){let c=o({});const m=[{prop:"pheon",label:"电话",required:!0,extra:{valid:"phone"}},{prop:"captcha",label:"验证码",required:!0,attrs:{maxlength:4}}];return(e,o)=>{const u=d("BaseForm");return s(),t(u,{style:{width:"450px"},modelValue:p(c),"onUpdate:modelValue":o[1]||(o[1]=a=>r(c)?c.value=a:c=a),fields:m},{captcha:l((()=>[n(a,{modelValue:p(c).captcha,"onUpdate:modelValue":o[0]||(o[0]=a=>p(c).captcha=a),prop:"captcha"},null,8,["modelValue"])])),_:1},8,["modelValue"])}}});export{c as _};
