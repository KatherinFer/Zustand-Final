import { Link } from 'react-router-dom'
import { useFavoritosStore } from '../store/useFavoritosStore'
import TarjetaProducto from '../componentes/TarjetaProducto'

export default function Favoritos() {
  const favorites = useFavoritosStore((s) => s.favorites)

  return (
    <section>
      <div className="cabecera-pagina">
        <p className="sobre-titulo">Lista guardada</p>
        <h1>Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="vacio">
          <p>Todavía no guardas productos.</p>
          <Link className="boton-secundario" to="/">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <section className="rejilla">
          {favorites.map((p) => (
            <TarjetaProducto key={p.id} producto={p} />
          ))}
        </section>
      )}
    </section>
  )
}
