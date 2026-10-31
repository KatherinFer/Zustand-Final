# Tienda SENA

Aplicación de práctica de la guía **Zustand en React con Vite**. Simula el catálogo de un
almacén: productos traídos de una API, carrito con totales y persistencia, favoritos, tema
claro/oscuro y filtros por texto y categoría.

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

> El catálogo usa `https://fakestoreapi.com`, así que necesita internet.
> Si tienes otro backend, crea un archivo `.env` con `VITE_API_URL=http://localhost:3000/api`
> y ajusta la ruta en `src/store/useProductoStore.js`.

## Estructura

```
src/
├── componentes/
│   ├── BarraNavegacion.jsx   marca, menú, tema y botón del recibo
│   ├── BuscadorProductos.jsx input de texto y selector de categoría
│   ├── ListaProductos.jsx    rejilla filtrada
│   ├── TarjetaProducto.jsx   producto + corazón + agregar
│   ├── PanelCarrito.jsx      tirilla del recibo con cantidades y total
│   └── BotonCantidad.jsx     botón + / − reutilizable
├── paginas/
│   ├── Catalogo.jsx
│   └── Favoritos.jsx
├── store/
│   ├── useProductoStore.js
│   ├── useCarritoStore.js
│   ├── useFavoritosStore.js
│   └── useTemaStore.js
├── utilidades/               formato de precio, nombres de categorías y filtro
├── App.jsx                   rutas, tema en el <body> y panel del carrito
└── main.jsx
```

## Manejo de estado

| Store | Propósito | Estado | Acciones | Quién lo usa |
|---|---|---|---|---|
| `useProductoStore` | Catálogo y filtros | `products`, `loading`, `error`, `search`, `category` | `fetchProducts` (async), `setSearch`, `setCategory` | `Catalogo`, `BuscadorProductos`, `ListaProductos` |
| `useCarritoStore` | Carrito con totales y persistencia | `items` (persistido) | `addItem`, `removeItem`, `updateQty`, `clearCart`, `totalItems`, `totalPrice` | `BarraNavegacion`, `TarjetaProducto`, `PanelCarrito` |
| `useFavoritosStore` | Productos guardados | `favorites` (persistido) | `toggleFavorite`, `isFavorite` | `TarjetaProducto`, `Favoritos` |
| `useTemaStore` | Preferencia de tema | `theme` (persistido) | `toggleTheme` | `BarraNavegacion`, `App` |

Decisiones que vale la pena revisar en el código:

- **Selectores**: cada componente pide solo lo que necesita, por ejemplo
  `useCarritoStore((s) => s.items)`. Nunca se usa `useCarritoStore()` completo.
- **Inmutabilidad**: no hay `push`; se devuelven arreglos nuevos con spread, `map` y `filter`.
- **`get()`**: se usa en `totalPrice` y en `isFavorite` para leer el estado actual dentro de
  una acción.
- **`persist` + `partialize`**: el carrito guarda solo `items`, así no se escriben funciones
  en `localStorage`. El tema y los favoritos también sobreviven a la recarga.
- **Estado local**: `carritoAbierto` se queda en `useState` porque solo le importa a `App`.

### Cómo comprobarlo

1. Agrega productos y recarga la página: el recibo sigue igual.
2. Abre DevTools (F12) → **Application** → **Local Storage** y busca `tienda-sena-carrito`,
   `tienda-sena-favoritos` y `tienda-sena-tema`.
3. Cambia el tema y recarga: se mantiene.
4. Instala la extensión **Redux DevTools** y abre el panel: el store `CarritoStore` muestra
   cada acción (`carrito/agregar`, `carrito/eliminar`, `carrito/cantidad`, `carrito/vaciar`).
   Toma ahí la captura del ejercicio 6.

## Ejercicios cubiertos

| # | Ejercicio | Dónde |
|---|---|---|
| 1 | Catálogo desde API, carrito con total y persistencia | `useProductoStore`, `useCarritoStore` |
| 2 | `CartPanel` con + / −, eliminar y vaciar | `PanelCarrito`, `BotonCantidad` |
| 3 | Favoritos con corazón y página `/favoritos` | `useFavoritosStore`, `TarjetaProducto`, `Favoritos` |
| 4 | Tema persistido aplicado al `<body>` | `useTemaStore`, `App` |
| 5 | Filtro por texto y categoría en componentes separados | `BuscadorProductos` + `ListaProductos` |
| 6 | Captura de Redux DevTools | manual, con `devtools` ya activo |
