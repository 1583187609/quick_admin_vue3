import{g as t}from"./index-194e202c.js";import{t as s}from"./index-06b7404a.js";import"./dayjs-21617033.js";import{a as o}from"./vue-router-7f68ddec.js";import{d as e,a3 as r,k as i,o as p,P as a,Q as n,M as m,u as l,ai as j,W as u,J as c,U as d,V as f}from"./@vue-2b5461a3.js";import"./@element-plus-c17b3efe.js";import"./lodash-8dc1f9dc.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const v=e({inheritAttrs:!1,name:"BaseBtn",props:{name:{type:[String,Object,Function],default:"empty"},icon:{},data:{},popconfirm:{type:[Boolean,Object]}},emits:["click"],setup(e,{emit:v}){const h=e,b=r(),y=o(),g=v,k=i((()=>t(h.name)));function x(){const{name:t,to:o,attrs:e,customRules:r}=k.value;if(void 0===o)g("click",t);else{const t=s(o);y.push("Function"===t?o(h.data):o)}}return(t,s)=>{var o,e;const r=j("el-button"),i=j("el-popconfirm");return(null==(o=k.value)?void 0:o.popconfirm)?(p(),a(i,m({key:0,onConfirm:x},null==(e=k.value)?void 0:e.popconfirm),{reference:n((()=>[u(r,m({class:"base-btn"},{...k.value.attrs,...l(b)}),{default:n((()=>[c(t.$slots,"default",{},(()=>{var t;return[d(f((null==(t=k.value)?void 0:t.text)||"-"),1)]}))])),_:3},16)])),_:3},16)):(p(),a(r,m({key:1,class:"base-btn",onClick:x},{...k.value.attrs,...l(b)}),{default:n((()=>[c(t.$slots,"default",{},(()=>{var t;return[d(f((null==(t=k.value)?void 0:t.text)||"-"),1)]}))])),_:3},16))}}});export{v as default};