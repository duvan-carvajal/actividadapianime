import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  "./style.css";

interface AnimeData {
  mal_id: number;
  url: string;

  images: {
    jpg: ImageSet;
    webp: ImageSet;
  };

  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };

  title: string;
  title_english: string | null;
  title_japanese: string;

  episodes: number;
  status: string;
  airing: boolean;

  aired: {
    from: string;
    to: string | null;
    string: string;
  };

  duration: string;
  rating: string;
  score: number;
  rank: number;
  popularity: number;

  synopsis: string;

  season: string;
  year: number;

  genres: Genre[];
}

interface ImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Genre {
  mal_id: number;
  name: string;
  type: string;
}

function Anime() {
  const { anime } = useParams<{ anime: string }>();

  const [data, setData] = useState<AnimeData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!anime) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorites.includes(anime)) {
      setIsFavorite(true);
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const result: { data: AnimeData } = await res.json();

        setData(result.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [anime]);

  const toggleFavorite = () => {
    if (!anime) return;

    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorites.includes(anime)) {
      favorites = favorites.filter((fav: string) => fav !== anime);
      setIsFavorite(false);
    } else {
      favorites.push(anime);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h1>
        {data.title}
        <button onClick={toggleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </h1>

      <img src={data.images.jpg.image_url} alt={data.title} />

      <h2>Información</h2>
      <p><strong>Título en inglés:</strong> {data.title_english || "N/A"}</p>
      <p><strong>Episodios:</strong> {data.episodes}</p>
      <p><strong>Estado:</strong> {data.status}</p>
      <p><strong>Duración:</strong> {data.duration}</p>
      <p><strong>Año:</strong> {data.year}</p>

      <h2>Ranking</h2>
      <p><strong>Rank:</strong> #{data.rank}</p>
      <p><strong>Score:</strong> {data.score}</p>
      <p><strong>Popularidad:</strong> {data.popularity}</p>

      <h2>Géneros</h2>
      <ul>
        {data.genres.map((genre) => (
          <li key={genre.mal_id}>{genre.name}</li>
        ))}
      </ul>

      <h2>Sinopsis</h2>
      <p>{data.synopsis}</p>

      {data.trailer.embed_url && (
        <>
          <h2>Trailer</h2>
          <iframe
            src={data.trailer.embed_url}
            title="Trailer"
            width="560"
            height="315"
            allowFullScreen
          />
        </>
      )}
    </div>
  );
}

export default Anime;