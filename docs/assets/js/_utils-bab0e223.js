import{t as a}from"./index-9d680563.js";import"./dayjs-21617033.js";function t(a){const{id:t,age:e,gender:r,nickname:n,avatar:s}=a.userData,{cnt:d,noPassCnt:c}=a.avatarUploadData;return{userId:t,age:e,reason:a.reason,gender:r,nickname:n,uploadNum:d,rejectNum:c,createdAt:a.createdAt,updatedAt:a.updatedAt,src:s,avatarData:a.avatarData}}function e(t){const e=a(t);return["String","Number"].includes(e)?{text:t}:"Object"===e?t:{}}export{t as a,e as g};
