import { useCarritoStore } from '../store/useCarritoStore'
import { useFavoritosStore } from '../store/useFavoritosStore'
import { formatearPrecio } from '../utilidades/formato'
import { nombreCategoria } from '../utilidades/categorias'

export default function TarjetaProducto({ producto }) {
  // Un selector por dato: la tarjeta solo se re-renderiza si cambia lo que usa.
  const addItem = useCarritoStore((s) => s.addItem)
  const toggleFavorite = useFavoritosStore((s) => s.toggleFavorite)
  const esFavorito = useFavoritosStore((s) => s.isFavorite(producto.id))

  return (
    <article className="tarjeta">
      <div className="tarjeta-marco">
        <span className="tarjeta-ref">REF. {String(producto.id).padStart(3, '0')}</span>

        <button
          className={esFavorito ? 'corazon activo' : 'corazon'}
          onClick={() => toggleFavorite(producto)}
          aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {esFavorito ? '♥' : '♡'}
        </button>

        <img src={producto.image} alt={producto.name} loading="lazy" />
      </div>

      <div className="tarjeta-cuerpo">
        <span className="etiqueta">{nombreCategoria(producto.category)}</span>
        <h3>{producto.name}</h3>

        <div className="tarjeta-pie">
          <p className="precio">{formatearPrecio(producto.price)}</p>
          <button className="boton-agregar" onClick={() => addItem(producto)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
