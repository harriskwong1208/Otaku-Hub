const express = require("express");
const {getMangaById , addManga,getAllManga} = require('../controller/manga-controller');
const MangaRouter = express.Router();

MangaRouter.get('/:id',getMangaById);
MangaRouter.post('/',addManga);
MangaRouter.get('/',getAllManga);

module.exports = MangaRouter;