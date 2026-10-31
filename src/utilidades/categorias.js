// fakestoreapi devuelve las categorías en inglés; aquí las mostramos en español.
const NOMBRES = {
  "men's clothing": 'Ropa de hombre',
  "women's clothing": 'Ropa de mujer',
  jewelery: 'Joyería',
  electronics: 'Electrónica',
}

export function nombreCategoria(categoria) {
  return NOMBRES[categoria] ?? categoria
}
