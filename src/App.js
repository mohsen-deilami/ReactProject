/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes";
import AuthContext from "./Context/authContetxt";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState();
  const [userInfos, setUserinfos] = useState();

  const login = (userInfos, token) => {
    setToken(token);
    setIsLogin(true);
    setUserinfos(userInfos);
    localStorage.setItem("user", JSON.stringify({token}));
   
  };
  
  const logout =useCallback( () => {
    setToken(null);
    setIsLogin(false);
    setUserinfos({});
    localStorage.removeItem("user");
  },[]);

  useEffect(() => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  if (localStorageData) {
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
       setIsLogin(true)
       setUserinfos(userData)
      });
  }
}, [token]);

  const router = useRoutes(routes);
  return (
    <AuthContext.Provider value={{isLogin, token, userInfos ,login , logout}}>
      {router}
    </AuthContext.Provider>
  );
}

export default App;
