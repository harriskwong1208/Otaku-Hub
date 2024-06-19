const express = require("express");
const {
  getAnimeById,
  addAnime,
  getAllAnime,
  addReview,
} = require("../controller/anime-controller");
const Anime = require("../model/Anime");
const AnimeRouter = express.Router();

AnimeRouter.get("/:id", getAnimeById);
AnimeRouter.post("/", addAnime);
AnimeRouter.get("/", getAllAnime);
AnimeRouter.post("/:id/:reviewId", addReview);
module.exports = AnimeRouter;
