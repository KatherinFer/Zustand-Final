// Filtro compartido por la lista de productos. Se deja fuera del componente
// para que la tarjeta y la página no repitan la misma lógica.
export function filtrarProductos(productos, search, category) {
  const texto = search.trim().toLowerCase()

  return productos.filter((p) => {
    const coincideTexto = p.name.toLowerCase().includes(texto)
    const coincideCategoria = category === 'todas' || p.category === category
    return coincideTexto && coincideCategoria
  })
}
