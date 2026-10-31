export default function BotonCantidad({ signo, onClick, etiqueta }) {
  return (
    <button className="boton-cantidad" onClick={onClick} aria-label={etiqueta}>
      {signo}
    </button>
  )
}
