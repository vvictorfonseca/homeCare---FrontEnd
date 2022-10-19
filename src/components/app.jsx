import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import GlobalStyle from "../assets/globalStyle";
import SignIn from "./signIn";
import ClientLogin from "./clientsPage/ClientLogin";
import ProfessionalLogin from "./professionalPage/ProfessionalLogin";
import SignUpClient from "./clientsPage/signUpClient";
import SignUpProfessional from "./professionalPage/signUpProfessinal";
import ProfessionalHomePage from "./professionalPage/ProfessionalHomePage";
import ClientHomePage from "./clientsPage/ClientHomePage";
import RequestJob from "./clientsPage/RequestJob";
import ClientRequests from "./clientsPage/ClientRequests";
import ClientLocation from "./clientsPage/ClientLocation";
import UserContext from "../context/userContext";
import ModalContext from "../context/modalContext";
import EvaluatePage from "./clientsPage/EvaluaionsPage";

function App() {

  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const clientCityStorage = JSON.parse(localStorage.getItem('city'));
  const fullNameStorage = JSON.parse(localStorage.getItem('fullName'));
  const photoStorage = JSON.parse(localStorage.getItem('photo'));

  const [clientToken, setClientToken] = useState(tokenStorage)
  const [clientName, setClientName] = useState(fullNameStorage)
  const [clientPhoto, setClientPhoto] = useState(photoStorage)
  const [clientCity, setClientCity] = useState(clientCityStorage)

  const [requestJobInfo, setRequestJobInfo] = useState([])
  const [type, setType] = useState("")
  const [reload, setReload] = useState(false)

  const professionalTokenStorage = JSON.parse(localStorage.getItem('professionalToken'));
  const professionalFullNameStorage = JSON.parse(localStorage.getItem('professionalFullName'));
  const professionalCityStorage = JSON.parse(localStorage.getItem('professionalCity'));
  const professionalPhotoStorage = JSON.parse(localStorage.getItem('professionalPhoto'));
  const professionalDescriptionStorage = JSON.parse(localStorage.getItem('professinalDescription'));

  const [professionalToken, setProfessionalToken] = useState(professionalTokenStorage)
  const [professionalName, setProfessionalName] = useState(professionalFullNameStorage)
  const [professionalCity, setProfessionalCity] = useState(professionalCityStorage)
  const [professionalPhoto, setProfessionalPhoto] = useState(professionalPhotoStorage)
  const [professionalDescription, setProfessionalDescription] = useState(professionalDescriptionStorage)

  const [refresh, setRefresh] = useState(false)
  const [update, setUpdate] = useState(false)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (professionalDescriptionStorage) {
      setProfessionalDescription(professionalDescriptionStorage)
    }

    if (professionalTokenStorage) {
      setProfessionalToken(professionalTokenStorage)
    }

    if (professionalFullNameStorage) {
      setProfessionalName(professionalFullNameStorage)
    }

    if (professionalCityStorage) {
      setProfessionalCity(professionalCityStorage)
    }

    if (professionalPhotoStorage) {
      setProfessionalPhoto(professionalPhotoStorage)
    }
  }, [update]);


  useEffect(() => {
    if (clientCityStorage) {
      setClientCity(clientCityStorage)
    }

    if (tokenStorage) {
      setClientToken(tokenStorage)
    }

    if (fullNameStorage) {
      setClientName(fullNameStorage)
    }

    if (photoStorage) {
      setClientPhoto(photoStorage)
    }
  }, [update]);

  const contextValue = { clientToken, setClientToken, clientName, setClientName, clientPhoto, setClientPhoto, clientCity, setClientCity, requestJobInfo, setRequestJobInfo, type, setType, reload, setReload, professionalToken, setProfessionalToken, professionalName, setProfessionalName, professionalCity, setProfessionalCity, professionalPhoto, setProfessionalPhoto, refresh, setRefresh, professionalDescription, setProfessionalDescription, update, setUpdate }
  const modalValue = { modalIsOpen, setModalIsOpen }
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ModalContext.Provider value={ modalValue }>
          <UserContext.Provider value={ contextValue }>
            <Routes>
              <Route path={"/"} element={<SignIn />} />
              <Route path="/signUp/professional" element={<SignUpProfessional />} />
              <Route path="/signUp/client" element={<SignUpClient />} />
              <Route path="/sign-in/client" element={<ClientLogin />} />
              <Route path="/sign-in/professional" element={<ProfessionalLogin />} />
              <Route path="/homePage/professional" element={<ProfessionalHomePage />} />
              <Route path="/homePage/client" element={<ClientHomePage />} />
              <Route path="/evaluations/:professionalId" element={<EvaluatePage />} />
              <Route path="/request/job" element={<RequestJob />} />
              <Route path="/requests/client" element={<ClientRequests />} />
              <Route path="/Update/ClientAddress" element={<ClientLocation />} />
            </Routes>
          </UserContext.Provider>
        </ModalContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;