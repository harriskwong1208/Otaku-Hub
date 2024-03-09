import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import "../styles/DetailsPage.css";
import { addAnime, getAnimeByMalId } from "../Collections/Anime";
import {
  checkUserWatchList,
  getCurrentUserId,
  getAllUsersFromDatabase,
} from "../Collections/Users";
import { addManga } from "../Collections/Manga";
import LoadComponent from "../components/Loading";
export default function MangaDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState({});
  const [error, setError] = useState(null);
  const [popUp, setPopUp] = useState(false);
  async function getAnime() {
    setIsLoading(true);
    try {
      let _anime = await axios.get(apiEndPoints.jikanMangaById + id);
      _anime = _anime.data.data;
      setAnime(_anime);
      console.log(_anime);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      console.log(e);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAnime();
  }, []);

  if (isLoading) {
    return <LoadComponent />;
  }

  return (
    <div className="DetailsPage">
      <div className="left-section">
        <div className="img">
          <img src={anime.images && anime.images.jpg.large_image_url} />
        </div>
        <div className="information">
          <div className="airDate">
            Publishing Date:{" "}
            {anime.published &&
              `${anime.published.from.split("T")[0]} 
                            ${
                              anime.published.to != null
                                ? `to ${anime.published.to.split("T")[0]}`
                                : ""
                            }`}
          </div>
          <div className="demographic">
            Demographic:{" "}
            {anime.demographics &&
              anime.demographics[0] &&
              anime.demographics[0].name}
          </div>
          <div className="duration">Status: {anime.status && anime.status}</div>
          <div className="genres">
            Genres:
            {anime.genres &&
              anime.genres.map((genre, index) =>
                index != anime.genres.length - 1
                  ? ` ${genre.name},`
                  : ` ${genre.name}`
              )}
          </div>
          <div className="episodes">
            Chapters: {anime.chapters ? anime.chapters : "Unknown"}
          </div>
          <div className="rating">Volumns: {anime.volumes}</div>
          <div className="source">Type: {anime.type}</div>
          <div className="producers">
            Serializations:
            {anime.serializations &&
              anime.serializations.map((serialization, index) =>
                index != anime.serializations.length - 1
                  ? ` ${serialization.name},`
                  : ` ${serialization.name}`
              )}
          </div>
          <div className="mal-link">
            More Details:{" "}
            <a target="_blank" href={anime.url}>
              MyAnimeList
            </a>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="top-section">
          <div className="score">
            Score: {anime.score}, by {anime.scored_by} users
          </div>
          <div className="popularity">Popularity: {anime.popularity}</div>
          <div className="rank">Ranking: {anime.rank}</div>
          <div className="popularity">Popularity: {anime.popularity}</div>
          <div className="List-setting">
            {!user ? (
              <div>Sign in to add to list!</div>
            ) : (
              <button onClick={() => addManga(anime)}>Add to List</button>
            )}
          </div>
        </div>
        <div className="middle-section">
          <div className="description"></div>
        </div>
      </div>
    </div>
  );
}
