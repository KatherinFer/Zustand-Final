import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BarraNavegacion from './componentes/BarraNavegacion'
import PanelCarrito from './componentes/PanelCarrito'
import Catalogo from './paginas/Catalogo'
import Favoritos from './paginas/Favoritos'
import { useTemaStore } from './store/useTemaStore'
import './App.css'

export default function App() {
  const theme = useTemaStore((s) => s.theme)

  // ¿Está abierto el recibo? Solo le importa a App, así que va con useState.
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  // El tema es global pero la clase se pone en el <body>: useEffect la mantiene sincronizada.
  useEffect(() => {
    document.body.classList.toggle('oscuro', theme === 'oscuro')
  }, [theme])

  return (
    <>
      <BarraNavegacion onAbrirCarrito={() => setCarritoAbierto(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>

      <PanelCarrito
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
      />

      <footer className="pie">
        <span>Tienda SENA · Actividad de apropiación</span>
        <span>Zustand + React + Vite</span>
      </footer>
    </>
  )
}
