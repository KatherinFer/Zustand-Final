import { useEffect } from 'react'
import { useProductoStore } from '../store/useProductoStore'
import BuscadorProductos from '../componentes/BuscadorProductos'
import ListaProductos from '../componentes/ListaProductos'

export default function Catalogo() {
  const fetchProducts = useProductoStore((s) => s.fetchProducts)
  const loading = useProductoStore((s) => s.loading)
  const error = useProductoStore((s) => s.error)

  // La acción del store se dispara una sola vez al entrar a la página.
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <section>
      <div className="cabecera-pagina">
        <p className="sobre-titulo">Inventario disponible</p>
        <h1>Catálogo</h1>
      </div>

      <BuscadorProductos />

      {loading && <p className="aviso">Cargando catálogo...</p>}

      {error && (
        <div className="aviso error">
          <p>{error}</p>
          <button className="boton-secundario" onClick={fetchProducts}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && <ListaProductos />}
    </section>
  )
}
