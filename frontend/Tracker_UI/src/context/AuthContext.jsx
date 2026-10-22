import { createContext,useContext,useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [accessToken,setAccessToken] = useState(null);
    
    const login = (data)=> setAccessToken(data.access);

    const logout=()=> setAccessToken(null);

    const isAuthenticated =  Boolean(accessToken);

    return (

        <AuthContext.Provider
        value={{accessToken,login,logout,isAuthenticated}}
        >
            {children}
        </AuthContext.Provider>
    )   
}


export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside an AuthProvider");
    }

    return context;

}