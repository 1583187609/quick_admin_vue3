import{B as e}from"./@element-plus-c17b3efe.js";import{s,_ as a}from"./index-9d680563.js";import"./dayjs-21617033.js";import"./lodash-8dc1f9dc.js";import{u as o}from"./element-plus-ee430b3a.js";import{d as t,e as l,f as i,ai as r,aq as p,o as m,c as u,F as n,a9 as d,P as j,Q as c,U as f,V as v,R as g,u as h,T as y,n as b}from"./@vue-2b5461a3.js";import"./qs-238f3f4b.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";const k={class:"add-del-tag f-fs-fs-w"},V=a(t({name:"AddDelTag",__name:"AddDelTag",props:{modelValue:{default:()=>[]},maxNum:{default:10}},emits:["update:modelValue"],setup(a,{emit:t}){const V=a,x=t,{formItem:_}=o(),z=l(),w=l(""),C=l(V.modelValue),N=l(!1);function q(){if(""!==w.value){if(C.value.find((e=>e===w.value)))return s(w.value+"已添加"),void b((()=>{z.value.focus()}));C.value.push(w.value),N.value=!1,w.value=""}else N.value=!1}return i(C,(e=>{x("update:modelValue",JSON.parse(JSON.stringify(e))),null==_||_.validate("change")}),{deep:!0}),(s,a)=>{const o=r("el-tag"),t=r("el-input"),l=r("el-button"),i=p("focus");return m(),u("div",k,[(m(!0),u(n,null,d(C.value,((e,s)=>(m(),j(o,{class:"m-2",onClose:e=>function(e,s){C.value.splice(s,1)}(0,s),key:e,closable:""},{default:c((()=>[f(v(e),1)])),_:2},1032,["onClose"])))),128)),C.value.length<s.maxNum?(m(),u(n,{key:0},[N.value?g((m(),j(t,{key:0,class:"inp m-2",size:"small",closable:"",placeholder:"请输入",autofocus:"",clearable:"",modelValue:w.value,"onUpdate:modelValue":a[0]||(a[0]=e=>w.value=e),onBlur:q,ref_key:"inpRef",ref:z},null,8,["modelValue"])),[[i]]):(m(),j(l,{key:1,class:"m-2",icon:h(e),size:"small",type:"primary",plain:"",onClick:a[1]||(a[1]=e=>N.value=!0)},null,8,["icon"]))],64)):y("",!0)])}}}),[["__scopeId","data-v-9083a201"]]);export{V as default};
