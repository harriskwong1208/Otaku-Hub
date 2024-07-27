import "../styles/Error.css";
import { useNavigate } from "react-router-dom";

export default function Error(props) {
  const navigate = useNavigate("");

  if (props.code == 401) {
    return (
      <div className="ErrorComp">
        <div className="Container">
          <div id="Code">401</div>
          <div id="Message">Invalid Access</div>
          <div className="btnContainer">
            <button onClick={() => navigate("/")}>Back To Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ErrorComp">
      <div className="Container">
        <div id="Code">404</div>
        <div id="Message">Sorry, We couldn't find the page.</div>
        <div className="btnContainer">
          <button onClick={() => navigate("/")}>Back To Home</button>
        </div>
      </div>
    </div>
  );
}
