const User = require("../model/User");
// const { param } = require("../routes/user-routes");

require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  let users;

  users = await User.find().select(
    "name email watchList subId friends mangaList imageUrl userName fav_anime fav_manga fav_character bio"
  );
  if (!users) {
    return res.status(500).json({ message: "Internal; Server Error." });
  }

  return res.status(200).json({ users });
};

const addUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  let user;
  try {
    user = new User({
      userName,
      email,
      password,
    });
    user = await user.save();
  } catch (e) {
    return next(e);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(201).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    email,
    password,
    subId,
    watchItem,
    friendId,
    mangaItem,
    imageUrl,
    userName,
    fav_anime,
    fav_manga,
    fav_character,
    bio,
  } = req.body;

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      subId,
      imageUrl,
      userName,
      bio,
      fav_anime,
      fav_manga,
      fav_character,
      $push: {
        watchList: watchItem,
        mangaList: mangaItem,
        friends: friendId,
      },
    });
  } catch (e) {
    return next(e);
  }
  if (!user) {
    return res.status(500).json({ msessage: "Unable to update user." });
  }
  return res.status(200).json({ message: "Updated successfully" });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (e) {
    return next(e);
  }
  if (!user) {
    return res.status(500), json({ msessage: "Unable to delete user." });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id).select(
      "name email watchList friends subId mangaList imageUrl userName bio fav_anime fav_manga fav_character"
    );
  } catch (e) {
    return next(e);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to find user." });
  }
  return res.status(200).json({ user });
};

const removeManga = async (req, res, next) => {
  const { id, mangaId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $pull: { mangaList: mangaId },
    });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Removed manga!" });
  } catch (e) {
    return next(e);
  }
};

const removeAnime = async (req, res, next) => {
  const { id, animeId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $pull: { watchList: animeId },
    });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Removed Anime!" });
  } catch (e) {
    return next(e);
  }
};
const updateUserList = async (req, res, next) => {
  const { id, animeId } = req.params;

  const { rating, status } = req.body;

  try {
    // Find the user by id
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the array inside watchList that has the matching animeId
    const index = user.watchList.findIndex((item) => item[0] === animeId);

    if (index === -1) {
      return res.status(404).json({ message: "Anime not found in watch list" });
    }

    // Update the rating and status of the found array
    user.watchList[index] = [animeId, rating, status];

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};
const updateUserMangaList = async (req, res, next) => {
  const { id, mangaId } = req.params;

  const { rating, status } = req.body;

  try {
    // Find the user by id
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the array inside watchList that has the matching animeId
    const index = user.mangaList.findIndex((item) => item[0] === mangaId);

    if (index === -1) {
      return res.status(404).json({ message: "Manga not found in watch list" });
    }

    // Update the rating and status of the found array
    user.mangaList[index] = [mangaId, rating, status];

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return next(error);
  }
};
exports.updateUserMangaList = updateUserMangaList;

exports.updateUserList = updateUserList;
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.removeManga = removeManga;
exports.removeAnime = removeAnime;
