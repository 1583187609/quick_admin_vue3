import{d as e,$ as t,e as s,k as o,f as a,o as r,P as i,Q as m,M as l,aa as p,u,ai as n,a as d,c as f,a9 as c,J as j,F as h,U as g,K as x,T as v}from"./@vue-2b5461a3.js";import{h as b}from"./_utils-e15a3336.js";import{l as y}from"./lodash-8dc1f9dc.js";import B from"./FooterBtns-ae106e98.js";import{i as T,_ as F}from"./index-06b7404a.js";import"./dayjs-21617033.js";import{d as k}from"./_config-7f8a0c8d.js";import"./system-ca7a6aa4.js";import"./xlsx-8a748b86.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./@element-plus-c17b3efe.js";import"./index-194e202c.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const R=F(e({name:"BaseForm",__name:"BaseForm",props:{modelValue:{default:()=>t({})},fields:{default:()=>[]},pureText:{type:Boolean},fetch:{},fetchSuccess:{},fetchFail:{},span:{default:24},footer:{type:Boolean,default:!0},submitText:{},resetText:{},extraParams:{},moreBtns:{},loading:{type:Boolean},isOmit:{type:Boolean,default:!0},log:{type:Boolean,default:!T},debug:{type:Boolean},isCache:{type:Boolean},autoFixedFoot:{type:Boolean,default:!0},noSubmitProps:{},handleRequest:{}},emits:["update:modelValue","submit","change","moreBtns"],setup(e,{expose:t,emit:T}){const F=e,R=T,V=s(null),_=s(),S=s([]),P=o({get:()=>F.modelValue,set(e){R("update:modelValue",e)}}),q=o((()=>y.merge({},P.value,F.extraParams)));function w(){F.fetch?V.value.submit():R("submit",q.value)}return a((()=>F.fields),(e=>{const{modelValue:t}=F,s=b(e,R,t),{data:o,fields:a}=s;S.value=a,y.merge(P.value,o)}),{immediate:!0,deep:!0}),t({formRef:_,formValidate:()=>V.value.formValidate()}),(e,t)=>{const s=n("BaseFormItem"),o=n("el-form");return r(),i(o,l({class:"base-form f-fs-s-c f-1",model:P.value},u(k),{onKeyup:p(w,["enter"]),ref_key:"formRef",ref:_}),{default:m((()=>[d("div",{class:x(["all-hide-scroll",[S.value.length?"f-fs-fs-w":"f-c-c",e.autoFixedFoot&&"auto-fixed-foot"]])},[S.value.length?(r(!0),f(h,{key:0},c(S.value,((o,a)=>{var l,p;return r(),i(s,{className:`f-span-${(null==(l=o.extra)?void 0:l.span)||e.span}`,field:o,pureText:(null==(p=o.extra)?void 0:p.pureText)||e.pureText,modelValue:P.value[o.prop],"onUpdate:modelValue":e=>P.value[o.prop]=e,onChange:t[0]||(t[0]=(e,t)=>R("change",e,t)),formRef:_.value,key:o.key??a},{custom:m((({field:t})=>[j(e.$slots,t.prop,{field:t,form:P.value},void 0,!0)])),_:2},1032,["className","field","pureText","modelValue","onUpdate:modelValue","formRef"])})),128)):(r(),f(h,{key:1},[g("空空如也~")],64))],2),!e.pureText&&e.footer?(r(),i(B,{key:0,loading:e.loading,moreBtns:e.moreBtns,submitText:e.submitText,resetText:e.resetText,formRef:_.value,isOmit:e.isOmit,log:e.log,debug:e.debug,params:q.value,fetch:e.fetch,fetchSuccess:e.fetchSuccess,fetchFail:e.fetchFail,noSubmitProps:e.noSubmitProps,handleRequest:e.handleRequest,disabled:!S.value.length,onMoreBtns:t[1]||(t[1]=(e,t,s)=>R("moreBtns",e,t,s)),onSubmit:t[2]||(t[2]=e=>R("submit",e)),ref_key:"footerBtnsRef",ref:V},null,8,["loading","moreBtns","submitText","resetText","formRef","isOmit","log","debug","params","fetch","fetchSuccess","fetchFail","noSubmitProps","handleRequest","disabled"])):v("",!0)])),_:3},16,["model"])}}}),[["__scopeId","data-v-275b46ec"]]);export{R as default};