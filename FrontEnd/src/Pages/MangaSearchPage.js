import { useEffect, useState } from "react";
import "../styles/AnimeSearchPage.css";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import LoadComponent from "../components/Loading";

export default function MangaSearchPage(e) {
  // const [anime,setAnime] = useState('');
  const [manga, setManga] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results);
  }, [results]);
  async function searchManga(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await axios.get(
        apiEndPoints.jikanManga + manga + "&sfw&limit=24"
      );
      setResults(data.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  return (
    <div className="animesearch-page">
      <div className="Search-Container">
        <form className="search-form" onSubmit={searchManga}>
          <input
            className="search-bar"
            type="text"
            required
            placeholder="Enter Manga name here"
            onChange={(e) => setManga(e.target.value)}
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <LoadComponent />
      ) : (
        <div className="anime-results">
          {results.map((manga) => (
            <div key={manga.mal_id} className="anime">
              <div className="anime-details">
                <div className="title">
                  <a
                    className="link"
                    target="_blank"
                    href={`/manga/${manga.mal_id}`}
                    rel="noreferrer"
                  >
                    {manga.title}
                  </a>
                </div>
                <div className="score-episodes-type">
                  <span>Score: {manga.score}</span>
                  <span>Type: {manga.type}</span>
                  <span>Chapters: {manga.chapters}</span>
                </div>
                <div className="synopsis">{manga.synopsis}</div>
              </div>
              <div className="anime-pic">
                <img
                  alt="anime-visual"
                  src={
                    manga?.images?.jpg.large_image_url ||
                    manga?.images?.jpg.image_url ||
                    manga?.images?.jpg.small_image_url
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
