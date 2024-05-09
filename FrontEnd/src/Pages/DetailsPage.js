import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import "../styles/DetailsPage.css";
import {
  deleteAnime,
  getCurrentUserId,
  checkUserWatchList,
} from "../Collections/Users";
import { addAnime, getAnimeByMalId } from "../Collections/Anime";
import Error from "../components/Error";
import LoadComponent from "../components/Loading";
export default function DetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState({});
  const [error, setError] = useState(null);
  const [inList, setInList] = useState(false);
  const ratingScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  async function loadContent() {
    setIsLoading(true);
    try {
      let _anime = await axios.get(apiEndPoints.jikanById + id);
      const _id = await getCurrentUserId();
      _anime = _anime.data.data;
      setAnime(_anime);
      const animeByMalId = await getAnimeByMalId(_anime.mal_id);
      if (animeByMalId) {
        const animeInList = await checkUserWatchList(_id, animeByMalId._id);
        if (animeInList) {
          setInList(true);
        }
      }
      setIsLoading(false);
    } catch (e) {
      setError(e);
      console.log(e);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadContent();
  }, []);

  if (isLoading) {
    return <LoadComponent />;
  }
  if (error) {
    return <Error />;
  }

  const suffix = (number) => {
    let temp = number % 10;
    if (temp == 1) {
      return "st";
    } else if (temp == 2) {
      return "nd";
    } else if (temp == 3) {
      return "rd";
    }
    return "th";
  };
  const titleShorten = (title) => {
    if (title?.length > 30) {
      return title.substring(0, 65) + "...";
    }
    return title;
  };
  async function removeAnime() {
    try {
      const id = await getCurrentUserId();
      const _anime = await getAnimeByMalId(anime.mal_id);
      await deleteAnime(id, _anime._id);
      setInList(false);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="DetailsPage">
      <div className="left-section">
        <div className="img">
          <img
            src={
              anime.images?.jpg.large_image_url ||
              anime.images?.jpg.image_url ||
              anime.images?.jpg.small_image_url
            }
            alt="anime-Picture"
          />
        </div>
        <div className="information">
          <div className="airDate">
            <strong>Air Date:</strong> {anime?.aired && anime.aired.string}
          </div>
          <div className="demographic">
            <strong>Demographic:</strong>{" "}
            {anime?.demographics &&
              anime.demographics[0] &&
              anime.demographics[0].name}
          </div>
          <div className="duration">
            <strong>Duration: </strong>
            {anime?.duration && anime.duration}
          </div>
          <div className="genres">
            <strong>Genres: </strong>
            {anime?.genres &&
              anime.genres.map((genre, index) =>
                index != anime.genres.length - 1
                  ? ` ${genre.name},`
                  : ` ${genre.name}`
              )}
          </div>
          <div className="studio">
            <strong>Studios: </strong>
            {anime?.studios &&
              anime.studios.map((studio, index) =>
                index != anime.studios.length - 1
                  ? ` ${studio.name},`
                  : ` ${studio.name}`
              )}
          </div>
          <div className="episodes">
            <strong>Episodes: </strong>
            {anime?.episodes ? anime.episodes : "Still airing"}
          </div>
          <div className="rating">
            <strong>Rating: </strong>
            {anime?.rating}
          </div>
          <div className="season">
            <strong>Season Aired: </strong>
            {anime?.season}
          </div>
          <div className="source">
            <strong>Source Material: </strong>
            {anime?.source}
          </div>
          <div className="producers">
            <strong>Producers:</strong>
            {anime?.producers &&
              anime.producers.map((producer, index) =>
                index != anime.producers.length - 1
                  ? ` ${producer.name},`
                  : ` ${producer.name}`
              )}
          </div>
          <div className="mal-link">
            <strong>More Details:</strong>{" "}
            <a id="mal_link" target="_blank" href={anime?.url || "#"}>
              MyAnimeList
            </a>
          </div>
        </div>
      </div>
      <div className="right-section">
        <section id="top-section">
          <div className="List-setting">
            <div id="Anime-Title">
              <span>
                {" "}
                {anime?.title_english
                  ? titleShorten(anime.title_english)
                  : titleShorten(anime.title)}
              </span>
            </div>
            {!user ? (
              <div id="SignInMessage">
                <a href="/login" target="_blank">
                  Sign in
                </a>{" "}
                to add to list!
              </div>
            ) : (
              <div className="buttons">
                {!inList ? (
                  <button
                    id="Add-Btn"
                    onClick={() => {
                      addAnime(anime)
                        .then(setInList(true))
                        .catch((e) => console.error(e));
                    }}
                  >
                    Add to List
                  </button>
                ) : (
                  <button id="Remove-Btn" onClick={removeAnime}>
                    Remove From List
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="vertical-line"></div>
          <div className="score-users">
            <div id="score-title">
              <span>Score:</span>
            </div>
            <div id="score">
              {anime?.score ? anime.score + " /10.00" : "Unknown"}
            </div>
            <div id="users">
              {anime?.score ? "by " + anime?.scored_by + " users" : ""}
            </div>
          </div>

          <div className="vertical-line"></div>
          <div className="popularity">
            <div id="title">Popularity:</div>
            <div id="number">
              {" "}
              {anime?.popularity}
              {suffix(anime?.popularity)}
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="rank">
            <div id="title">Ranking: </div>
            <div id="number">
              {anime?.rank}
              {suffix(anime?.rank)}
            </div>
          </div>
        </section>
        {inList && (
          <div id="userRating">
            Your rating is :<label for="animeRating"></label>
            <select name="animeRating" id="animeRating">
              {ratingScale.map((num, index) => (
                <option value={num}>{num}</option>
              ))}
            </select>
          </div>
        )}
        <article>
          <br></br>
          <span id="title">Synopsis</span>
          <hr></hr>
          <div className="synopsis">{anime?.synopsis}</div>
        </article>
        <div className="trailers">
          <br></br>
          <span id="title">Trailer</span>
          <hr></hr>
          {anime?.trailer && anime.trailer.embed_url ? (
            <div id="video-container">
              <iframe
                id="video"
                width="420"
                height="345"
                src={anime?.trailer.embed_url}
              ></iframe>
            </div>
          ) : (
            <div id="message">Trailer unavailable.</div>
          )}
        </div>
      </div>
    </div>
  );
}
