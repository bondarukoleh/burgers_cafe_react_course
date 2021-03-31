import React, {useState, createContext, useContext, useEffect} from "react";
import {signInRequest, signUpRequest} from "../helpers/api";
import {errorContext} from "./error";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const {errorOccurred} = useContext(errorContext)

  useEffect(() => checkUserAuthState(), [])

  const setLogoutExpirationTime = (expirationTime) => {
    setTimeout(() => {
      // TODO: fix bug with expiration time
      // logoutUserInitiated(dispatch);
    }, 3600 * 1000);
  };

  const checkUserAuthState = () => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      // if (Date.now() > localStorage.getItem('expiresIn')) {
      //   /* logout is token is expired */
      //   // dispatch(logoutUserInitiated)
      // } else {
        const userData = {};
        for (const key of ['idToken', 'kind', 'localId', 'refreshToken', 'expiresIn']) {
          userData[key] = localStorage.getItem(key);
        }
        setUser(userData)
      }
    }

  const loginUser = async (userData, signIn) => {
    try {
      const result = signIn
        ? await signInRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password})
        : await signUpRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password});
      if(result?.data) {
        setUser(result.data)
        // setLogoutExpirationTime(result.expiresIn)
        let {idToken, kind, localId, refreshToken, expiresIn} = result.data;
        expiresIn = expiresIn + Date.now();
        setLocalStorageUserAuthData({idToken, kind, localId, refreshToken, expiresIn});
      } else {
        errorOccurred({message: `Something goes wrong with authentication.`})
      }
    } catch (e) {
      errorOccurred(e)
    }
  }

  const logoutUser = () => {
    localStorage.clear();
    setUser(null)
  }

  const setLocalStorageUserAuthData = (userData) => {
    for (const [key, value] of Object.entries(userData)) {
      localStorage.setItem(key, value)
    }
  }

  return <authContext.Provider value={{user, loginUser, logoutUser}}>
    {children}
  </authContext.Provider>;
}

export default AuthProvider;
