import axios from "axios";
import { apiEndPoints } from "../apiEndpoints";

//user = userId from database
async function createReview(title, user, rating, description) {
  let review;
  try {
    review = await axios.post("/", {
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

export { createReview };
