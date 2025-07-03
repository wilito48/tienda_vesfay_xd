// Productos de ejemplo
const productos = [
  {
    id: 1,
    nombre: 'Camisa Casual Hombre',
    precio: 29.99,
    categoria: 'hombre',
    imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Camisa de algodón para hombre, ideal para uso diario.'
  },
  {
    id: 2,
    nombre: 'Vestido Verano Mujer',
    precio: 39.99,
    categoria: 'mujer',
    imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Vestido fresco y cómodo para mujer, perfecto para el verano.'
  },
  {
    id: 3,
    nombre: 'Chaqueta Niño',
    precio: 24.99,
    categoria: 'niños',
    imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Chaqueta abrigadora para niños, resistente y moderna.'
  },
  {
    id: 4,
    nombre: 'Pantalón Mujer',
    precio: 34.99,
    categoria: 'mujer',
    imagen: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Pantalón elegante y cómodo para mujer.'
  },
  {
    id: 5,
    nombre: 'Camiseta Niño',
    precio: 14.99,
    categoria: 'niños',
    imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Camiseta divertida y colorida para niños.'
  },
  {
    id: 6,
    nombre: 'Polo Hombre',
    precio: 27.99,
    categoria: 'hombre',
    imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    descripcion: 'Polo clásico para hombre, disponible en varios colores.'
  }
];

// Renderizar productos
function renderProductos(filtro = 'todos') {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';
  let filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);
  if (filtrados.length === 0) {
    contenedor.innerHTML = '<p class="text-center">No hay productos en esta categoría.</p>';
    return;
  }
  filtrados.forEach(producto => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card card-producto h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text fw-bold">$${producto.precio.toFixed(2)}</p>
          <button class="btn btn-outline-primary mt-auto ver-mas" data-id="${producto.id}">Ver más</button>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

// Filtros de categoría
const filtros = document.querySelectorAll('.filtro-categoria');
filtros.forEach(btn => {
  btn.addEventListener('click', function() {
    filtros.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderProductos(this.dataset.categoria);
  });
});

// Modal de detalles
const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
document.getElementById('productos-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('ver-mas')) {
    const id = +e.target.dataset.id;
    const prod = productos.find(p => p.id === id);
    if (prod) {
      document.getElementById('modalProductoLabel').textContent = prod.nombre;
      document.getElementById('modalProductoImg').src = prod.imagen;
      document.getElementById('modalProductoImg').alt = prod.nombre;
      document.getElementById('modalProductoDesc').textContent = prod.descripcion;
      document.getElementById('modalProductoPrecio').textContent = `$${prod.precio.toFixed(2)}`;
      modal.show();
    }
  }
});

// Formulario de contacto
const formContacto = document.getElementById('form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contacto-exito').classList.remove('d-none');
    formContacto.reset();
    setTimeout(() => {
      document.getElementById('contacto-exito').classList.add('d-none');
    }, 3000);
  });
}

// Inicializar catálogo al cargar
window.addEventListener('DOMContentLoaded', () => {
  renderProductos();
}); 