import "../styles/Error.css";
import {useNavigate} from "react-router-dom";

export default function Error() {
  const navigate = useNavigate("");
  return (
    <div className="ErrorComp">
      <div className="Container">
        <div id="Code">
          404
        </div>
        <div id="Message">
          Sorry, We couldn't find the page.
        </div>
        <div className="btnContainer">
          <button onClick={()=>navigate("/")}>Back To Home</button>
        </div>
      </div>
    </div>
  )
}
