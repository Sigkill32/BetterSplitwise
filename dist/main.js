(()=>{"use strict";const e=document.getElementById("split"),t=document.getElementById("ballance"),n=document.getElementById("reset"),o=document.querySelector(".instruction-modal-close-button");e.addEventListener("click",(()=>{const e=document.querySelector(".people-container"),t=document.querySelector(".split-by-person"),n=document.getElementById("splitCount");if(t.innerHTML="",e.innerHTML="",n.value){const t=document.createDocumentFragment();for(let e=0;e<n.value;e++){const n=c(e);t.appendChild(n)}e.appendChild(t),document.querySelector(".split-action-buttons").classList.remove("hidden")}else alert("Head count can't be empty")}));const c=e=>{const t=document.createElement("div");return t.className="person-container",t.innerHTML=`<input type="text" placeholder="Name" id="name_${e}" class="global-input name">\n      <input type="number" placeholder="Contribution" id="contribution_${e}" class="global-input contribution">`,t};t.addEventListener("click",(()=>{const e=document.getElementById("splitCount"),t=[];for(let n=0;n<e.value;n++){const e=document.getElementById(`name_${n}`).value||`Person${n+1}`;let o=document.getElementById(`contribution_${n}`).value;o=""===o?0:o,t.push({name:e,spent:parseFloat(o)})}const n=(e=>{let t=0;const n=e.length,o=[],c=[],s=[];e.forEach((e=>{t+=e.spent}));const l=t/n;e.forEach((e=>{const t=e.spent-l,n={name:e.name,diff:t};t<0?c.push(n):o.push(n)})),o.sort(((e,t)=>t.diff-e.diff)),c.sort(((e,t)=>e.diff-t.diff));for(let e=0;e<c.length;e++)for(let t=0;t<o.length;t++)if(0!==c[e].diff&&0!==o[t].diff){let n={};const l=o[t].diff+c[e].diff;l<=0?(n={from:c[e].name,to:o[t].name,bal:o[t].diff},o[t].diff=0,c[e].diff=l):(n={from:c[e].name,to:o[t].name,bal:-1*c[e].diff},c[e].diff=0,o[t].diff=l),s.push(n)}return s})(t);document.querySelector(".split-ways-container").classList.remove("hidden"),(e=>{const t=document.querySelector(".split-by-person");if(t.innerHTML="",e.length>0){const n=document.createDocumentFragment();e.forEach((e=>{const t=`<span class="highlight">${e.from}</span> owes <span class="highlight">${e.to}</span> <span class="highlight">₹${Math.round(100*(e.bal+Number.EPSILON))/100}</span>`,o=document.createElement("p");o.innerHTML=t,o.className="balance-item",n.appendChild(o)})),t.appendChild(n)}else t.innerHTML='<span class="highlight">No one owes shit to anyone</span>'})(n)})),n.addEventListener("click",(()=>{const e=document.querySelector(".people-container"),t=document.querySelector(".split-by-person"),n=document.getElementById("splitCount");document.querySelector(".split-ways-container").classList.add("hidden"),document.querySelector(".split-action-buttons").classList.add("hidden"),t.innerHTML="",e.innerHTML="",n.value=""})),o.addEventListener("click",(()=>{document.querySelector(".app-usage-modal-container").classList.add("hidden")}))})();