import{h as t}from"./79ba4c64.js";const e=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],n=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],s=(t,e)=>{let n=t;return"string"==typeof e?n=t.toLocaleString(e):!0===e&&(n=t.toLocaleString()),n};const{fetch:i}=window,r=t=>{return Promise.all((r=t,[...new Set(r)]).map(t=>i(t).then(t=>t.blob()).then(t=>t.size))).then(t=>t.reduce((t,e)=>t+e,0)).then(t=>((t,i)=>{if(!Number.isFinite(t))throw new TypeError(`Expected a finite number, got ${typeof t}: ${t}`);const r=(i=Object.assign({bits:!1},i)).bits?n:e;if(i.signed&&0===t)return" 0 "+r[0];const a=t<0,o=a?"-":i.signed?"+":"";if(a&&(t=-t),t<1){return o+s(t,i.locale)+" "+r[0]}const c=Math.min(Math.floor(Math.log10(t)/3),r.length-1);return t=Number((t/Math.pow(1e3,c)).toPrecision(3)),o+s(t,i.locale)+" "+r[c]})(t));var r};var a=(e,n,s)=>{const i=t`<div class="${"s12hs4o2"}">
    <div class="${"ip7tz8s"}">
      <span>framework</span>
      <span>size</span>
    </div>

    <div class="${"tzmd6w1"}">
      <span class="${"n3g849b"}">${s}</span>
      <span class="js-size"></span>
    </div>
  </div>`,a=i.querySelector(".js-size"),o=i;return r(n).then(t=>{a.textContent=t}).catch(()=>{a.textContent="🤷🏻‍♂️"}),e().then(({default:t})=>{o.append(t())}),i};export{a as s};
