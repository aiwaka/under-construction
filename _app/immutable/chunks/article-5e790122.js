var a=Object.defineProperty;var u=(i,t,e)=>t in i?a(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t,e)=>(u(i,typeof t!="symbol"?t+"":t,e),e);const l=(i,t)=>{const e=i[t];return e?typeof e=="function"?e():Promise.resolve(e):new Promise((s,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+t)))})};class m{constructor(t,e,s,n,o){r(this,"id");r(this,"title");r(this,"thumbnail");r(this,"date");r(this,"tags");this.id=t,this.title=e,this.thumbnail=s,this.date=n,this.tags=o}}export{m as A,l as _};
