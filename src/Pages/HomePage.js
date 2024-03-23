import "../styles/HomePage.css";
import LoadComponent from "../components/Loading";
import frieren from "../static/frieren.gif";

function HomePage() {
  document.body.style = "background: #10131f;";

  return (
    <div className="homepage">
      <header>
        <div className="welcome-message">
          Welcome to OtakuHub, the ultimate destination for all your anime and
          manga tracking needs! Whether you're a seasoned otaku or just starting
          your journey into the world of anime and manga, this platform is
          designed to enhance your experience and connect you with fellow
          enthusiasts. With OtakuHub, you can discover new anime and manga
          titles, add them to your personalized watch list, and keep track of
          your progress. Connect with friends, share recommendations, and
          explore their watch lists to find your next favorite series.
        </div>
        <div className="animation">
          <img src={frieren}></img>
        </div>
        <div className="sign-in">
          <a href="/signup">Sign up</a>&nbsp;or&nbsp;
          <a href="/login">Log in</a>&nbsp;here!
        </div>
      </header>
    </div>
  );
}

export default HomePage;
