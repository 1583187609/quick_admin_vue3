import{l as e}from"./lodash-8dc1f9dc.js";import{t,r as o,k as s,s as n,n as r}from"./index-06b7404a.js";import{a as l,b as a}from"./system-ca7a6aa4.js";import"./dayjs-21617033.js";import{g as i}from"./index-194e202c.js";import c from"./ImportPopup-911a40be.js";import{e as p}from"./element-plus-ee430b3a.js";const u=["delete","export","pass","reject","repeal","enable","forbid","download"],d=[void 0,"index","id","create","update","remark"];function m({btnObj:o,cols:r,seledRows:l,seledKeys:a,total:i,exportCfg:m,emits:f,next:b,openPopup:g,importCfg:x}){const{name:y="",text:h,attrs:v,customRules:j}=o;if(j)return f("extraBtn",y,b,{selectedKeys:[],selectedRows:[],exportRows:[]});const $=(null==v?void 0:v.type)||"primary",w=`color${e.upperFirst($)}`,B=s[w];if(u.includes(y)){const e=l.length===i,o=l.length>m.limit;if(["export"].includes(y)&&o)n({message:`单次${h}不能超过 <b>${m.limit}</b> 条，请缩小查询范围！`,dangerouslyUseHTMLString:!0},"warning");else{const o=`确定 <b style="color:${B};">${h}${e?"全部</b> ":"</b>"} 共 <b style="color:${B};">${l.length}</b> 条记录？`;p.confirm(o,"温馨提示",{type:"delete"===y?"error":"warning",dangerouslyUseHTMLString:!0,closeOnClickModal:!1,confirmButtonText:"确定",cancelButtonText:"取消",confirmButtonClass:`el-button--${$}`,cancelButtonClass:`el-button--${$} is-plain`,draggable:!0}).then((()=>{const e=[];if("export"===y){const o=(null==r?void 0:r.filter((e=>{var o;return"Object"===t(e)&&!(null==(o=null==e?void 0:e.prop)?void 0:o.startsWith("$"))})))||[];e.push(o.map((e=>e.label))),l.forEach((t=>{const s=[];o.forEach((e=>{const{prop:o,type:n,formatter:r}=e;let l="";d.includes(n)&&(l=r?r(t):t[o]??""),s.push(l)})),e.push(s)}))}f("extraBtn",y,b,{selectedKeys:a,selectedRows:l,exportRows:e})})).catch((()=>{}))}}else"import"===y?g("温馨提示",{component:c,attrs:{tplCfg:x,onChange:e=>f("click",y,e)}}):f("extraBtn",y,b,{selectedKeys:[],selectedRows:[],exportRows:[]})}function f(e,t){var o,s;const{groupBtns:n,cols:r=[]}=t;if("operate"===e)return n&&"operate"!==(null==(s=null==(o=r.slice(-1))?void 0:o[0])?void 0:s.type);return t[e]&&!r.find((t=>t.type===e))}function b(e,s){const{attrs:n,type:i=r,options:c=[]}=e;if("cascader"===i)return"Array"===t(s)?l(c,s):a(c,s);if("select"===i){if(null==n?void 0:n.multiple){return c.filter((e=>s.includes(e.value))).map((e=>e.label)).join("、")}return a(c,s)}return"BaseNumberRange"===i||"date-picker"===i?null==s?void 0:s.join(o):s}function g(e,o,s){var n;const r="Function"===t(s)?s(e,o):s;return(null==(n=null==r?void 0:r.map((t=>i(t,e))))?void 0:n.filter((e=>!!e.name)))??[]}export{g as a,u as b,b as g,m as h,f as n};