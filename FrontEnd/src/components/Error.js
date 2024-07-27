import "../styles/Error.css";
import { useNavigate } from "react-router-dom";

export default function Error(props) {
  const navigate = useNavigate("");

  return (
    <div className="ErrorComp">
      <div className="Container">
        <div id="Code">{props.code}</div>
        <div id="Message">
          {" "}
          {props.code == 401
            ? "Invalid Access"
            : "Sorry, We couldn't find the page."}
        </div>
        <div className="btnContainer">
          <button onClick={() => navigate("/")}>Back To Home</button>
        </div>
      </div>
    </div>
  );
}
