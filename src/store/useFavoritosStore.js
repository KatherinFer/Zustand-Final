import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Favoritos: un store pequeño, con una sola acción que sirve para agregar y quitar.
export const useFavoritosStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (producto) =>
        set((estado) => {
          const existe = estado.favorites.some((f) => f.id === producto.id)
          return {
            favorites: existe
              ? estado.favorites.filter((f) => f.id !== producto.id)
              : [...estado.favorites, producto],
          }
        }),

      // get() permite consultar el estado desde una función que no es un componente.
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    { name: 'tienda-sena-favoritos' }
  )
)
