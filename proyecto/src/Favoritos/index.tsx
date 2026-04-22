import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  "./style.css";

interface AnimeData {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

function Favoritos() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [animes, setAnimes] = useState<AnimeData[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const results = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            const data = await res.json();
            return data.data;
          })
        );

        setAnimes(results);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    }
  }, [favorites]);

  return (
    <div>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes animes favoritos</p>
      ) : (
        <ul>
          {animes.map((anime) => (
            <li key={anime.mal_id}>
              <Link to={`/anime/${anime.mal_id}`}>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  width="100"
                />
                <p>{anime.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;