import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getCurrentUser } from "../auth";
import {apiEndPoints} from "../apiEndpoints";
import { getAnime } from "./Anime";

export  async function getUserIdByEmail(email){
    let users = await axios.get(apiEndPoints.localHost+'users');

    users = users.data.users;
    for(let i =0;i < users.length;i++){
        if(users[i].email == email){
            return users[i];
        }
    }
    return new Error("Cannot find user email in database");
}

export  async function addUserSubId(subId,id){
    await axios.put(apiEndPoints.localHost+'users/' + id,{
        subId: subId
    });
    // await axios.put(apiEndPoints.hostedEndpoint + id,{
    //     subId: subId
    // });
}

export  async function getUserFromCognito(){
    const user = await getCurrentUser();
    return user;
}
//Returns 1 if email exists in database, -1 otherwise
export  async function findEmail(email){
    let users = await axios.get(apiEndPoints.localHost+'users');
    
    users = users.data.users;
    for(let i =0; i < users.length;i++){
        if(users[i].email == email){
            return 1;
        }
    }
    return -1;
}


export async function getCurrentUserId(){
    const user = await getUserFromCognito();
    const subId = user.sub;
    const users = await getAllUsersFromDatabase();
    for(let i of users){
        if(i.subId === subId){
            return i._id;
        }
    }
    return new Error("Error in getting user sub id.")
}

//RETURN ARRAY OF USERS
export async function getAllUsersFromDatabase(){
    let users;
    try{
        users = await axios.get(apiEndPoints.localHost+'users');
    }catch(e){
        console.log(e);
        return new Error("Error while search for users in database");
    }
    return users.data.users;
}

//Check if anime is already in user's watch list
//RETURNS TRUE if anime already in watch list
export async function checkUserWatchList(id,animeId){
    try{
        const response = await axios.get(apiEndPoints.localHost+`users/${id}`);
        const user = response.data.user;
        const found = user.watchList.find(u => u == animeId);
        if(found){
            return true;
        }
    }catch(e){
        console.log(e);
    }
    return false;
}

export async function addAnimeToUser(animeId){
    try{
        const UserId = await getCurrentUserId();
        const response = await axios.put(apiEndPoints.localHost+`users/${UserId}`,{
            "animeId": animeId
        });
        console.log(response);
    }catch(e){
        console.log(e);
        return new Error("Unable to ad anime to user's watch list");
    }
}
export async function getUserWatchList(){
    try{
        const id = await getCurrentUserId();
        const response = await axios.get(apiEndPoints.localHost+`users/${id}`);
        const user = response.data.user;
        const list = user.watchList;
        return list;
    }catch(e){
        console.log(e);
        return new Error("Unable to fetch WatchList");
    }
}

