import { useProductoStore } from '../store/useProductoStore'
import { filtrarProductos } from '../utilidades/filtros'
import TarjetaProducto from './TarjetaProducto'

export default function ListaProductos() {
  const products = useProductoStore((s) => s.products)
  const search = useProductoStore((s) => s.search)
  const category = useProductoStore((s) => s.category)
  const setSearch = useProductoStore((s) => s.setSearch)
  const setCategory = useProductoStore((s) => s.setCategory)

  const lista = filtrarProductos(products, search, category)

  if (lista.length === 0) {
    return (
      <div className="vacio">
        <p>No hay productos con esos filtros.</p>
        <button
          className="boton-secundario"
          onClick={() => {
            setSearch('')
            setCategory('todas')
          }}
        >
          Limpiar filtros
        </button>
      </div>
    )
  }

  return (
    <section className="rejilla">
      {lista.map((p) => (
        <TarjetaProducto key={p.id} producto={p} />
      ))}
    </section>
  )
}
