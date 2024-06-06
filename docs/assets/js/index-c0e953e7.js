import{a as s}from"./vue-router-7f68ddec.js";import{_ as t}from"./AgeRatioChart.vue_vue_type_script_setup_true_lang-7ab7f15c.js";import e from"./AnnualUseChart-bf417756.js";import{_ as a}from"./ChinaMapChart.vue_vue_type_script_setup_true_lang-04c207b3.js";import r from"./HotPlateChart-82ee2a8f.js";import i from"./GenderRatioChart-8cfac66f.js";import o from"./OverNextMonthChart-96c4e929.js";import{_ as c}from"./PlatformSourceChart.vue_vue_type_script_setup_true_lang-fbfa2aa1.js";import l from"./RealTimeAccessChart-5e53756b.js";import{B as n,_ as p}from"./index-9d680563.js";import{d as m}from"./dayjs-21617033.js";import"./lodash-8dc1f9dc.js";import{d,e as f,j as v,B as j,o as h,c as u,a as g,u as b,V as A,W as _,bm as x,bk as y}from"./@vue-2b5461a3.js";import"./index.vue_vue_type_script_setup_true_name_ECharts_lang-22e70f3c.js";import"./echarts-911d2a7f.js";import"./zrender-3442365c.js";import"./tslib-a4e99503.js";import"./echarts-liquidfill-59a83793.js";import"./@vueuse-2ec33eb0.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const C="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAHCAYAAACx3+twAAAAAXNSR0IArs4c6QAAAZ9JREFUSEvNlb9LHFEQxz/fE4MXsJEUVhaCndcKqSxVUspZHeS0zIGChYIEXcXGxuLQgzSiohD8Ucr5BwRBWxvRzkJSCXqFsuqOuIrE7O5bDQfxtW/m+2bmzWdGVqWIUUFkSTrGKRny6uXgbxPboIFrZhHjgBwaBxh5feX0Txubp4VG1hB9ib6PF8v4fNMoV5EYZshhrAM5x/s+YoxJyhKWZBcmYDvkEOsoRTDDGD3xgrZGH0GYWIsjqHMyFFSg+qIohlhgAjENNDj8Dwno1wgnkaLMk+Uy/NhiSmGrGAV5nMfZPf+o7ZHlggqkCBrVMKneqKCt0IZYRXQ7gjKMOZqY0gD+i8JU6CbgJ9Dq8K8hhlViOc7GPIoozMPd8ZCXF+34SIv/d4QWaSVgqQ4IbQMdb0UolvknhLZRiuB7RmiOZq4ovxWhxCFov2imRrkOCG0iul6B0HcNcPePCA2pxFY9EEreCk/qtksXxkfnoAo40xeOYwPa4APXfEaODfTgeMuRBvkdGZY/+IRPZ8qghBv24zZQuDQ82oG2FA1fHnv3y0m/CFsHcS4AAAAASUVORK5CYII=",w=s=>(x("data-v-3779d33c"),s=s(),y(),s),Y={class:"container"},E={class:"header f-c-s f-0"},I={class:"side left"},k=w((()=>g("div",{class:"center f-1"},[g("div",{class:"title"},[g("span",null,"智慧旅游可视化大数据展示平台"),g("div",{class:"warning"},"平台高峰预警信息（2条）")])],-1))),R={class:"side right"},q=w((()=>g("span",{class:"strong report"},"统计报告",-1))),D={class:"now-time"},G={class:"bodyer f-sb-s f-1"},M={class:"left f-sb-s-c"},H={class:"section top"},S=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"实时游客统计"),g("img",{class:"bg",src:C})],-1))),Z={class:"section center"},B=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"男女比例"),g("img",{class:"bg",src:C})],-1))),F={class:"section bottom"},z=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"年龄比例"),g("img",{class:"bg",src:C})],-1))),U={class:"middle f-sb-s-c f-1"},O={class:"map f-1"},P=w((()=>g("div",{class:"map-title f-fs-c"},"景区实时客流量",-1))),V={class:"section future"},Q=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"未来30天游客量趋势图"),g("img",{class:"bg",src:C})],-1))),X={class:"right f-sb-s-c"},K={class:"section top"},W=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"热门景区排行"),g("img",{class:"bg",src:C})],-1))),N={class:"section center"},J=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"年度游客量对比"),g("img",{class:"bg",src:C})],-1))),L={class:"section bottom"},T=w((()=>g("div",{class:"head f-c-fs-c"},[g("span",{class:"text"},"预约渠道数据统计"),g("img",{class:"bg",src:C})],-1))),$=p(d({name:"dataScreen",__name:"index",setup(p){const d=s(),x=f(null);v((()=>{x.value&&(x.value.style.transform=`scale(${C()}) translate(-50%, -50%)`,x.value.style.width="1920px",x.value.style.height="1080px"),window.addEventListener("resize",y)}));const y=()=>{x.value&&(x.value.style.transform=`scale(${C()}) translate(-50%, -50%)`)},C=(s=1920,t=1080)=>{let e=window.innerWidth/s,a=window.innerHeight/t;return e<a?e:a};let w=null,$=f(m().format("YYYY年MM月DD HH:mm:ss"));return w=setInterval((()=>{$.value=m().format("YYYY年MM月DD HH:mm:ss")}),1e3),j((()=>{window.removeEventListener("resize",y),clearInterval(w)})),(s,p)=>(h(),u("div",Y,[g("div",{class:"content f-fs-s-c",ref_key:"contentRef",ref:x},[g("div",E,[g("div",I,[g("span",{class:"strong home",onClick:p[0]||(p[0]=s=>b(d).push(b(n)))}," 首页 ")]),k,g("div",R,[q,g("span",D,"当前时间："+A(b($)),1)])]),g("div",G,[g("div",M,[g("div",H,[S,_(l,{class:"body"})]),g("div",Z,[B,_(i,{class:"body"})]),g("div",F,[z,_(t,{class:"body"})])]),g("div",U,[g("div",O,[P,_(a)]),g("div",V,[Q,_(o,{class:"body"})])]),g("div",X,[g("div",K,[W,_(r,{class:"body"})]),g("div",N,[J,_(e,{class:"body"})]),g("div",L,[T,_(c,{class:"body"})])])])],512)]))}}),[["__scopeId","data-v-3779d33c"]]);export{$ as default};
