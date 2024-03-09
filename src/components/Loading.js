import "ldrs/ring";
import { dotStream } from "ldrs";
import "../styles/LoadComponent.css";
export default function LoadComponent() {
  dotStream.register();

  return (
    <div className="LoadingScreen">
      <div className="LoadingBlock">
        <div className="Message">Just a Moment</div>
        <div className="animation">
          <l-dot-stream size="120" speed="2.5" color="black"></l-dot-stream>
        </div>
      </div>
    </div>
  );
}
