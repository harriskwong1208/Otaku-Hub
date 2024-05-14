const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
  removeManga,
  removeAnime,
  updateUserList,
} = require("../controller/user-controller");

const UserRouter = express.Router();

UserRouter.get("/", getAllUsers);
UserRouter.post("/", addUser);
UserRouter.put("/:id", updateUser);
UserRouter.delete("/:id", deleteUser);
UserRouter.get("/:id", getUser);
UserRouter.put("/manga/:id/:mangaId", removeManga);
UserRouter.put("/anime/:id/:animeId", removeAnime);
UserRouter.put("/anime/update/:id/:animeId", updateUserList);

module.exports = UserRouter;
