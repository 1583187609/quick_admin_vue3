import{r as e,s as r,p as o,_ as a}from"./index-9d680563.js";import"./dayjs-21617033.js";import"./lodash-8dc1f9dc.js";import{u as s}from"./element-plus-ee430b3a.js";import{d as l,k as t,o as i,c as p,W as u,Q as m,u as n,a as d,V as j,K as c,ai as v}from"./@vue-2b5461a3.js";import"./qs-238f3f4b.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";const f={class:"f-fs-fs base-number-range"},g=a(l({name:"BaseNumberRange",__name:"BaseNumberRange",props:{modelValue:{},prop:{},label:{},rules:{},attrs:{},rangeSeparator:{default:e},size:{}},emits:["update:modelValue","change","clear"],setup(e,{emit:a}){s();const l=e,g=a,[h,b]=[`${l.prop}[0]`,`${l.prop}[1]`],V=t({get(){var e;return null==(e=l.modelValue)?void 0:e[0]},set(e){g("update:modelValue",[e,x.value])}}),x=t({get(){var e;return null==(e=l.modelValue)?void 0:e[1]},set(e){g("update:modelValue",[V.value,e])}});function _(e,o,a){void 0===V.value||""===V.value||void 0===x.value||""===x.value?a():V.value>x.value?(r(l.label+"最小值不能超过最大值","error"),a("最小值不能超过最大值")):a()}function y(e){var r;const{prop:a}=l,s=[V.value,x.value];g("change",(null==(r=null==a?void 0:a.join)?void 0:r.call(a,o))??a,s)}function z(e){var r;const{prop:a}=l,s="min"===e?[void 0,x.value]:[V.value,void 0],t=(null==(r=null==a?void 0:a.join)?void 0:r.call(a,o))??a;g("change",t,s),g("clear",t,s)}return(e,r)=>{const o=v("el-input"),a=v("el-form-item");return i(),p("div",f,[u(a,{class:"f-1 hide-err-text",prop:n(h),rules:[{validator:_,trigger:"blur"}]},{default:m((()=>[u(o,{modelValue:V.value,"onUpdate:modelValue":r[0]||(r[0]=e=>V.value=e),modelModifiers:{number:!0},onChange:r[1]||(r[1]=e=>y()),onClear:r[2]||(r[2]=e=>z("min")),placeholder:"最小值",clearable:""},null,8,["modelValue"])])),_:1},8,["prop","rules"]),d("div",{class:c(["f-c-c f-0 separator",e.size])},j(e.rangeSeparator),3),u(a,{class:"f-1 hide-err-text",prop:n(b),rules:[{validator:_,trigger:"blur"}]},{default:m((()=>[u(o,{modelValue:x.value,"onUpdate:modelValue":r[3]||(r[3]=e=>x.value=e),modelModifiers:{number:!0},onChange:r[4]||(r[4]=e=>y()),onClear:r[5]||(r[5]=e=>z("max")),placeholder:"最大值",clearable:""},null,8,["modelValue"])])),_:1},8,["prop","rules"])])}}}),[["__scopeId","data-v-788a3e20"]]);export{g as default};
