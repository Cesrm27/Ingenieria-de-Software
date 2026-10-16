// Prototipo completamente local y efímero: se reinicia al recargar.
const productos=[
{id:1,nombre:'Alcohol en gel (demo)',precio:12.5,stock:20,min:5,reservado:0},
{id:2,nombre:'Algodón (demo)',precio:7.9,stock:9,min:5,reservado:0},
{id:3,nombre:'Mascarillas (demo)',precio:1.5,stock:4,min:5,reservado:0},
{id:4,nombre:'Jabón líquido (demo)',precio:10.0,stock:14,min:5,reservado:0}
];
let ventas=[],pedidos=[],secuencia=1;
const $=id=>document.getElementById(id),moneda=n=>'S/ '+n.toFixed(2),disponible=p=>p.stock-p.reservado;
function render(){
const opciones=productos.map(p=>`<option value="${p.id}">${p.nombre} · ${moneda(p.precio)} · disp. ${disponible(p)}</option>`).join('');
$('producto').innerHTML=opciones;$('productoPedido').innerHTML=opciones;
$('metrics').innerHTML=`<div class="metric"><small>Ventas registradas</small><strong>${ventas.length}</strong></div><div class="metric"><small>Pedidos activos</small><strong>${pedidos.filter(p=>!['entregado','cancelado'].includes(p.estado)).length}</strong></div><div class="metric"><small>Productos bajo mínimo</small><strong>${productos.filter(p=>disponible(p)<p.min).length}</strong></div>`;
$('tablaInventario').innerHTML=`<div class="scroll"><table><thead><tr><th>Producto</th><th>Stock</th><th>Reservado</th><th>Disponible</th><th>Estado</th><th>Simular entrada</th></tr></thead><tbody>${productos.map(p=>`<tr><td>${p.nombre}</td><td>${p.stock}</td><td>${p.reservado}</td><td>${disponible(p)}</td><td><span class="pill ${disponible(p)<p.min?'warn':''}">${disponible(p)<p.min?'Bajo mínimo':'Normal'}</span></td><td><button data-entrada="${p.id}">+5</button></td></tr>`).join('')}</tbody></table></div>`;
$('historialVentas').innerHTML=ventas.length?ventas.slice().reverse().map(v=>`<div class="item">Venta #${v.id}: ${v.cantidad} × ${v.nombre} <strong>${moneda(v.total)}</strong></div>`).join(''):'<p>Aún no hay ventas.</p>';
$('listaPedidos').innerHTML=pedidos.length?pedidos.slice().reverse().map(p=>`<div class="item"><div><strong>${p.codigo}</strong> · ${p.nombre} × ${p.cantidad}<br><span class="pill">${p.estado}</span></div><div>${p.estado==='solicitado'?`<button data-pedido="${p.id}" data-estado="preparado">Marcar preparado</button>`:''}${p.estado==='preparado'?`<button data-pedido="${p.id}" data-estado="entregado">Entregar</button>`:''}${['solicitado','preparado'].includes(p.estado)?`<button data-pedido="${p.id}" data-estado="cancelado">Cancelar</button>`:''}</div></div>`).join(''):'<p>Aún no hay pedidos.</p>';
}
function validar(id,valor){let p=productos.find(p=>p.id===Number(id)),n=Number(valor);if(!p||!Number.isInteger(n)||n<=0)return {error:'Selecciona un producto y una cantidad entera positiva.'};if(n>disponible(p))return {error:'No hay stock disponible suficiente.'};return {p,n};}
$('vender').onclick=()=>{const r=validar($('producto').value,$('cantidad').value);if(r.error){$('mensajeVenta').textContent=r.error;return;}r.p.stock-=r.n;const v={id:ventas.length+1,nombre:r.p.nombre,cantidad:r.n,total:r.n*r.p.precio};ventas.push(v);render();$('mensajeVenta').textContent='Venta simulada registrada: '+moneda(v.total);};
$('crearPedido').onclick=()=>{const r=validar($('productoPedido').value,$('cantidadPedido').value);if(r.error){$('mensajePedido').textContent=r.error;return;}r.p.reservado+=r.n;const p={id:secuencia,codigo:'DEMO-'+String(secuencia++).padStart(4,'0'),productoId:r.p.id,nombre:r.p.nombre,cantidad:r.n,estado:'solicitado'};pedidos.push(p);render();$('mensajePedido').textContent='Pedido simulado creado: '+p.codigo;};
$('tablaInventario').onclick=e=>{let el=e.target.closest('[data-entrada]');if(!el)return;productos.find(p=>p.id===Number(el.dataset.entrada)).stock+=5;render();};
$('listaPedidos').onclick=e=>{let el=e.target.closest('[data-pedido]');if(!el)return;const pedido=pedidos.find(p=>p.id===Number(el.dataset.pedido));if(!pedido)return;const next=el.dataset.estado,permitidos={solicitado:['preparado','cancelado'],preparado:['entregado','cancelado']};if(!(permitidos[pedido.estado]||[]).includes(next))return;const prod=productos.find(p=>p.id===pedido.productoId);if(next==='cancelado')prod.reservado-=pedido.cantidad;if(next==='entregado'){prod.reservado-=pedido.cantidad;prod.stock-=pedido.cantidad;}pedido.estado=next;render();};
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('hidden',x.id!==b.dataset.tab));});
render();
