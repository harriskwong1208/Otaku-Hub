import { useParams } from "react-router-dom";
import "../styles/EditReview.css";
import { useEffect, useState } from "react";
import LoadComponent from "../components/Loading";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import Error from "../components/Error";

export function EditReview() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewDetails, setReviewDetails] = useState();
  const ratingScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  async function loadReview() {
    setLoading(true);
    try {
      const review = await axios.get(apiEndPoints.backEndApi + `review/${id}`);
      if (review) {
        console.log(review?.data.review);
        setReviewDetails(review?.data.review);
      }
    } catch (e) {
      console.log(e);
      setError(e);
      alert("Error loading review.");
    }
  }

  useEffect(() => {
    loadReview().then(setLoading(false)).catch(setLoading(false));
  }, []);

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <LoadComponent />;
  }
  return (
    <div className="editReview">
      <header>Edit Review</header>
      <div className="reviewContainer">
        <label for="reviewRating">Rating: </label>
        <select
          // onChange={(e) => {
          //   setReviewRating(e.target.value);
          // }}
          name="reviewRating"
          id="reviewRating"
        >
          {ratingScale.map((num, index) => {
            return <option value={num}>{num}</option>;
          })}
        </select>
        <label for="addReviewTitle"></label>
        <input
          // onChange={(e) => {
          //   setReviewTitle(e.target.value);
          // }}
          id="addReviewTitle"
          name="addReviewTitle"
          placeholder="Enter a title"
          required
        ></input>
        <label for="reviewText"></label>
        <textarea
          // onChange={(e) => {
          //   setReviewDescription(e.target.value);
          // }}
          required
          id="reviewText"
          name="reviewText"
          placeholder="Enter Review Here."
        ></textarea>
        <div className="reviewButtons">
          <button
            id="reviewSaveBtn"
            //  onClick={}>
          >
            {" "}
            Save
          </button>
          <button
            id="reviewCancelBtn"
            // onClick={() => setEdit(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
