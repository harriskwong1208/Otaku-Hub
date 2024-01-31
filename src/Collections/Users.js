import axios from "axios";
// import { AuthContext } from "../components/AuthContext";
import { getCurrentUser } from "../auth";
import {apiEndPoints} from "../apiEndpoints";

export  async function getUserIdByEmail(email){
    let users = await axios.get(apiEndPoints.localHost);
    // let users = await axios.get(apiEndpoints.hostedEndpoint);

    users = users.data.users;
    for(let i =0;i < users.length;i++){
        if(users[i].email == email){
            return users[i];
        }
    }
    return new Error("Cannot find user email in database");
}

export  async function addUserSubId(subId,id){
    // await axios.put(apiEndPoints.localHost + id,{
    //     subId: subId
    // });
    await axios.put(apiEndPoints.hostedEndpoint + id,{
        subId: subId
    });
}

export  async function getUserFromCognito(){
    const user = await getCurrentUser();
    return user;
}
//Returns 1 if email exists in database, -1 otherwise
export  async function findEmail(email){
    let users = await axios.get(apiEndPoints.localHost);
// let users = await axios.get(apiEndPoints.hostedEndpoint);
    
    users = users.data.users;
    for(let i =0; i < users.length;i++){
        if(users[i].email == email){
            return 1;
        }
    }
    return -1;
}