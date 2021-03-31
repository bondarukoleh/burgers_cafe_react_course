import React, {useState, createContext, useContext} from "react";
import {signInRequest, signUpRequest} from "../helpers/api";
import {errorContext} from "./error";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const {errorOccurred} = useContext(errorContext)

  const setLogoutExpirationTime = (expirationTime) => {
    setTimeout(() => {
      // TODO: fix bug with expiration time
      // logoutUserInitiated(dispatch);
    }, 3600 * 1000);
  };

  const checkUserAuthState = async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      if (Date.now() > localStorage.getItem('expiresIn')) {
        /* logout is token is expired */
        // dispatch(logoutUserInitiated)
      } else {
        const userData = {};
        for (const key of ['idToken', 'kind', 'localId', 'refreshToken', 'expiresIn']) {
          userData[key] = localStorage.getItem(key);
        }
        // dispatch(authenticateUser(userData))
      }
    }
  }

  const loginUser = async (userData, signIn) => {
    try {
      const result = signIn
        ? await signInRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password})
        : await signUpRequest.post('',{returnSecureToken: true, email: userData.email, password: userData.password});
      if(result?.data) {
        setUser(result.data)
        setLogoutExpirationTime(result.expiresIn)
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

  const setLocalStorageUserAuthData = (userData) => {
    for (const [key, value] of Object.entries(userData)) {
      localStorage.setItem(key, value)
    }
  }

  return <authContext.Provider value={{user, loginUser}}>
    {children}
  </authContext.Provider>;
};

export default AuthProvider;
