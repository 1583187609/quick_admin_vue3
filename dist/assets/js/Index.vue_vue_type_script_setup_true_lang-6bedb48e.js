var e,t,n;import{Q as l,R as s}from"./@element-plus-df896130.js";import{c as o,x as a}from"./index-df51bfa3.js";import"./dayjs-70c6b0b9.js";import{g as i}from"./index-ab647bfb.js";import{_ as r}from"./SetTable.vue_vue_type_script_setup_true_lang-9ac02e0b.js";import c from"./SetPrint-b48fbd4c.js";import{_ as p}from"./BatchBtns.vue_vue_type_script_setup_true_lang-a0d6dec4.js";import{d as u,bd as m,k as d,o as f,c as v,P as _,T as S,F as h,a9 as y,D as b,ai as B,K as C,Q as x,W as z,M as g,ah as k}from"./@vue-2b5461a3.js";const j={class:"extra-btns f-fs-c-w"},w=u({name:"ExtraBtns",__name:"Index",props:m({columns:{},allColumns:{},btns:{},toolBtns:{},total:{},isEmpty:{type:Boolean},batchBtn:{type:Boolean},size:{},allSelection:{type:Function},clearSelection:{type:Function},invertSelection:{type:Function}},Object.assign({columns:()=>[],allColumns:()=>[],btns:()=>[],toolBtns:()=>["set"]},null==(n=null==(t=null==(e=o)?void 0:e.BaseCrud)?void 0:t._components)?void 0:n.ExtraBtns)),emits:["click","toolBtn","update:cols"],setup(e,{emit:t}){const n={print:{name:"print",title:"打印",attrs:{type:"primary",icon:l,plain:!0,circle:!0}},set:{name:"colSet",title:"设置",attrs:{type:"primary",icon:s,plain:!0,circle:!0}}},o=e,u=t,m=b("openPopup"),w=d((()=>{const e=o.btns.map((e=>i(e)));return a(e),e})),E=d((()=>o.toolBtns.map((e=>n[e]))));function F(e,t,n){const{columns:l,allColumns:s}=o;if(t){let e=-1;l.findIndex(((t,o)=>{const a=s.findIndex((e=>e.prop===t.prop));return a>n?(e=o,!0):a<n?o===l.length-1&&(e=l.length,!0):void 0})),l.splice(e,0,s[n])}else{const t=l.findIndex((t=>t.prop===e));l.splice(t,1)}u("update:cols",l.slice())}function I(e,t,n){}function O(e,t,n){}function P(){const{columns:e,allColumns:t}=o,n=t.filter((e=>{var t;return!(null==(t=e.prop)?void 0:t.startsWith("$"))})).map((t=>{const{prop:n,label:l,sortable:s=!1}=t;return{colName:l,colProp:n,isShow:!!e.find((e=>e.prop===n)),isExport:!0,isOrder:s}}));m({title:"列设置",closeOnClickModal:!0},k(r,{rows:n,size:o.size,handleShowChange:F,handleExportChange:I,handleOrderChange:O,handleResetColSet:T}),"drawer")}function T(){u("update:cols",o.allColumns.slice()),setTimeout((()=>{P()}))}return(e,t)=>{const n=B("BaseBtn"),l=B("el-button"),s=B("el-tooltip");return f(),v("div",j,[e.batchBtn?(f(),_(p,{key:0,class:"mr-12",allSelection:e.allSelection,clearSelection:e.clearSelection,invertSelection:e.invertSelection,size:e.size,disabled:!e.total},null,8,["allSelection","clearSelection","invertSelection","size","disabled"])):S("",!0),(f(!0),v(h,null,y(w.value,((t,l)=>(f(),_(n,{onClick:e=>{u("click",t)},class:C("small"===e.size?"mb-q":"mb-h"),name:t,size:e.size,key:l},null,8,["onClick","class","name","size"])))),128)),(f(!0),v(h,null,y(E.value,((t,n)=>(f(),_(s,{content:t.title,"show-after":500,key:n},{default:x((()=>[z(l,g({style:{marginLeft:0===n?"auto":void 0},size:e.size,onClick:e=>{var n;"colSet"===(n=t.name)?P():"print"===n&&m("打印设置",c,"dialog")},ref_for:!0},t.attrs),null,16,["style","size","onClick"])])),_:2},1032,["content"])))),128))])}}});export{w as _};
