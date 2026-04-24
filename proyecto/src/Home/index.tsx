import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface AnimeData {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  episodes: number;
}

function Home() {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await res.json();
        setAnimes(data.data);
      } catch (error) {
        console.error("Error cargando animes:", error);
      }
    };

    fetchData();
  }, []);

  const animesFiltrados = animes.filter((anime) =>
    busqueda.length < 3
      ? true
      : anime.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Buscar anime"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-container">
        <h2>Top Anime</h2>

        <div className="anime-grid">
          {animesFiltrados.map((anime) => (
            <div
              key={anime.mal_id}
              className={
                busqueda.length >= 3 &&
                anime.title.toLowerCase().includes(busqueda.toLowerCase())
                  ? "resaltado"
                  : ""
              }
            >
              <Link to={`/anime/${anime.mal_id}`}>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                />
                <h3>{anime.title}</h3>
              </Link>

              <p>Puntuacion: {anime.score}</p>
              <p>Episodios: {anime.episodes} eps</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;