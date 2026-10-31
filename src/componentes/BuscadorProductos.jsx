import { useProductoStore } from '../store/useProductoStore'
import { nombreCategoria } from '../utilidades/categorias'

// El input y el select escriben en el store; la lista (otro componente) los lee.
export default function BuscadorProductos() {
  const products = useProductoStore((s) => s.products)
  const search = useProductoStore((s) => s.search)
  const category = useProductoStore((s) => s.category)
  const setSearch = useProductoStore((s) => s.setSearch)
  const setCategory = useProductoStore((s) => s.setCategory)

  // Las categorías se sacan de los productos ya cargados: no hace falta otro estado.
  const categorias = [...new Set(products.map((p) => p.category))]

  return (
    <div className="buscador">
      <input
        type="search"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar producto"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filtrar por categoría"
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {nombreCategoria(c)}
          </option>
        ))}
      </select>
    </div>
  )
}
