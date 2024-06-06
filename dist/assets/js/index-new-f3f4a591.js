import{H as s,Z as e,_ as o}from"./index-06b7404a.js";import t from"./CaptchaBtn-51b5e0b6.js";import{_ as r}from"./BaseIcon.vue_vue_type_script_lang-4da094ff.js";import{a,u as i}from"./vue-router-7f68ddec.js";import{E as l}from"./element-plus-ee430b3a.js";import{d as n,e as p,$ as m,k as c,ai as u,o as d,c as j,a as v,V as g,u as f,P as b,E as h,F as x}from"./@vue-2b5461a3.js";import"./dayjs-21617033.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./lodash-8dc1f9dc.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";const w={class:"page f-c-c"},k={class:"h1"},y={class:"box f-fs-c"},_={class:"wrap f-c-c-c"},z={class:"h2 f-0"},T=o(n({name:"LoginIndexNew",__name:"index-new",setup(o){var n;const T={login:{title:"登录",api:e,submitText:"登录"},register:{title:"注册",api:e,submitText:"注册"},forget:{title:"忘记密码",api:e}},q=p("login");a();const L=i(),C=s(),E=p(!1),I={}.VITE_APP_TITLE;p((null==(n=L.query.redirect)?void 0:n.toString())??"/");const{login_account:F}=localStorage;let V=m({account:F||"",password:"",remember:!!F});const B=c((()=>[{prop:"account",label:"账号",required:!0,attrs:{showWordLimit:!1,slots:{prefix:{component:r,attrs:{name:"User",size:"24"}}}}},"login"!==q.value&&{prop:"yzm",label:"验证码",required:!0,class:"captcha-box",attrs:{maxlength:4,showWordLimit:!1,slots:{prefix:{component:r,attrs:{name:"Clock",size:"24"}},append:{component:t}}}},{prop:"password",label:"密码",valid:"password",required:!0,attrs:{slots:{prefix:{component:r,attrs:{name:"Lock",size:"24"}}}}},"register"===q.value&&{prop:"confirmPsd",label:"确认密码",valid:"password",required:!0,rules:[{validator:P,trigger:"blur"}],attrs:{placeholder:"请再次输入密码",slots:{prefix:{component:r,attrs:{name:"Unlock",size:"24"}}}}},"login"===q.value&&{prop:"remember",label:"记住我",type:"checkbox",class:"rember",attrs:{size:"large"}}]));function P(s,e,o){e!==V.password?o(new Error("确认密码和密码需要保持一致")):o()}function S(s){const e={login:()=>function(s){E.value=!0,C.handleLoginIn(s).finally((()=>{E.value=!1}))}(s),register:()=>{l.warning("注册功能暂未开通，敬请期待！")},forget:()=>{l.warning("找回密码功能暂未开通，敬请期待！")}};e[q.value]?e[q.value]():l.warning(`点击了${q.value}按钮`)}return(s,e)=>{const o=u("BaseForm");return d(),j("div",w,[v("h1",k,g(f(I)),1),v("div",y,[v("div",_,[v("h2",z,g(T[q.value].title),1),(d(),b(o,{class:"form f-0",modelValue:f(V),"onUpdate:modelValue":e[0]||(e[0]=s=>h(V)?V.value=s:V=s),fields:B.value,submitText:T[q.value].submitText,loading:E.value,autoFixedFoot:!1,onSubmit:S,key:q.value},null,8,["modelValue","fields","submitText","loading"]))]),"login"===q.value?(d(),j(x,{key:0},[v("div",{onClick:e[1]||(e[1]=s=>q.value="register"),class:"btns f-c-c blue"},"去注册"),v("div",{onClick:e[2]||(e[2]=s=>q.value="forget"),class:"btns f-c-c"},"忘记密码")],64)):(d(),j("div",{key:1,onClick:e[3]||(e[3]=s=>q.value="login"),class:"btns f-c-c"},"去登录"))])])}}}),[["__scopeId","data-v-105d0898"]]);export{T as default};
