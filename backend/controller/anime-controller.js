const Anime = require("../model/Anime");
require("dotenv").config();

const getAllAnime = async (req, res, next) => {
  let anime;

  anime = await Anime.find();
  if (!anime) {
    return res.status(500).json({ message: "Internal; Server Error." });
  }

  return res.status(200).json({ anime });
};

const getAnimeById = async (req, res, next) => {
  const id = req.params.id;
  let anime;
  try {
    anime = await Anime.findById(id);
  } catch (e) {
    return next(e);
  }
  if (!anime) {
    return res.status(404).json({ message: "Anime not found." });
  }
  return res.status(200).json({ anime });
};

//id = anime id from database
//reviewId = review id from database
const addReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  // const str_reviewId = String(reviewId);
  let anime;
  try {
    anime = await Anime.findByIdAndUpdate(
      id,
      {
        $push: {
          reviews: reviewId,
        },
      },
      { new: true }
    );
  } catch (e) {
    return next(e);
  }
  if (!anime) {
    return res.status(500).json({ message: "Unable to update anime." });
  }
  return res.status(200).json({ message: "Updated successfully" });
};

const addAnime = async (req, res, next) => {
  const {
    name,
    mal_id,
    imageUrl,
    aired,
    demographic,
    studio,
    episodes,
    source,
    malLink,
    score,
    imageUrlLarge,
    imageUrlSmall,
  } = req.body;
  let anime;
  try {
    anime = new Anime({
      name,
      mal_id,
      imageUrl,
      aired,
      demographic,
      studio,
      episodes,
      source,
      malLink,
      score,
      imageUrlLarge,
      imageUrlSmall,
    });
    anime = await anime.save();
  } catch (e) {
    return next(e);
  }
  if (!anime) {
    return res.status(500).json({ message: "Unable to save." });
  }
  return res.status(201).json({ anime });
};
exports.addReview = addReview;
exports.addAnime = addAnime;
exports.getAnimeById = getAnimeById;
exports.getAllAnime = getAllAnime;
