import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";

//user = userId from database
async function createReview(title, user, rating, description) {
  let review;
  try {
    review = await axios.post(apiEndPoints.backEndApi + `review/`, {
      title: title,
      user: user,
      rating: rating,
      description: description,
    });
  } catch (e) {
    return new Error(e);
  }
  if (!review) {
    return new Error("Unable to add review");
  }
  return review;
}

//id = review id from database
async function getReview(id) {
  let review;
  try {
    review = await axios.get(apiEndPoints.backEndApi + `review/${id}`);
    if (!review) {
      return new Error("Unable to retrieve review");
    }
    return review;
  } catch (e) {
    return new Error(e);
  }
}

export { createReview, getReview };
