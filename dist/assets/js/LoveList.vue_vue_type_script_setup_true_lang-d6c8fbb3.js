import{d as s,ai as f,o as t,P as e}from"./@vue-2b5461a3.js";const p=s({__name:"LoveList",props:{type:{default:1}},setup(s){const p=s,r=[...1===p.type?[{prop:"jsf",label:"接收方",width:100}]:[],...2===p.type?[{prop:"fcf",label:"发出方",width:100}]:[],{prop:"fssj",label:"发送时间",width:110},{prop:"fsnr",label:"发送内容",width:250},{prop:"sfgst",label:"是否告诉他",width:80}],o=[{fcf:"张三",jsf:"李四",fssj:"2023-07-26",fsnr:"盗用网图",sfgst:"否"},{fcf:"张三",jsf:"李四",fssj:"2023-07-26",fsnr:"盗用网图",sfgst:"是"},{fcf:"张三",jsf:"李四",fssj:"2023-07-26",fsnr:"盗用网图",sfgst:"否"}];return(s,p)=>{const a=f("BaseTable");return t(),e(a,{cols:r,rows:o,class:"love-list"})}}});export{p as _};
