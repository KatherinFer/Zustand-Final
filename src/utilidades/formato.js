// La API entrega precios en dólares, así que se muestran como USD pero con formato colombiano.
export function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(valor)
}
