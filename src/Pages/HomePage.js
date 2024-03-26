import "../styles/HomePage.css";
import LoadComponent from "../components/Loading";
import frieren from "../static/frieren.gif";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { apiEndPoints } from "../apiEndpoints";
import { getUserWatchList, getUserMangaList } from "../Collections/Users";
import { useNavigate } from "react-router-dom";
import { getAnime } from "../Collections/Anime";
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
  async function getListInfo(arr, callback){
    let temp =[];
    for(let i of arr){
      const data = await getAnime(i);
      temp.push(data.data.anime)
    }
    temp = temp.reverse()
    return temp.slice(0,10);
  }

  async function getData() {
    try {
      const topAnimeResponse = await axios.get(apiEndPoints.topUpcomingAnime);
      setUpcomingAnime(topAnimeResponse.data.data);
      // console.log(topAnimeResponse);
      const recentAnime = await getUserWatchList();
      const recentAnimeList = await getListInfo(recentAnime);
      console.log(recentAnimeList)
      setRecentAnime(recentAnimeList);
      const topAiring = await axios.get(apiEndPoints.topAiring);
      setTopAnime(topAiring.data.data);
      const recentManga = await getUserMangaList();
      setRecentManga(recentManga);
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
  return (
    <div className="homepage">
      {!user ? (
        <WelcomePage />
      ) : (
        <div className="Dashboard">
          {upcomingAnime && (
            <div className="top-upcoming">
              <div className="title">Top Upcoming Anime</div>
              <hr></hr>
              <div className="anime-container">
                {upcomingAnime.map((anime) => (
                  <div key={anime.mal_id} className="anime">
                    <img
                      alt="anime-image"
                      src={anime.images.jpg.image_url}
                      onClick={()=> navigate(`/anime/${anime.mal_id}`)}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          )}
           {topAnime && (
            <div className="top-Airing">
              <div className="title">Top Airing Anime</div>
              <hr></hr>
              <div className="anime-container">
                {topAnime.map((anime) => (
                  <div key={anime.mal_id} className="anime">
                    <img
                      alt="anime-image"
                      src={anime.images.jpg.image_url}
                      onClick={()=> navigate(`/anime/${anime.mal_id}`)}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          )}  
           {topManga && (
            <div className="top-Manga">
              <div className="title">Top Manga</div>
              <hr></hr>
              <div className="anime-container">
                {topManga.map((manga) => (
                  <div key={manga.mal_id} className="anime">
                    
                    <img
                      alt="anime-image"
                      src={manga.images.jpg.image_url}
                      onClick={()=> navigate(`/manga/${manga.mal_id}`)}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          )}              
          {recentAnime && (
            <div className="recent-anime">
              <div className="title">Recent Added Anime</div>
              <hr></hr>
              <div className="anime-container">
                {recentAnime.map((anime) => (
                  <div key={anime.mal_id} className="anime">
                    
                    <img
                      alt="anime-image"
                      src={anime.imageUrl}
                      onClick={()=> navigate(`/anime/${anime.mal_id}`)}
                    ></img>
                  </div>
                ))}
              </div>
            </div>
          )}        
        </div>
      )}
    </div>
  );
}

function WelcomePage() {
  return (
    <header>
      <div className="welcome-message">
        Welcome to OtakuHub, the ultimate destination for all your anime and
        manga tracking needs! Whether you're a seasoned otaku or just starting
        your journey into the world of anime and manga, this platform is
        designed to enhance your experience and connect you with fellow
        enthusiasts. With OtakuHub, you can discover new anime and manga titles,
        add them to your personalized watch list, and keep track of your
        progress. Connect with friends, share recommendations, and explore their
        watch lists to find your next favorite series.
      </div>
      <div className="animation">
        <img src={frieren}></img>
      </div>
      <div className="sign-in">
        <a href="/signup">Sign up</a>&nbsp;or&nbsp;
        <a href="/login">Log in</a>&nbsp;here!
      </div>
    </header>
  );
}

export default HomePage;
