import "../styles/HomePage.css";
import LoadComponent from "../components/Loading";
import frieren from "../static/frieren.gif";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { apiEndPoints } from "../apiEndpoints";
import { getUserWatchList, getUserMangaList } from "../Collections/Users";
import { useNavigate } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
import { getManga } from "../Collections/Manga";
import hellsing from "../static/hellsing.png";
import axios from "axios";
function HomePage() {
  document.body.style = "background: #10131f;";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate("");
  //Array of anime and their data
  const [upcomingAnime, setUpcomingAnime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recentAnime, setRecentAnime] = useState();
  const [recentManga, setRecentManga] = useState();
  const [topAnime, setTopAnime] = useState();
  const [topManga, setTopManga] = useState();
  const [error, setError] = useState();

  //Set lists with infomation from array of ids
  //Input: array of ids
  //Returns: array of objects
  async function getListInfo(arr, callback, type) {
    let temp = [];
    for (let i of arr) {
      const data = await callback(i);
      temp.push(data.data[type]);
    }
    temp = temp.reverse();
    return temp.slice(0, 8);
  }

  async function getData() {
    try {
      const topAnimeResponse = await axios.get(apiEndPoints.topUpcomingAnime);
      setUpcomingAnime(topAnimeResponse.data.data);
      // console.log(topAnimeResponse);
      const recentAnime = await getUserWatchList();
      const recentAnimeList = await getListInfo(recentAnime, getAnime, "anime");
      // console.log(recentAnimeList);
      setRecentAnime(recentAnimeList);

      const topAiring = await axios.get(apiEndPoints.topAiring);
      setTopAnime(topAiring.data.data);

      const recentManga = await getUserMangaList();
      const recentMangaList = await getListInfo(recentManga, getManga, "manga");
      console.log(recentMangaList);
      setRecentManga(recentMangaList);
      const topManga = await axios.get(apiEndPoints.topManga);
      setTopManga(topManga.data.data);
    } catch (e) {
      return new Error(e);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then(setIsLoading(false))
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, []);
  if (isLoading) {
    return <LoadComponent />;
  }
  if (user) {
    return (
      <div className="Dashboard">
        {upcomingAnime && (
          <div className="list-content">
            <div className="title">Top Upcoming Anime</div>
            <hr></hr>
            <div className="anime-container">
              {upcomingAnime.map((anime) => (
                <img
                  key={anime.mal_id}
                  className="anime"
                  alt="anime-image"
                  src={anime.images.jpg.image_url}
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                ></img>
              ))}
            </div>
          </div>
        )}
        {topAnime && (
          <div className="list-content">
            <div className="title">Top Airing Anime</div>
            <hr></hr>
            <div className="anime-container">
              {topAnime.map((anime) => (
                <img
                  key={anime.mal_id}
                  className="anime"
                  alt="anime-image"
                  src={anime.images.jpg.image_url}
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                ></img>
              ))}
            </div>
          </div>
        )}
        {topManga && (
          <div className="list-content">
            <div className="title">Top Manga</div>
            <hr></hr>
            <div className="anime-container">
              {topManga.map((manga) => (
                <img
                  key={manga.mal_id}
                  className="anime"
                  alt="manga-image"
                  src={manga.images.jpg.image_url}
                  onClick={() => navigate(`/manga/${manga.mal_id}`)}
                ></img>
              ))}
            </div>
          </div>
        )}
        {recentAnime && (
          <div className="list-content">
            <div className="title">Recent Added Anime</div>
            <hr></hr>
            <div className="anime-container">
              {recentAnime.map((anime) => (
                <img
                  key={anime.mal_id}
                  className="anime"
                  alt="anime-image"
                  src={anime.imageUrl}
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                ></img>
              ))}
            </div>
          </div>
        )}
        {recentManga && (
          <div className="list-content">
            <div className="title">Recent Added Manga</div>
            <hr></hr>
            <div className="anime-container">
              {recentManga.map((manga) => (
                <img
                  key={manga.mal_id}
                  className="anime"
                  alt="manga-image"
                  src={manga.imageUrl}
                  onClick={() => navigate(`/manga/${manga.mal_id}`)}
                ></img>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return <WelcomePage />;
}

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div id="welcomePage">
      <div id="Intro">
        <div id="title">OtakuHub</div>
        <div id="description">
          Welcome to OtakuHub! Explore new series, track your favorites, and
          connect with friends who share your passion.
        </div>
        <div id="btnContainer">
          <button onClick={() => navigate("/login")}>Get Started</button>
        </div>
      </div>
      <div id="imgContainer">
        <div id="container">
          <img id="homeImg" src={hellsing}></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
