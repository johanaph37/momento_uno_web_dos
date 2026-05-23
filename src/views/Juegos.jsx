import { useState } from "react";
import { JUEGOS, CATEGORIAS } from "../data/mockData";
import JuegosCard from "../components/JuegosCard";
import "./Juegos.css";

function Juegos() {
  // Estado con todos los juegos
  const [juegos] = useState(JUEGOS);
  // Estado para saber qué categoría está seleccionada
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  // Estado para la búsqueda por texto
  const [busqueda, setBusqueda] = useState("");

  // Filtra los juegos según categoría y búsqueda
  const juegosFiltrados = juegos.filter((j) => {
    const matchCategoria = categoriaActiva === "Todos" || j.categoria === categoriaActiva;
    const matchBusqueda = j.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <div className="juegos container">

      {/* Título */}
      <div className="juegos__header">
        <h1 className="juegos__titulo">Catálogo de Juegos</h1>
        <p className="juegos__sub">{juegos.length} juegos educativos disponibles</p>
      </div>

      {/* Buscador */}
      <div className="juegos__search-wrap">
        <span className="juegos__search-icon">🔍</span>
        <input
          className="juegos__search"
          type="text"
          placeholder="Buscar juego..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Filtros por categoría */}
      <div className="juegos__filtros">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`juegos__filtro-btn ${categoriaActiva === cat ? "juegos__filtro-btn--active" : ""}`}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cantidad de resultados */}
      <p className="juegos__resultado-count">
        {juegosFiltrados.length} resultado{juegosFiltrados.length !== 1 ? "s" : ""}
      </p>

      {/* Grid de juegos */}
      {juegosFiltrados.length > 0 ? (
        <div className="juegos__grid">
          {juegosFiltrados.map((juego) => (
            <JuegosCard
              key={juego.id}
              juego={juego}
            />
          ))}
        </div>
      ) : (
        <div className="juegos__empty">
          <span>🎮</span>
          <p>No se encontraron juegos con ese filtro.</p>
        </div>
      )}

    </div>
  );
}

export default Juegos;