import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalStyle from "../assets/globalStyle";
import SignIn from "./signIn";
import SignUpClient from "./signUpClient";
import SignUpProfessional from "./signUpProfessinal";

import UserContext from "./context/userContext";

//pro = professional

function App() {

    const [clientData, setClientData] = useState({})
    const [proData, setProData] = useState({});

    const contextValue = { clientData, setClientData, proData, setProData }

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path={"/"} element={<SignIn />} />
                        <Route path="/signUp/professional" element={<SignUpProfessional />} />
                        <Route path="/signUp/client" element={<SignUpClient />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;