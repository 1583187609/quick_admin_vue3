import{v as e,P as t}from"./index-06b7404a.js";import{d as s,$ as r,k as o,ai as i,o as a,P as p,u as n,E as l}from"./@vue-2b5461a3.js";import"./dayjs-21617033.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./lodash-8dc1f9dc.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const m=s({name:"_componentsHandleUser",__name:"HandleUser",props:{type:{},data:{},refreshPage:{}},setup(s){const{getOpts:m}=e(),d=m("ViolationLevel",[0],!0),u=s,j=m("ReportHandle",[0,2],!0);let c=r(Object.assign({scene:"warning",timeDay:1,forbidLevel:1},u.data));const f=o((()=>{const{scene:e}=c,{type:t}=u;return[{prop:"userId",label:"用户ID",attrs:{disabled:"add"!==t}},..."unseal"===t?[]:[{prop:"scene",label:"处罚类型",type:"radio-group",required:!0,options:j,attrs:{}},"all-interaction"===e&&{prop:"timeDay",label:"时间",required:!0,type:"input-number",attrs:{min:1,style:{width:"180px"}},extra:{after:"天"}},"login"!==e&&{prop:"fromMsg",label:"回复用户",required:!0,attrs:{type:"textarea",maxlength:100,rows:3}},"login"===e&&{prop:"forbidLevel",label:"违规级别",type:"radio-group",required:!0,options:d,tips:"数值越小处罚程度越严重"}],{prop:"remark",label:"备注",required:!0,attrs:{type:"textarea",maxlength:100,rows:3}}]}));function g(e){const{type:s,data:r}=u;return e.relationDataList={userId:"add"===s?e.userId:r.userId},"unseal"===s?(e.status=1,e.id=r.id,t(e)):(delete e.userId,t(e))}function y(e,t){"scene"===e?c.fromMsg=h(t):"timeDay"===e&&"all-interaction"===c.scene&&nextTick((()=>{c.fromMsg=h("all-interaction")}))}function h(e){return{warning:"经用户举报，并经平台核实，您因违反平台行为规范，存在违规行为，现对您进行消息警告通知！请严格遵守《脱单计划行为规范》。",login:"","all-interaction":`经用户举报，并经平台核实，您因违反平台行为规范，存在违规行为，现被处罚禁止互动${c.timeDay}天！请严格遵守《脱单计划行为规范》，再次出现违规行为，将被永久封禁！`}[e]??""}return(e,t)=>{const s=i("BaseForm");return a(),p(s,{style:{width:"550px"},modelValue:n(c),"onUpdate:modelValue":t[0]||(t[0]=e=>l(c)?c.value=e:c=e),fields:f.value,fetch:g,fetchSuccess:e.refreshPage,extraParams:{relationTypeList:[0]},"no-submit-props":"unseal"===e.type?["forbidLevel","timeDay"]:[],onChange:y},null,8,["modelValue","fields","fetchSuccess","no-submit-props"])}}});export{m as default};