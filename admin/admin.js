// --- Login Simulado ---
const loginPanel = document.getElementById('login-admin');
const adminPanel = document.getElementById('admin-panel');
const formLogin = document.getElementById('form-login');
const loginError = document.getElementById('login-error');

const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    loginPanel.classList.add('d-none');
    adminPanel.classList.remove('d-none');
    cargarDashboard();
  } else {
    loginError.classList.remove('d-none');
    setTimeout(() => loginError.classList.add('d-none'), 2000);
  }
});

// --- Navegación Sidebar ---
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = {
  dashboard: document.getElementById('section-dashboard'),
  productos: document.getElementById('section-productos'),
  categorias: document.getElementById('section-categorias'),
  nuevoProducto: document.getElementById('section-nuevo-producto')
};
sidebarLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    sidebarLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    mostrarSeccion(this.dataset.section);
  });
});
function mostrarSeccion(seccion) {
  Object.values(sections).forEach(sec => sec.classList.add('d-none'));
  if (seccion === 'dashboard') sections.dashboard.classList.remove('d-none');
  if (seccion === 'productos') sections.productos.classList.remove('d-none');
  if (seccion === 'categorias') sections.categorias.classList.remove('d-none');
}

// --- Cerrar sesión ---
document.getElementById('cerrar-sesion').addEventListener('click', function(e) {
  e.preventDefault();
  adminPanel.classList.add('d-none');
  loginPanel.classList.remove('d-none');
  formLogin.reset();
});

// --- Productos (CRUD en memoria) ---
let productos = [
  {id: 1, nombre: 'Camisa Casual Hombre', precio: 49.99, categoria: 'hombre', subcategoria: 'casual', imagen: 'assets/prod12.jpg'},
  {id: 2, nombre: 'Polo Casual Hombre', precio: 54.99, categoria: 'hombre', subcategoria: 'casual', imagen: 'assets/prod4.jpg'},
  {id: 3, nombre: 'Vestido Elegante Mujer', precio: 89.99, categoria: 'mujer', subcategoria: 'elegante', imagen: 'assets/prod11.jpg'},
  {id: 4, nombre: 'Blusa Elegante Mujer', precio: 69.99, categoria: 'mujer', subcategoria: 'elegante', imagen: 'assets/prod6.jpg'},
  {id: 5, nombre: 'Camisa Casual Niño', precio: 39.99, categoria: 'niños', subcategoria: 'casual', imagen: 'assets/prod7.jpg'},
  {id: 6, nombre: 'Polo Casual Niño', precio: 44.99, categoria: 'niños', subcategoria: 'casual', imagen: 'assets/prod3.jpg'}
];

function cargarDashboard() {
  document.getElementById('resumen-productos').textContent = productos.length;
  document.getElementById('resumen-categorias').textContent = 3;
  renderEstadisticas();
  renderTablaProductos();
  renderDashboardEjemploProductos();
}

// Tabla de productos
function renderTablaProductos() {
  const tbody = document.getElementById('tabla-productos');
  tbody.innerHTML = '';
  productos.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.imagen}" alt="${p.nombre}" style="width:60px;height:60px;object-fit:cover;"></td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>${p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}</td>
      <td>${p.subcategoria ? (p.subcategoria.charAt(0).toUpperCase() + p.subcategoria.slice(1)) : ''}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1 editar-producto" data-idx="${idx}"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-danger eliminar-producto" data-idx="${idx}"><i class="bi bi-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Eliminar producto
const tablaProductos = document.getElementById('tabla-productos');
tablaProductos.addEventListener('click', function(e) {
  if (e.target.closest('.eliminar-producto')) {
    const idx = +e.target.closest('.eliminar-producto').dataset.idx;
    if (confirm('¿Eliminar este producto?')) {
      productos.splice(idx, 1);
      cargarDashboard();
    }
  }
});

// Nuevo producto
const btnNuevoProducto = document.getElementById('btn-nuevo-producto');
const sectionNuevoProducto = document.getElementById('section-nuevo-producto');
const sectionProductos = document.getElementById('section-productos');
const formNuevoProducto = document.getElementById('form-nuevo-producto');
const cancelarNuevo = document.getElementById('cancelar-nuevo');

btnNuevoProducto.addEventListener('click', () => {
  sectionProductos.classList.add('d-none');
  sectionNuevoProducto.classList.remove('d-none');
});
cancelarNuevo.addEventListener('click', () => {
  sectionNuevoProducto.classList.add('d-none');
  sectionProductos.classList.remove('d-none');
  formNuevoProducto.reset();
});
formNuevoProducto.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nuevo-nombre').value;
  const precio = parseFloat(document.getElementById('nuevo-precio').value);
  const imagen = document.getElementById('nuevo-imagen').value;
  const categoria = document.getElementById('nuevo-categoria').value;
  const subcategoria = document.getElementById('nuevo-subcategoria').value;
  productos.push({
    id: Date.now(),
    nombre,
    precio,
    imagen,
    categoria,
    subcategoria
  });
  formNuevoProducto.reset();
  sectionNuevoProducto.classList.add('d-none');
  sectionProductos.classList.remove('d-none');
  cargarDashboard();
});

// Estadísticas con Chart.js
let chart;
function renderEstadisticas() {
  const ctx = document.getElementById('chart-estadisticas').getContext('2d');
  const data = [
    productos.filter(p => p.categoria === 'hombre').length,
    productos.filter(p => p.categoria === 'mujer').length,
    productos.filter(p => p.categoria === 'niños').length
  ];
  const subData = [
    productos.filter(p => p.subcategoria === 'deportivo').length,
    productos.filter(p => p.subcategoria === 'casual').length,
    productos.filter(p => p.subcategoria === 'elegante').length
  ];
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Hombre', 'Mujer', 'Niños', 'Deportivo', 'Casual', 'Elegante'],
      datasets: [{
        label: 'Cantidad de productos',
        data: [...data, ...subData],
        backgroundColor: ['#0d6efd', '#d63384', '#ffc107', '#198754', '#fd7e14', '#6f42c1']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderDashboardEjemploProductos() {
  const cont = document.getElementById('dashboard-ejemplo-productos');
  if (!cont) return;
  cont.innerHTML = '';
  productos.slice(0, 6).forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex';
    col.innerHTML = `
      <div class='card h-100 flex-fill text-center'>
        <img src='${p.imagen}' alt='${p.nombre}' class='card-img-top img-fluid' style='height:180px;object-fit:cover;'>
        <div class='card-body d-flex flex-column'>
          <h6 class='card-title mb-1'>${p.nombre}</h6>
          <div class='mb-1'><span class='badge bg-secondary'>${p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}</span> <span class='badge bg-info text-dark'>${p.subcategoria ? (p.subcategoria.charAt(0).toUpperCase() + p.subcategoria.slice(1)) : ''}</span></div>
          <div class='fw-bold mb-2'>$${p.precio.toFixed(2)}</div>
        </div>
      </div>
    `;
    cont.appendChild(col);
  });
}

// Inicializar en Dashboard
mostrarSeccion('dashboard'); 