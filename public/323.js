"use strict";(self.webpackChunklol=self.webpackChunklol||[]).push([[323],{323:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var a=n(9122),r=n(6029),s=n(1496),l=n(3744);const o={id:"le-2",initial:"idle",states:{idle:{entry:"sendPing",on:{ping:{target:"wait"}}},wait:{after:{500:{target:"#le-2.leader",actions:[],internal:!1}},on:{pong:{target:"follower"}}},follower:{after:{3e3:{target:"#le-2.leader",actions:[],internal:!1}},on:{pong:{target:"follower",internal:!1}}},leader:{entry:"sendPong",after:{2e3:{target:"#le-2.leader",actions:[],internal:!1}},on:{pong:[{target:"follower",cond:"idIsLess"},{target:"leader",cond:"idIsBigger",internal:!1}],ping:{target:"leader",internal:!1}}}},context:{id:s(10)},predictableActionArguments:!0,preserveActionOrder:!0},d=()=>{const e=l.dy`<div class="${"nfiZwqX2C5mjtDu_fqqd eajabJM4OxOw8zxFBCjm"} js-voter">
    <span class="js-state">initial</span><button><span>+</span></button>
  </div>`,t=e,n=e.querySelector(".js-state"),d=e.querySelector("button"),i=new BroadcastChannel("_l_o_l_"),c=new BroadcastChannel("_l_o_l_"),p=(0,a.C)(o,{actions:{sendPing:e=>{i.postMessage({type:"ping",sender:e.id})},sendPong:e=>{i.postMessage({type:"pong",sender:e.id})}},guards:{idIsLess:(e,t)=>t.sender>e.id,idIsBigger:(e,t)=>t.sender<e.id}}),g=(0,r.kJ)(p.withContext({id:s(10)})).onTransition((e=>{n.textContent=e.value,t.style.setProperty("--background-color",(()=>{switch(e.value){case"leader":return"hsl(0deg 16% 45%)";case"follower":return"hsl(120deg 16% 45%)";default:return"#e2e2e2"}})())}));return g.start(),c.addEventListener("message",(e=>{const{type:t,sender:n}=e.data;g.send({type:t,sender:n})})),d.addEventListener("click",(()=>{g.stop(),i.close(),c.close(),(0,l.ZF)(e)})),e},i=()=>{const e=l.dy`<div class="full-width ${"n_RYW5DQroPQGep1kttA FaPPIFWwliqVibACF5AR"}">
    <h2>Leader election algorithm</h2>
    <p>
      Each block is a client that can be leader or follower, the leader can be
      only one, and communication happens via BroadcastChannel.
    </p>

    <div class="${"IQM50cryaa49W5J_v37X jIj2mpCpdYKQ8GrECXaK"} js-voters"></div>
    <button>add</button>
  </div>`,t=e.querySelector(".js-voters");return e.querySelector("button").addEventListener("click",(()=>{t.append(d())})),t.append(d()),t.append(d()),t.append(d()),e}}}]);