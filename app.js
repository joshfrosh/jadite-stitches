const $ = s => document.querySelector(s);
const visitorId = localStorage.visitorId || (localStorage.visitorId = crypto.randomUUID());
let products = [];

function money(n){return new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN'}).format(Number(n||0))}
function media(p){
  if(!p.mediaUrl) return '<div class="media">🪡</div>';
  if(p.media_type === 'video') return `<div class="media"><video controls preload="metadata" src="${p.mediaUrl}"></video></div>`;
  return `<div class="media"><img loading="lazy" src="${p.mediaUrl}" alt="${p.name}" onerror="this.parentElement.innerHTML='🪡'"></div>`;
}
function card(p){return `<article class="card">${media(p)}<div class="cardBody"><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="actions"><button class="like" onclick="likeProduct(${p.id},this)">♡ Like</button><button onclick="addCart(${p.id})">Add 🛒</button></div></div></article>`}
async function loadProducts(){
  try{products=await fetch('/api/products').then(r=>r.json());$('#products').innerHTML=products.length?products.map(card).join(''):'<p class="empty">No products yet. Your catalog is ready for the first upload.</p>'}
  catch{$('#products').innerHTML='<p class="empty">Could not load products.</p>'}
}
window.likeProduct=async(id,btn)=>{const r=await fetch('/api/like',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({productId:id,visitorId})}).then(r=>r.json());btn.textContent=`♥ ${r.likes||1}`}
window.addCart=async(id)=>{await fetch('/api/cart',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({productId:id,visitorId})});alert('Added to cart');loadCart()}
async function loadCart(){const rows=await fetch(`/api/cart?visitorId=${encodeURIComponent(visitorId)}`).then(r=>r.json());$('#cartItems').innerHTML=rows.length?rows.map(x=>card({id:x.product_id,name:x.name,price:x.price,media_key:x.media_key,media_type:x.media_type,mediaUrl:x.mediaUrl})).join(''):'<p class="empty">Your cart is empty.</p>'}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.querySelectorAll('nav button').forEach(x=>x.classList.remove('on'));$('#'+b.dataset.page).classList.add('active');b.classList.add('on');if(b.dataset.page==='cart')loadCart()})
$('#searchBox').oninput=e=>{const q=e.target.value.toLowerCase();$('#searchResults').innerHTML=products.filter(p=>(p.name+' '+p.description).toLowerCase().includes(q)).map(card).join('')}
$('#mode').onclick=()=>document.body.classList.toggle('light')
$('#refresh').onclick=loadProducts
$('#userId').textContent=visitorId.slice(0,12)
$('#profileName').value=localStorage.profileName||''
$('#saveProfile').onclick=()=>{localStorage.profileName=$('#profileName').value.trim();alert('Profile saved')}
$('#adminCheck').onclick=async()=>{const r=await fetch('/api/admin/check').then(r=>r.json());$('#adminStatus').textContent=r.admin?'Admin access confirmed.':'Admin access is not active in this browser yet.'}
loadProducts()
