const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const getOrders=()=>JSON.parse(localStorage.getItem("ff_orders")||"[]");
const saveOrders=o=>localStorage.setItem("ff_orders",JSON.stringify(o));
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function showPage(id){
  $$(".page").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");
  $$(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===id));
  $("#sidebar").classList.remove("open"); render();
}
$("#hamb").onclick=()=>$("#sidebar").classList.toggle("open");
$$(".nav").forEach(b=>b.onclick=()=>showPage(b.dataset.page));
$$("[data-go]").forEach(b=>b.onclick=()=>showPage(b.dataset.go));
$("#package").onchange=e=>$("#amount").textContent="₹"+e.target.value;

function render(){
 const o=getOrders(), done=o.filter(x=>x.status==="Completed").length, rev=o.reduce((a,x)=>a+Number(x.amount),0);
 $("#coins").textContent=0;$("#statOrders").textContent=o.length;$("#statDone").textContent=done;$("#statBalance").textContent=rev;
 $("#aOrders").textContent=o.length;$("#aPending").textContent=o.filter(x=>x.status==="Pending").length;$("#aCompleted").textContent=done;$("#aRevenue").textContent="₹"+rev;
 $("#orderList").innerHTML=o.length?o.slice().reverse().map(x=>`<div class="order"><div><b>${x.package}</b><br><small>UID: ${x.uid} • ${x.time}</small></div><div><b>₹${x.amount}</b><br><span class="status">${x.status}</span></div></div>`).join(""):'<div class="card"><h2>No orders yet</h2><p class="tiny">Your demo orders will appear here.</p></div>';
 $("#adminOrders").innerHTML=o.length?o.slice().reverse().slice(0,8).map(x=>`<div class="admin-row"><span>${x.uid} — ${x.package}</span><b>${x.status}</b></div>`).join(""):"<p class='tiny'>No requests.</p>";
}
$("#pay").onclick=()=>{
 const uid=$("#uid").value.trim(), opt=$("#package").selectedOptions[0];
 if(!/^\d{5,20}$/.test(uid)){toast("Enter a valid 5–20 digit UID");return}
 $("#mUid").textContent=uid;$("#mPkg").textContent=opt.textContent.split("—")[0].trim();$("#mAmt").textContent="₹"+opt.value;$("#realqr").src="assets/upi_"+opt.value+".png";
 $("#modal").classList.remove("hidden");
};
function close(){ $("#modal").classList.add("hidden") } $("#close").onclick=close;
$("#modal").onclick=e=>{if(e.target===$("#modal"))close()};
$("#confirm").onclick=()=>{
 const opt=$("#package").selectedOptions[0], o=getOrders();
 o.push({uid:$("#uid").value.trim(),package:opt.textContent.split("—")[0].trim(),amount:opt.value,status:"Pending",time:new Date().toLocaleString()});
 saveOrders(o);close();render();showPage("orders");toast("Demo order created");
};
$("#saveProfile").onclick=()=>{localStorage.setItem("ff_name",$("#displayName").value||"Player");toast("Profile saved")};
$("#displayName").value=localStorage.getItem("ff_name")||"";
render();
