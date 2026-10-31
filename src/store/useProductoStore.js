import { create } from 'zustand'

// Catálogo de práctica: fakestoreapi no necesita llave ni backend propio.
// Si algún día conectan su propio backend, solo cambian VITE_API_URL en el .env.
const API = import.meta.env.VITE_API_URL ?? 'https://fakestoreapi.com'

// Store del catálogo: productos + filtros.
// El buscador y el selector de categoría viven aquí para que el input (BuscadorProductos)
// y la lista (ListaProductos) se comuniquen sin pasarse props.
export const useProductoStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  search: '',
  category: 'todas',

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch(`${API}/products`)
      if (!res.ok) throw new Error('No fue posible cargar el catálogo')
      const data = await res.json()

      // La API devuelve "title"; lo renombramos a "name" para que el resto del código sea claro.
      set({
        products: data.map((p) => ({ ...p, name: p.title })),
        loading: false,
      })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}))
