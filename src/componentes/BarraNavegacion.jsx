import { useCarritoStore } from '../store/useCarritoStore'
import { useTemaStore } from '../store/useTemaStore'
import { NavLink, Link } from 'react-router-dom'

export default function BarraNavegacion({ onAbrirCarrito }) {
  // totalItems() usa get() por dentro, pero al leerlo con selector se recalcula
  // cada vez que el carrito cambia.
  const totalItems = useCarritoStore((s) => s.totalItems())
  const theme = useTemaStore((s) => s.theme)
  const toggleTheme = useTemaStore((s) => s.toggleTheme)

  return (
    <header className="barra">
      <Link to="/" className="marca">
        <span className="isotipo">S</span>
        <span>
          Tienda SENA
          <small>Almacén de práctica</small>
        </span>
      </Link>

      <nav className="menu">
        <NavLink to="/" end>
          Catálogo
        </NavLink>
        <NavLink to="/favoritos">Favoritos</NavLink>
      </nav>

      <div className="acciones-barra">
        <button className="boton-tema" onClick={toggleTheme}>
          {theme === 'claro' ? 'Modo oscuro' : 'Modo claro'}
        </button>

        <button className="boton-carrito" onClick={onAbrirCarrito}>
          Recibo
          <span className="contador">{totalItems}</span>
        </button>
      </div>
    </header>
  )
}
