(()=>{var e={304:e=>{e.exports=e=>{let t=0;const n=e.length,o=[],s=[],c=[];e.forEach((e=>{t+=e.spent}));const i=t/n;e.forEach((e=>{const t=e.spent-i,n={name:e.name,diff:t};t<0?s.push(n):o.push(n)})),o.sort(((e,t)=>t.diff-e.diff)),s.sort(((e,t)=>e.diff-t.diff));for(let e=0;e<s.length;e++)for(let t=0;t<o.length;t++)if(0!==s[e].diff&&0!==o[t].diff){let n={};const i=o[t].diff+s[e].diff;i<=0?(n={from:s[e].name,to:o[t].name,bal:o[t].diff},o[t].diff=0,s[e].diff=i):(n={from:s[e].name,to:o[t].name,bal:-1*s[e].diff},s[e].diff=0,o[t].diff=i),c.push(n)}return c}}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}(()=>{"use strict";const e=n(304),t=document.getElementById("split"),o=document.getElementById("ballance"),s=document.getElementById("reset"),c=document.querySelector(".instruction-modal-close-button");t.addEventListener("click",(()=>{const e=document.querySelector(".people-container"),t=document.querySelector(".split-by-person"),n=document.getElementById("splitCount");if(t.innerHTML="",e.innerHTML="",n.value){const t=document.createDocumentFragment();for(let e=0;e<n.value;e++){const n=i(e);t.appendChild(n)}e.appendChild(t),document.querySelector(".split-action-buttons").classList.remove("hidden")}else alert("Head count can't be empty")}));const i=e=>{const t=document.createElement("div");return t.className="person-container",t.innerHTML=`<input type="text" placeholder="Name" id="name_${e}" class="global-input name">\n      <input type="number" placeholder="Contribution" id="contribution_${e}" class="global-input contribution">`,t};o.addEventListener("click",(()=>{const t=document.getElementById("splitCount"),n=[];for(let e=0;e<t.value;e++){const t=document.getElementById(`name_${e}`).value||`Person${e+1}`;let o=document.getElementById(`contribution_${e}`).value;o=""===o?0:o,n.push({name:t,spent:parseFloat(o)})}const o=e(n);document.querySelector(".split-ways-container").classList.remove("hidden"),(e=>{const t=document.querySelector(".split-by-person");if(t.innerHTML="",e.length>0){const n=document.createDocumentFragment();e.forEach((e=>{const t=`<span class="highlight">${e.from}</span> owes <span class="highlight">${e.to}</span> &nbsp;<span>₹${Math.round(100*(e.bal+Number.EPSILON))/100}</span>`,o=document.createElement("p");o.innerHTML=t,o.className="balance-item",n.appendChild(o)})),t.appendChild(n)}else t.innerHTML='<span class="highlight">No one owes shit to anyone</span>'})(o)})),s.addEventListener("click",(()=>{const e=document.querySelector(".people-container"),t=document.querySelector(".split-by-person"),n=document.getElementById("splitCount");document.querySelector(".split-ways-container").classList.add("hidden"),document.querySelector(".split-action-buttons").classList.add("hidden"),t.innerHTML="",e.innerHTML="",n.value=""})),c.addEventListener("click",(()=>{document.querySelector(".app-usage-modal-container").classList.add("hidden")}))})()})();