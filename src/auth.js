import {CognitoUserPool, CognitoUser, AuthenticationDetails,} from "amazon-cognito-identity-js"
  import { cognitoConfig } from "./cognitoConfig"
  
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
  })
  
  export function signUp(username, email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(
          username,
          password,
          [{ Name: "email", Value: email }],
          null,
          (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result.user)
          }
        )
      })
  }
  
  export function confirmSignUp(username, code) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        })
    
        cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
  }
  
  export function signIn(username, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
          Username: username,
          Password: password,
        })
    
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        })
    
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result)
          },
          onFailure: (err) => {
            reject(err)
          },
        })
      })
  }
  
  export function forgotPassword(username) {
    // Forgot password implementation
  }
  
  export function confirmPassword(username, code, newPassword) {
    // Confirm password implementation
  }
  
  export function signOut() {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
    }
  }
  
  //checks if there's a currently authenticated user. If so, it fetches the user's session and attributes, 
  // converting the attributes into a more convenient JavaScript object. 
  //This object contains the user's username, email, and sub (user's unique id)
 // Can now use this function in any component that needs to fetch user's id
  export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()
    
        if (!cognitoUser) {
          reject(new Error("No user found"))
          return
        }
    
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(err)
            return
          }
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err)
              return
            }
            const userData = attributes.reduce((acc, attribute) => {
              acc[attribute.Name] = attribute.Value
              return acc
            }, {})
    
            resolve({ ...userData, username: cognitoUser.username })
          })
        })
      })
  }
  
  //Retuns an object that contains user's access and id tokens
  //See below for example to make authenticatedrequests to server

  export function getSession() {
    const cognitoUser = userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error("No user found"))
        return
      }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
          return
        }
        resolve(session)
      })
    })
  }

//Example code from getSession()
//********************************************************* */
// const session = await getSession()
// const accessToken = session.accessToken
// fetch("/api/protected", {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })