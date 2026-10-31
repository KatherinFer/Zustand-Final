import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

// Carrito: el store con más lógica de negocio (cantidades, totales y persistencia).
export const useCarritoStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [], // [{ id, name, price, image, qty }]

        // Nunca modificamos el arreglo con push: devolvemos uno nuevo con spread o map.
        addItem: (producto) =>
          set(
            (estado) => {
              const existe = estado.items.find((i) => i.id === producto.id)
              if (existe) {
                return {
                  items: estado.items.map((i) =>
                    i.id === producto.id ? { ...i, qty: i.qty + 1 } : i
                  ),
                }
              }
              return { items: [...estado.items, { ...producto, qty: 1 }] }
            },
            false,
            'carrito/agregar'
          ),

        removeItem: (id) =>
          set(
            (estado) => ({ items: estado.items.filter((i) => i.id !== id) }),
            false,
            'carrito/eliminar'
          ),

        // Si la cantidad llega a 0, el producto sale del carrito.
        updateQty: (id, qty) =>
          set(
            (estado) => ({
              items: estado.items
                .map((i) => (i.id === id ? { ...i, qty } : i))
                .filter((i) => i.qty > 0),
            }),
            false,
            'carrito/cantidad'
          ),

        clearCart: () => set({ items: [] }, false, 'carrito/vaciar'),

        // get() lee el estado actual dentro de una acción: sirve para calcular totales.
        totalItems: () => get().items.reduce((acc, i) => acc + i.qty, 0),
        totalPrice: () =>
          get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
      }),
      {
        name: 'tienda-sena-carrito',
        // partialize evita guardar las funciones en localStorage: solo los productos.
        partialize: (estado) => ({ items: estado.items }),
      }
    ),
    { name: 'CarritoStore' }
  )
)
