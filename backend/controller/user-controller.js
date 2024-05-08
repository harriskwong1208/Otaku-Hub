const User = require("../model/User");

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
    animeId,
    friendId,
    mangaId,
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
        watchList: animeId,
        mangaList: mangaId,
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
exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.removeManga = removeManga;
exports.removeAnime = removeAnime;
