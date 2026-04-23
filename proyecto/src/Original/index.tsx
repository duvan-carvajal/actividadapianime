import { useEffect, useState } from "react";
import "./style.css";
// ola esto es para que me deje hacer commit push
function Original() {
  type Anime = {
  mal_id: number;
  title: string;
  popularity: number;
  score: number | null;
  episodes: number | null;
  images: {
    jpg: {
      image_url: string;
    };
  };
};
  const [animeList, setAnimeList] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc")
      .then(res => res.json())
      .then(data => {
        const sorted = [...data.data].sort((a: Anime, b: Anime) => 
  a.popularity - b.popularity
  );
        setAnimeList(sorted);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Animes mas populares</h1>

      {animeList.map(anime => (
        <div key={anime.mal_id}>
          <h3>{anime.title}</h3>
          <p>Ranking: {anime.popularity}</p>
        </div>
      ))}
    </div>
  );
}

export default Original;