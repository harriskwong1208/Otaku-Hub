const express = require("express");
const {getAnimeById , addAnime,getAllAnime} = require('../controller/anime-controller');
const AnimeRouter = express.Router();

AnimeRouter.get('/:id',getAnimeById);
AnimeRouter.post('/',addAnime);
AnimeRouter.get('/',getAllAnime);

module.exports = AnimeRouter;