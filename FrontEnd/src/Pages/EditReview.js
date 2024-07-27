import { useParams } from "react-router-dom";
import "../styles/EditReview.css";
import { useEffect, useState } from "react";
import LoadComponent from "../components/Loading";
import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";
import Error from "../components/Error";
import { getCurrentUserId } from "../Collections/Users";

export function EditReview() {
  const { id } = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [reviewDetails, setReviewDetails] = useState();
  const ratingScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [rating, setRating] = useState();

  async function loadReview() {
    try {
      const review = await axios.get(apiEndPoints.backEndApi + `review/${id}`);
      if (review) {
        const currUser = await getCurrentUserId();
        if (review?.data.review.user != currUser) {
          setError(401);
        }
        setTitle(review?.data.review.title);
        setDescription(review?.data.review.description);
        setRating(review?.data.review.rating);
      }
    } catch (e) {
      console.log(e);
      setError(404);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadReview()
      .then(() => {
        setLoading(false);
      })
      .catch(setLoading(false));
  }, []);

  if (error) {
    return <Error code={error} />;
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
          onChange={(e) => {
            setRating(e.target.value);
          }}
          name="reviewRating"
          id="reviewRating"
        >
          {ratingScale.map((num, index) => {
            if (num == rating) {
              return (
                <option selected value={num}>
                  {num}
                </option>
              );
            }
            return <option value={num}>{num}</option>;
          })}
        </select>
        <label for="ReviewTitle"></label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          id="ReviewTitle"
          name="ReviewTitle"
          placeholder="Enter a title"
          required
          value={title}
        ></input>
        <label for="reviewText"></label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
          id="reviewText"
          name="reviewText"
          placeholder="Enter Review Here."
          value={description}
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
