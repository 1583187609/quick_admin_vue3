import{v as t,E as e}from"./index-06b7404a.js";import{P as s,g as o}from"./auth-634f975a.js";import{_ as r}from"./AddEdit.vue_vue_type_script_setup_true_lang-047732cc.js";import"./dayjs-21617033.js";import{d as p,D as i,e as a,ai as l,o as m,P as n,u as d}from"./@vue-2b5461a3.js";import"./lodash-8dc1f9dc.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const j=p({name:"SystemRole",__name:"index",setup(p){const{getOpts:j}=t(),u=j("RoleType"),c=j("EnableStatus"),f=i("openPopup"),h=a([{prop:"role_type",label:"角色类型",type:"select",options:u},{prop:"status",label:"状态",type:"select",options:c},{prop:"create_time_range",label:"创建时间",type:"date-picker"}]),b=a([{prop:"role_text",label:"角色类型",width:120},{prop:"status",label:"状态",type:"BaseTag"},{prop:"remark",label:"备注",minWidth:250},{prop:"create_time",label:"创建时间",width:180,sortable:!0},{prop:"update_time",label:"修改时间",width:180,sortable:!0}]);function y(t,s,o){e({edit:()=>g(s,o),delete:()=>v([s.id],o)},t)}function _(t,s,o){const{selectedKeys:r}=o;e({add:()=>g(null,s),delete:()=>v(r,s)},t)}function g(t,e){f((t?"编辑":"新增")+"角色",{component:r,attrs:{id:null==t?void 0:t.id,refreshList:e}})}function v(t,e){o({ids:t}).then((t=>{e()}))}return(t,e)=>{const o=l("BaseCrud");return m(),n(o,{cols:b.value,fields:h.value,fetch:d(s),extraBtns:["add","delete"],groupBtns:["edit","delete"],onExtraBtn:_,onGroupBtn:y,selection:""},null,8,["cols","fields","fetch"])}}});export{j as default};
