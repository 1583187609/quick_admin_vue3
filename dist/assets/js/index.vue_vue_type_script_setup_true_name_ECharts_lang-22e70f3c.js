import{z as e,h as a,k as s,l as t,n as i,o as r,q as n,j as o,A as l,B as u,C as h,D as v,s as d,t as p,E as c,r as m,F as w,G as f,H as g,v as k,w as x,x as z}from"./echarts-911d2a7f.js";import"./echarts-liquidfill-59a83793.js";import{p as j}from"./@vueuse-2ec33eb0.js";import{d as C,k as y,e as B,f as E,j as _,n as L,B as q,o as D,c as I,L as A,an as F}from"./@vue-2b5461a3.js";a([s,t,i,r,n,o,l,u,h,v,d,p,c,m,w,f,g,k,x,z]);const G=C({name:"ECharts",__name:"index",props:{option:{},renderer:{default:"canvas"},resize:{type:Boolean,default:!0},theme:{},width:{},height:{},onClick:{}},setup(a,{expose:s}){const t=a,i=y((()=>t.width||t.height?{height:t.height+"px",width:t.width+"px"}:{height:"100%",width:"100%"})),r=B(),n=B(),o=()=>{n.value&&n.value.setOption(t.option,{notMerge:!0})};E(t,(()=>{o()}));const l=e=>t.onClick&&t.onClick(e),u=()=>{n.value&&t.resize&&n.value.resize({animation:{duration:300}})},h=j(u,300,{maxWait:800});return _((()=>{L((()=>{r.value&&(n.value=e.getInstanceByDom(r.value),n.value||(n.value=F(e.init(r.value,t.theme,{renderer:t.renderer})),n.value.on("click",l),o()))})),window.addEventListener("resize",h)})),q((()=>{var e;null==(e=n.value)||e.dispose(),window.removeEventListener("resize",h)})),s({getInstance:()=>n.value,resize:u,draw:o}),(e,a)=>(D(),I("div",{id:"echarts",ref_key:"chartRef",ref:r,style:A(i.value)},null,4))}});export{G as _};
