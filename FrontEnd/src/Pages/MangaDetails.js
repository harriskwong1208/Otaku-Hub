import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import "../styles/DetailsPage.css";
import LoadComponent from "../components/Loading";
import { addManga, getMangaByMalId } from "../Collections/Manga";
import {
  getCurrentUserId,
  deleteManga,
  checkUserMangaList,
  checkAndReturnMangaFromWatchList,
} from "../Collections/Users";
import Error from "../components/Error";
export default function MangaDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [manga, setManga] = useState({});
  const [error, setError] = useState(null);
  const [inList, setInList] = useState(false);
  const ratingScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const mangaStatus = ["Reading", "On Hold", "Dropped", "Finished"];
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("Reading");
  async function getManga() {
    setIsLoading(true);
    try {
      let _manga = await axios.get(apiEndPoints.jikanMangaById + id);
      const _id = await getCurrentUserId();
      _manga = _manga.data.data;
      setManga(_manga);

      const mangaByMalId = await getMangaByMalId(_manga.mal_id);
      if (mangaByMalId) {
        const mangaInList = await checkUserMangaList(_id, mangaByMalId._id);
        if (mangaInList) {
          setInList(true);
          const foundManga = await checkAndReturnMangaFromWatchList(
            _id,
            mangaByMalId._id
          );
          setRating(foundManga[1]);
          setStatus(foundManga[2]);
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
    getManga();
  }, []);

  async function saveAnimeProgress() {
    try {
      const userID = await getCurrentUserId();
      const mangaID = await getMangaByMalId(id);
      const response = await axios.put(
        apiEndPoints.backEndApi + `users/manga/update/${userID}/${mangaID._id}`,
        {
          rating: rating,
          status: status,
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      alert("Error occured while saving progress");
    }
  }
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
  const publishAttribute = (published) => {
    const fromDate = published.from.split("T")[0];
    if (published.to == null) {
      return `Publishing since ${fromDate}`;
    }
    return `From ${fromDate} to ${published.to.split("T")[0]}`;
  };

  async function removeManga() {
    try {
      const id = await getCurrentUserId();
      const _manga = await getMangaByMalId(manga.mal_id);
      await deleteManga(id, _manga._id);
      setInList(false);
    } catch (e) {
      console.error(e);
    }
  }

  const titleShorten = (title) => {
    if (title?.length > 30) {
      return title.substring(0, 65) + "...";
    }
    return title;
  };

  return (
    <div className="DetailsPage">
      <div className="left-section">
        <div className="img">
          <img
            src={
              manga?.images?.jpg.large_image_url ||
              manga?.images?.jpg._image_url ||
              manga?.images?.jpg.small_image_url
            }
          />
        </div>
        <div className="information">
          <div className="publishDate">
            <strong>Air Date: </strong>
            {manga?.published
              ? publishAttribute(manga.published)
              : "Unavailable"}
          </div>
          <div className="demographic">
            <strong>Demographic:</strong>{" "}
            {manga?.demographics &&
              manga.demographics[0] &&
              manga.demographics[0].name}
          </div>
          <div className="volume">
            <strong>Volume: </strong>
            {manga?.volumes ? manga.volumes : "Unavailable"}
          </div>
          <div className="genres">
            <strong>Genres: </strong>
            {manga?.genres &&
              manga.genres.map((genre, index) =>
                index != manga.genres.length - 1
                  ? ` ${genre.name},`
                  : ` ${genre.name}`
              )}
          </div>
          <div className="serializations">
            <strong>Serialization: </strong>
            {manga?.serializations
              ? manga.serializations.map((serialization, index) =>
                  index != manga.serializations.length - 1
                    ? ` ${serialization.name},`
                    : ` ${serialization.name}`
                )
              : "Unavailable"}
          </div>
          <div className="status" id="detailStatus">
            <strong>Status: </strong>
            {manga?.status ? manga.status : "Unknown"}
          </div>
          <div className="theme">
            <strong>Theme(s): </strong>
            {manga?.themes
              ? manga.themes.map((theme, index) =>
                  index != manga.themes.length - 1
                    ? ` ${theme.name},`
                    : ` ${theme.name}`
                )
              : ""}
          </div>
          <div className="chapters">
            <strong>Chapters: </strong>
            {manga?.chapters ? manga.chapters : "Unavailable"}
          </div>
          <div className="type">
            <strong>Type: </strong>
            {manga?.type ? manga.type : "Unknown"}
          </div>
          <div className="authors">
            <strong>Author(s):</strong>
            {manga?.authors
              ? manga.authors.map((author, index) =>
                  index != manga.authors.length - 1
                    ? ` ${author.name},`
                    : ` ${author.name}`
                )
              : ""}
          </div>
          <div className="mal-link">
            <strong>More Details:</strong>{" "}
            <a id="mal_link" target="_blank" href={manga?.url || "#"}>
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
                {manga?.title_english
                  ? titleShorten(manga.title_english)
                  : titleShorten(manga.title)}
              </span>
            </div>
            {!user ? (
              <div id="SignInMessage">
                <a href="/login" target="_blank">
                  Sign in
                </a>
                to add to list!
              </div>
            ) : (
              <div className="buttons">
                {!inList ? (
                  <button
                    id="Add-Btn"
                    onClick={() =>
                      addManga(manga)
                        .then(setInList(true))
                        .catch((e) => console.log(e))
                    }
                  >
                    Add to List
                  </button>
                ) : (
                  <button id="Remove-Btn" onClick={removeManga}>
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
            <div id="score">{manga?.score} / 10.00 </div>
            <div id="users">by {manga?.scored_by} users</div>
          </div>
          <div className="vertical-line"></div>
          <div className="popularity">
            <div id="title">Popularity:</div>
            <div id="number">
              {" "}
              {manga?.popularity}
              {suffix(manga?.popularity)}
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="rank">
            <div id="title">Ranking: </div>
            <div id="number">
              {manga?.rank}
              {suffix(manga?.rank)}
            </div>
          </div>
        </section>
        {inList && (
          <>
            <div id="userRating">
              <span>Your rating is:</span>
              <label for="animeRating"></label>
              <select
                name="animeRating"
                id="animeRating"
                onChange={(e) => setRating(e.target.value)}
              >
                {ratingScale.map((num, index) => {
                  if (num == rating) {
                    return (
                      <option selected value={num}>
                        {num}
                      </option>
                    );
                  }
                  return <option value={num}>{num}</option>;
                })}
              </select>
              <label for="animeStatus"></label>
              <select
                name="animeStatus"
                id="animeStatus"
                onChange={(e) => setStatus(e.target.value)}
              >
                {mangaStatus.map((_status, index) => {
                  if (_status == status) {
                    return (
                      <option selected value={_status}>
                        {_status}
                      </option>
                    );
                  }
                  return <option value={_status}>{_status}</option>;
                })}
              </select>
              <button id="saveBtn" onClick={saveAnimeProgress}>
                Save
              </button>
            </div>
          </>
        )}
        <article>
          <br></br>
          <span id="title">Synopsis</span>
          <hr></hr>
          <div className="synopsis">
            {manga?.synopsis ? manga.synopsis : "Unavailable"}
          </div>
          <br></br>
          <span id="title">Background</span>
          <hr></hr>
          <div className="background">
            {manga?.background ? manga.background : "Unavailable"}
          </div>
        </article>
      </div>
    </div>
  );
}
