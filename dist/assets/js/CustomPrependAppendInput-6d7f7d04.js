import{u as e}from"./element-plus-ee430b3a.js";import{d as s,k as t,ai as o,o as l,P as p,Q as a,W as r,u as i,c as n,F as m,a9 as u,U as d}from"./@vue-2b5461a3.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./dayjs-21617033.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";const j=s({name:"CustomPrependAppendInput",__name:"CustomPrependAppendInput",props:{modelValue:{default:"/views/system/menu/Index.vue"},options:{default:()=>[]}},emits:["update:modelValue"],setup(s,{emit:j}){e();const c=s,h=j;let v=t({get(){var e;const[s,...t]=null==(e=c.modelValue)?void 0:e.slice(1,-4).split("/");return new Proxy({sel:"/"+s+"/",inp:t.join("/")},{set(e,s,t){const{sel:o,inp:l}=e;return t.startsWith("/")&&(t=t.slice(1)),h("update:modelValue",`${o}${t}.vue`),!0}})},set(e){}});return(e,s)=>{const t=o("el-option"),j=o("el-select"),c=o("el-input");return l(),p(c,{modelValue:i(v).inp,"onUpdate:modelValue":s[1]||(s[1]=e=>i(v).inp=e),placeholder:"请输入路径，例：/auth/menu/Index",clearable:""},{prepend:a((()=>[r(j,{modelValue:i(v).sel,"onUpdate:modelValue":s[0]||(s[0]=e=>i(v).sel=e),placeholder:"请选择",style:{width:"140px"}},{default:a((()=>[(l(!0),n(m,null,u(e.options,((e,s)=>(l(),p(t,{label:e.label,value:e.value,key:s},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),append:a((()=>[d(" .vue ")])),_:1},8,["modelValue"])}}});export{j as default};
