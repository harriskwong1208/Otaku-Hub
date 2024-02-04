const express = require("express");
const {getAnimeById , addAnime} = require('../controller/anime-controller');
const AnimeRouter = express.Router();

AnimeRouter.get('/:id',getAnimeById);
AnimeRouter.post('/',addAnime);

module.exports = AnimeRouter;