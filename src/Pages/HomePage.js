import "../styles/HomePage.css";
import LoadComponent from "../components/Loading";
import frieren from "../static/frieren.gif";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { apiEndPoints } from "../apiEndpoints";
import { getUserWatchList, getUserMangaList } from "../Collections/Users";
import axios from "axios";
function HomePage() {
  document.body.style = "background: #10131f;";
  const { user } = useContext(AuthContext);
  //Array of anime and their data
  const [upcomingAnime, setUpcomingAnime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [recentAnime, setRecentAnime] = useState();
  const [recentManga, setRecentManga] = useState();
  const [topAnime, setTopAnime] = useState();
  const [topManga, setTopManga] = useState();
  const [error, setError] = useState();
  async function getData() {
    try {
      const topAnimeResponse = await axios.get(apiEndPoints.topUpcomingAnime);
      setUpcomingAnime(topAnimeResponse.data.data);
      const recentAnime = await getUserWatchList();
      setRecentAnime(recentAnime);
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

  return (
    <div className="homepage">{!user ? <WelcomePage /> : <DashBoard />}</div>
  );
}
function DashBoard() {
  return <div className="recent-events">Recent events</div>;
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
