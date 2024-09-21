import { createContext, useState } from "react";

export let userContext = createContext();

export default function userContextProvider(props) {

    const [userLogin, setuserLogin] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
    )

    return <userContext.Provider value={{ userLogin, setuserLogin }}>

        {props.children}
    </userContext.Provider>

}