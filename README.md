# Vesfay - Tienda de Ropa Online

Vesfay es una tienda de ropa online moderna, responsiva e inclusiva, desarrollada con HTML, CSS (Bootstrap) y JavaScript. El sitio está optimizado para hombres, mujeres, niños y niñas, con catálogos dinámicos, navegación intuitiva y recursos locales.

## 🚀 ¿Cómo ejecutar el proyecto?

1. **Clona este repositorio:**
   ```sh
   git clone https://github.com/wilito48/tienda_vesfay_xd.git
   cd vesfay
   ```

2. **Abre el proyecto en tu navegador:**
   - Puedes abrir directamente `public/index.html` haciendo doble clic, o
   - Usa una extensión como Live Server en VS Code para mejor experiencia (recomendado para rutas locales).

3. **Navega por las páginas:**
   - `public/index.html` — Página principal
   - `public/tienda.html` — Catálogo dinámico
   - `public/ofertas.html` — Ofertas seleccionadas
   - `public/contacto.html`, `public/nosotros.html`, etc.
   - Panel admin: `admin/admin.html` (login simulado: usuario `admin`, contraseña `1234`)

## 📦 Estructura del proyecto

```
public/
  index.html, tienda.html, ...
  assets/
    bootstrap/ (Bootstrap local)
    images/ (imágenes de productos, categorías, etc.)
admin/
  admin.html, admin.js, admin.css
  assets/ (imágenes para el panel admin)
```

## 🛠️ Tecnologías y dependencias
- **Bootstrap 5** (local, en `public/assets/bootstrap/`)
- **JavaScript** puro para la lógica dinámica
- **Chart.js** (para gráficas en el admin)
- **Imágenes y recursos locales** (no requiere conexión externa)

## ⚡ Notas importantes
- **No requiere instalación de dependencias**: todo funciona solo con archivos estáticos.
- **Para rutas de imágenes**: asegúrate de mantener la estructura de carpetas.
- **Para el panel admin**: los productos son de ejemplo y se gestionan en memoria (no hay base de datos).
- **Recomendado**: usar Live Server o un servidor local para evitar problemas de rutas en navegadores.

## 👨‍💻 Autor y contacto
- Desarrollado por wilito48
  
## 👨‍💻 Probar en la web
https://tienda-vesfay-xd.vercel.app/
