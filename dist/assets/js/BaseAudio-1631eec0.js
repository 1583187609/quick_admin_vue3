import{d as e,e as o,o as s,c as a,J as t,a as l,U as i,T as u,K as r,ai as n,W as p,V as m,P as d,Q as c}from"./@vue-2b5461a3.js";import{_ as v}from"./index-06b7404a.js";import"./dayjs-21617033.js";import"./call-bind-ada3a9fc.js";import"./get-intrinsic-176af07e.js";import"./es-errors-c8ed318b.js";import"./has-symbols-456daba2.js";import"./has-proto-c2a23985.js";import"./function-bind-afbcd6f2.js";import"./hasown-c3b72c9b.js";import"./set-function-length-968dc075.js";import"./define-data-property-9d7bf764.js";import"./es-define-property-c2edbfb6.js";import"./gopd-16a4ddf0.js";import"./has-property-descriptors-52e43c9d.js";import"./lodash-8dc1f9dc.js";import"./element-plus-ee430b3a.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-2ec33eb0.js";import"./@element-plus-c17b3efe.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./qs-238f3f4b.js";import"./side-channel-5a41c40a.js";import"./object-inspect-0d550a97.js";import"./axios-b9284f1b.js";import"./pinia-5cbb4d0f.js";import"./mock-04205f76.js";import"./mockjs-217213d3.js";import"./vue-router-7f68ddec.js";import"./nprogress-b5e58671.js";import"./vite-plugin-mock-6db8ade2.js";import"./path-to-regexp-83a43451.js";const j={class:"f-0 ml-h"},f=["muted"],g=["src"],h=["src"],y=v(e({name:"BaseAudio",__name:"BaseAudio",props:{src:{},showProgress:{type:Boolean,default:!0},default:{type:Boolean,default:!0}},setup(e,{expose:v}){const y=o(null),b=o(!1),T=o(0),$=o(!1),k=o("00:00/00:00"),w=o(!0);function x(e){const{currentTime:o,duration:s}=y.value;k.value=`${z(o)}/${z(s)}`,w.value=!s}function _(e){const{currentTime:o,duration:s}=y.value;k.value=`${z(o)}/${z(s)}`,T.value=o/s*100}function B(){b.value=!1,k.value=`00:00/${z(y.value.duration)}`}function C(e){const{duration:o}=y.value;y.value.currentTime=o*(e/100),A()}function M(e){const{duration:o}=y.value,s=o*(e/100);k.value=`${z(s)}/${z(o)}`,I()}function P(){b.value?I():A()}function V(){w.value||($.value=!$.value)}function z(e){e=Math.round(e);return[Math.floor(e/60),e%60].map((e=>(e<10?"0":"")+e)).join(":")}function A(){w.value||(b.value=!0,y.value.play())}function I(){w.value||(b.value=!1,y.value.pause())}return v({playing:b,progress:T,timeStr:k,muted:$,play:A,pause:I,audioCtx:y,toggleMuted:V,formatTime:z}),(e,o)=>{var v,q;const E=n("BaseIcon"),J=n("el-slider"),S=n("el-tooltip");return s(),a("div",{class:r(["base-audio f-sb-c",{default:!e.$slots.default}])},[t(e.$slots,"default",{playing:b.value,muted:$.value,currentTime:(null==(v=y.value)?void 0:v.currentTime)||0,duration:(null==(q=y.value)?void 0:q.duration)||0,timeStr:k.value,progress:T.value,play:A,pause:I,togglePlaying:P,toggleMuted:V,formatTime:z},(()=>[p(E,{onClick:P,size:"20",class:r(["f-0 btn",{disabled:w.value}]),name:b.value?"VideoPause":"VideoPlay"},null,8,["class","name"]),l("time",j,m(k.value),1),e.showProgress?(s(),d(J,{key:0,onChange:C,onInput:M,modelValue:T.value,"onUpdate:modelValue":o[0]||(o[0]=e=>T.value=e),"show-tooltip":!1,disabled:w.value,class:"f-1 ml-o"},null,8,["modelValue","disabled"])):u("",!0),p(S,{content:$.value?"取消静音":"静音","show-after":400,disabled:w.value},{default:c((()=>[p(E,{onClick:V,size:"20",class:r(["btn f-0 ml-h",{disabled:w.value}]),name:$.value?"Mute":"Microphone"},null,8,["class","name"])])),_:1},8,["content","disabled"])]),!0),e.src?(s(),a("audio",{key:0,onCanplay:x,onTimeupdate:_,onEnded:B,muted:$.value,controls:"",hidden:"",ref_key:"audioRef",ref:y},[l("source",{src:e.src,type:"audio/mpeg"},null,8,g),l("source",{src:e.src,type:"audio/ogg"},null,8,h),i(" 您的浏览器不支持音频播放 ")],40,f)):u("",!0)],2)}}}),[["__scopeId","data-v-1426e871"]]);export{y as default};
