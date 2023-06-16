"use strict";(self.webpackChunklol=self.webpackChunklol||[]).push([[188],{8600:t=>{const e=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],n=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],s=(t,e)=>{let n=t;return"string"==typeof e?n=t.toLocaleString(e):!0===e&&(n=t.toLocaleString()),n};t.exports=(t,i)=>{if(!Number.isFinite(t))throw new TypeError(`Expected a finite number, got ${typeof t}: ${t}`);const a=(i=Object.assign({bits:!1},i)).bits?n:e;if(i.signed&&0===t)return" 0 "+a[0];const o=t<0,l=o?"-":i.signed?"+":"";if(o&&(t=-t),t<1)return l+s(t,i.locale)+" "+a[0];const r=Math.min(Math.floor(Math.log10(t)/3),a.length-1);return t=Number((t/Math.pow(1e3,r)).toPrecision(3)),l+s(t,i.locale)+" "+a[r]}},934:(t,e,n)=>{n.d(e,{Z:()=>a});var s=n(8600),i=n(3744);const a=(t,e,n)=>{const a=i.dy`<div class="${"aFvVbmTwc8MutUGiYfRi JMg_7tyl7Hu4aGVdUymu"}">
    <div class="${"ZoagU4n7c4RoIEKjqhfp w1mX3gBk3E3M9zKw6pK9"}">
      <span>framework</span>
      <span>size</span>
    </div>

    <div class="${"USjnDJO892FCrgwYZWla l0Y9dVopTFVYPpRnm0Fl"}">
      <span class="${"PUOq6sVVEpvkBSRkBUHl VvdPyEKeHuEgQSvJJICQ"}">${n}</span>
      <span class="js-size"></span>
    </div>
  </div>`,o=a.querySelector(".js-size");return(t=>fetch(t).then((t=>t.blob())).then((t=>t.size)).then((t=>s(t))))(e).then((t=>{o.textContent=t})).catch((()=>{o.textContent="🤷🏻‍♂️"})),t().then((({default:t})=>{a.append(t())})),a}},1188:(t,e,n)=>{n.r(e),n.d(e,{default:()=>i});var s=n(934);const i=()=>(0,s.Z)((()=>Promise.all([n.e(234),n.e(186)]).then(n.bind(n,2186))),"bundled-svelte.js","svelte")}}]);