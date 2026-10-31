import { useCarritoStore } from '../store/useCarritoStore'
import { formatearPrecio } from '../utilidades/formato'
import BotonCantidad from './BotonCantidad'

export default function PanelCarrito({ abierto, onCerrar }) {
  const items = useCarritoStore((s) => s.items)
  const updateQty = useCarritoStore((s) => s.updateQty)
  const removeItem = useCarritoStore((s) => s.removeItem)
  const clearCart = useCarritoStore((s) => s.clearCart)
  const total = useCarritoStore((s) => s.totalPrice())

  // Esta parte es estado local del App (¿está abierto el panel?), no del store.
  if (!abierto) return null

  return (
    <div className="fondo-panel" onClick={onCerrar}>
      <aside className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-cabecera">
          <div>
            <h2>Recibo de caja</h2>
            <p>Tienda SENA · {items.length} referencia(s)</p>
          </div>
          <button className="boton-cerrar" onClick={onCerrar} aria-label="Cerrar recibo">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="panel-vacio">
            <p>Tu recibo está vacío.</p>
            <p className="texto-pequeno">Agrega productos desde el catálogo.</p>
          </div>
        ) : (
          <ul className="panel-lista">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="panel-datos">
                  <p className="panel-nombre">{item.name}</p>
                  <p className="panel-unitario">{formatearPrecio(item.price)} c/u</p>

                  <div className="panel-fila">
                    <BotonCantidad
                      signo="−"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      etiqueta={`Quitar una unidad de ${item.name}`}
                    />
                    <span className="panel-cantidad">{item.qty}</span>
                    <BotonCantidad
                      signo="+"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      etiqueta={`Agregar una unidad de ${item.name}`}
                    />
                    <button
                      className="boton-quitar"
                      onClick={() => removeItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <p className="panel-subtotal">
                  {formatearPrecio(item.price * item.qty)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="panel-pie">
          <div className="panel-total">
            <span>Total</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>

          <button
            className="boton-vaciar"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Vaciar recibo
          </button>
        </div>
      </aside>
    </div>
  )
}
