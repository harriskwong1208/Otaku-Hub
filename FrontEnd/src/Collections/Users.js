import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getCurrentUser } from "../auth";
import { apiEndPoints } from "../apiEndpoints";
import { getAnime } from "./Anime";

export async function getUserIdByEmail(email) {
  let users = await axios.get(apiEndPoints.backEndApi + "users");

  users = users.data.users;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      return users[i];
    }
  }
  return new Error("Cannot find user email in database");
}

export async function addUserSubId(subId, id) {
  await axios.put(apiEndPoints.backEndApi + "users/" + id, {
    subId: subId,
  });
  // await axios.put(apiEndPoints.hostedEndpoint + id,{
  //     subId: subId
  // });
}

export async function getUserFromCognito() {
  const user = await getCurrentUser();
  return user;
}
//Returns 1 if email exists in database, -1 otherwise
export async function findEmail(email) {
  let users = await axios.get(apiEndPoints.backEndApi + "users");

  users = users.data.users;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      return 1;
    }
  }
  return -1;
}

export async function getCurrentUserId() {
  try {
    const user = await getUserFromCognito();

    const subId = user.sub;
    const users = await getAllUsersFromDatabase();
    for (let i of users) {
      if (i.subId === subId) {
        return i._id;
      }
    }
  } catch (e) {
    console.log("Error in getting user sub id.");

    return new Error(e);
  }
}

//RETURN ARRAY OF USERS
export async function getAllUsersFromDatabase() {
  let users;
  const endpoint = apiEndPoints.backEndApi + "users";
  try {
    users = await axios.get(endpoint);
  } catch (e) {
    console.log(e);
    return new Error("Error while search for users in database");
  }
  return users.data.users;
}

//Check if anime is already in user's watch list
//RETURNS TRUE if anime already in watch list
export async function checkUserWatchList(id, animeId) {
  try {
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const found = user.watchList.find((u) => u[0] == animeId);
    if (found) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

//Check if anime is already in user's watch list
//RETURNS anime if anime already in watch list
export async function checkAndReturnAnimeFromWatchList(id, animeId) {
  try {
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const found = user.watchList.find((u) => u[0] == animeId);
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

//Check if anime is already in user's watch list
//RETURNS array if manga already in manga list
export async function checkAndReturnMangaFromWatchList(id, mangaId) {
  try {
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const found = user.mangaList.find((u) => u[0] == mangaId);
    if (found) {
      return found;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function addAnimeToUser(animeId) {
  try {
    const UserId = await getCurrentUserId();
    const response = await axios.put(
      apiEndPoints.backEndApi + `users/${UserId}`,
      {
        animeId: animeId,
      }
    );
    console.log(response);
  } catch (e) {
    console.log(e);
    return new Error("Unable to ad anime to user's watch list");
  }
}
//Get current user's watch list
//Returns [[title,rating,status],...]
export async function getUserWatchList() {
  try {
    const id = await getCurrentUserId();
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const list = user.watchList;
    return list;
  } catch (e) {
    console.log(e);
    return new Error("Unable to fetch WatchList");
  }
}

//Get currentlly logged in user's friends list
export async function getFriendsFromUser() {
  try {
    const id = await getCurrentUserId();
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const list = user.friends;

    return list;
  } catch (e) {
    console.log(e);
    return new Error("Unable to fetch WatchList");
  }
}

export async function addFriendToUser(friendId) {
  try {
    //check if friend is already in user's list
    const friends = await getFriendsFromUser();
    // console.log('Friends: ')
    // console.log(friends);
    if (friends.includes(friendId)) {
      alert("Already added!");
      return;
    }
    const currUserId = await getCurrentUserId();
    //Add to user's friends list
    const response = await axios.put(
      apiEndPoints.backEndApi + "users/" + currUserId,
      {
        friendId: friendId,
      }
    );
    console.log(response);
    alert("Added Friend!");
  } catch (e) {
    console.log(e);
    return new Error("Error in adding friend.");
  }
}
//Returns currentlly logged in user object from database
export async function getCurrentUserDatabase() {
  const user = await getUserFromCognito();
  const subId = user.sub;
  const users = await getAllUsersFromDatabase();
  for (let i of users) {
    if (i.subId === subId) {
      return i;
    }
  }
  return new Error("Error in getting user.");
}

//Check if manga is already in user's manga list
//RETURNS TRUE if manga already in manga list
export async function checkUserMangaList(id, mangaId) {
  try {
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const found = user.mangaList.find((u) => u[0] == mangaId);
    if (found) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

//Get current user's manga list
export async function getUserMangaList() {
  try {
    const id = await getCurrentUserId();
    const response = await axios.get(apiEndPoints.backEndApi + `users/${id}`);
    const user = response.data.user;
    const list = user.mangaList;
    return list;
  } catch (e) {
    console.log(e);
    return new Error("Unable to fetch MangaList");
  }
}
// Input array of user Ids from user's friendslist
// Returns array of information of each user
export async function getFriends(friends) {
  let _friends = [];
  for (let i of friends) {
    let data = await axios.get(apiEndPoints.backEndApi + "users/" + i);
    _friends.push(data.data.user.name);
  }
  return _friends;
}
//Remove manga from user's list
// Inputs: userId and mangaId from Mongo
export async function deleteManga(id, mangaId) {
  try {
    const response = await axios.put(
      apiEndPoints.backEndApi + "users/manga/" + id + "/" + mangaId
    );
    console.log(response);
    alert("Removed manga !");
  } catch (e) {
    console.log(e);
    return new Error("Error in deleting manga");
  }
}

//Remove anime from user's list
// Inputs: userId and animeId from Mongo
export async function deleteAnime(id, animeId) {
  try {
    const response = await axios.put(
      apiEndPoints.backEndApi + "users/anime/" + id + "/" + animeId
    );
    console.log(response);
    alert("Removed anime !");
  } catch (e) {
    console.log(e);
    return new Error("Error in deleting manga");
  }
}
