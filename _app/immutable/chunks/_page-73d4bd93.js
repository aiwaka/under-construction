import{_ as a}from"./preload-helper-b21cceae.js";import{_ as i,A as m}from"./article-5e790122.js";const _=async()=>{const s=Object.assign({"./contents/first-message.md":()=>a(()=>import("./first-message-67b37232.js"),["./first-message-67b37232.js","./index-3e4b0432.js"],import.meta.url)}),e=[];for(const r in s){const o=r.split("/").reverse()[0].split(".")[0],t=(await i(Object.assign({"./contents/first-message.md":()=>a(()=>import("./first-message-67b37232.js"),["./first-message-67b37232.js","./index-3e4b0432.js"],import.meta.url)}),`./contents/${o}.md`)).metadata,n=new m(o,t.title,t.thumbnail,new Date(t.date),t.tags);e.push(n)}return{post:e}},p=Object.freeze(Object.defineProperty({__proto__:null,load:_},Symbol.toStringTag,{value:"Module"}));export{p as _,_ as l};
