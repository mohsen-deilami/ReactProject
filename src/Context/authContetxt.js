import { createContext } from "react";

const AuthContext=createContext({
    isLogin:false,
    token:null,
    userInfos:null,
    login:()=>{},
    logout:()=>{}
});
export default AuthContext