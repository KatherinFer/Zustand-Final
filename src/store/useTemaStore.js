import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Tema de la interfaz: es preferencia del usuario, por eso se guarda en localStorage.
export const useTemaStore = create(
  persist(
    (set, get) => ({
      theme: 'claro',
      toggleTheme: () =>
        set({ theme: get().theme === 'claro' ? 'oscuro' : 'claro' }),
    }),
    { name: 'tienda-sena-tema' }
  )
)
