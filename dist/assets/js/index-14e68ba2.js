import{v as e,E as t}from"./index-06b7404a.js";import{D as s,c as o}from"./auth-634f975a.js";import{_ as p}from"./AddEdit.vue_vue_type_script_setup_true_lang-6106aa99.js";import"./dayjs-21617033.js";import{d as r,D as i,e as a,ai as n,o as l,P as m,Q as c,c as d,F as u,U as j}from"./@vue-2b5461a3.js";import"./lodash-8dc1f9dc.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";import"./IconPicker-10e8f651.js";import"./MenuTree-8a325727.js";import"./system-ca7a6aa4.js";import"./xlsx-8a748b86.js";const b=r({name:"SystemMenu",__name:"index",setup(r){const b=i("openPopup"),{getOpts:h}=e(),f=h("EnableStatus"),y=h("YesNoStatus"),_=a([]),g=a([{prop:"name",label:"菜单名称"},{prop:"is_link",label:"是否外链",type:"select",options:y},{prop:"status",label:"状态",type:"select",options:f},{prop:"is_cache",label:"是否缓存",type:"select",options:y},{prop:"create_time_range",label:"创建时间",type:"date-picker"}]),v=a([{prop:"name",label:"名称",minWidth:220,align:"left"},{prop:"type_text",label:"类型",minWidth:60},{prop:"icon",label:"图标",width:60,type:"custom"},{prop:"order",label:"排序",width:60},{prop:"perms",label:"权限标识",width:180},{prop:"menu_path",label:"菜单路径",minWidth:300},{prop:"component_path",label:"组件路径",minWidth:300},{prop:"status",label:"状态",type:"BaseTag"},{prop:"remark",label:"备注"},{prop:"create_time",label:"创建时间"},{prop:"update_time",label:"创建时间"}]);function x(e,s,o){const{selectedKeys:p}=o;t({add:()=>B(null,s),delete:()=>w(p,s)},e)}function k(e,s,o){t({edit:()=>B(s,o),delete:()=>w([s.id],o),forbid:()=>{},enable:()=>{}},e)}function B(e,t){b((e?"编辑":"新增")+"菜单",{component:p,attrs:{data:e,menuTree:_.value,refreshList:t}})}function w(e,t){s({ids:e}).then((e=>{t()}))}function E(e){return o(e).then((e=>(_.value=e.records,e)))}return(e,t)=>{const s=n("BaseIcon"),o=n("BaseCrud");return l(),m(o,{cols:v.value,fields:g.value,fetch:E,extraBtns:["add","delete"],groupBtns:["edit","delete",e=>1===e.status?"forbid":"enable"],pagination:!1,onExtraBtn:x,onGroupBtn:k,selection:""},{icon:c((({row:e})=>[e.icon?(l(),m(s,{key:0,name:e.icon,size:"22"},null,8,["name"])):(l(),d(u,{key:1},[j("-")],64))])),_:1},8,["cols","fields","groupBtns"])}}});export{b as default};