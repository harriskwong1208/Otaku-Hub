import "../styles/Error.css";
export function Error(props) {

  if (props.type == "NotLoggedIn") {
    return (
    <div className={props.type}>
      <h1>
        Invalid Access !!!
      </h1>
      <div className="btnContainer">
        <button ><a href="/login">Sign In Here!</a></button>
      </div>
    </div>)
  }
}
