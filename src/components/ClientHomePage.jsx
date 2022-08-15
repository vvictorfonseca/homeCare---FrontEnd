import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import styled from 'styled-components';

import Header from "./Header";
import ProfessionalBox from "./professionalBox";

import UserContext from "./context/userContext";

function ClientHomePage() {

    const { clientName, clientPhoto, clientCity, type, setType } = useContext(UserContext)
    const { clientToken } = useContext(UserContext)

    const [infoGarden, setInfoGarden] = useState([])
    const [infoCleaning, setInfoCleaning] = useState([])
    const [infoEletrical, setInfoEletrical] = useState([])

    const config = {
        headers: {
            Authorization: `Bearer ${clientToken}`
        }
    }

    useEffect(() => {
        getGandenProfessionals()
        getCleaningProfessionals()
        getEletricalProfessionals()
    }, []);

    function getGandenProfessionals() {
        const URL = "http://localhost:5000/professionals/garden"

        const promise = axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            console.log("garden", data)
            setInfoGarden(data)
        })
        promise.catch(err => {
            alert("Não foi possível pegar os profissionais de jardinagem")
        })
    }

    function getCleaningProfessionals() {
        const URL = "http://localhost:5000/professionals/cleaning"

        const promise = axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            console.log("cleaning", data)
            setInfoCleaning(data)
        })
        promise.catch(err => {
            alert("Não foi possível pegar os profissionais de eletricidade")
        })
    }

    function getEletricalProfessionals() {
        const URL = "http://localhost:5000/professionals/electricalService"

        const promise = axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            console.log("electrical", data)
            setInfoEletrical(data)
        })
        promise.catch(err => {
            alert("Não foi possível pegar os profissionais de limpeza")
        })
    }

    return (
        <Container>
            <Header />

            <ProfileSidebar>
                <ContainerInfos>
                    <img src={clientPhoto} ></img>
                    <p>{clientName}</p>
                    <p>{clientCity}</p>

                    <button>Change Location</button>
                </ContainerInfos>
            </ProfileSidebar>

            <Body>

                <H1>
                    <h1>Tudo pra facilitar seu dia a dia</h1>
                    <h2>Escolha o tipo de serviço que está procurando</h2>
                </H1>

                <>
                    {
                        type === "" ? (

                            <Boxtypes>
                                <BoxType onClick={() => setType("garden")}> <h1>Garden</h1> </BoxType>

                                <BoxType onClick={() => setType("cleaning")}> <h1>Cleaning</h1> </BoxType>

                                <BoxType onClick={() => setType("eletrical")}> <h1>EletricalService</h1> </BoxType>
                            </Boxtypes>

                        ) : type === "garden" ? (

                            infoGarden.length === 0 ? (
                                <h1>Não possui profissionais dessa categoria na sua Região</h1>
                            
                            ) : (

                                infoGarden.map((info, index) => {
                                    return (<ProfessionalBox key={index} {...info}></ProfessionalBox>)
                                })
                            )

                        ) : type === "cleaning" ? (
                            infoCleaning.map((info, index) => {
                                return (<ProfessionalBox key={index} {...info}></ProfessionalBox>)
                            })
                        ) : type === "eletrical" ?(
                            infoEletrical.map((info, index) => {
                                return (<ProfessionalBox key={index} {...info}></ProfessionalBox>)
                            })
                        ) : (
                            <></>
                        )
                    }
                </>

            </Body>

        </Container>
    )
}

const Container = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    background-color: #333333;
`
const ProfileSidebar = styled.div`
    margin-top: 19vh;
    width: 17.5vw;
    //height: 100vh;
    position:fixed;
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    //background-color: white;
    width: 14vw;
    //height: 100vh;

    img {
        margin-top: 25px;
        width: 14vw;
        height: 30vh;
        border-radius: 50%;
        border: solid 1.5px #413f3f;
    }

    p {
        font-size: 18px;
        color: white;
        margin-top: 10px;
        font-weight: 700;
    }

    p:last-of-type {
        font-size: 14px;
        color:white;
        margin-top: 5px;
        font-weight: 300;
    }

    button {
        margin-left: 13px;
        width: 12vw;
        height: 5vh;
        margin-top: 25px;
        border: none;
        border-radius: 8px;
        color: white;
        background-color: #9b9b9b;
        cursor: pointer;
    }
`
const Body = styled.div`
    margin: auto auto;
    width: 65vw;
    //height: 100vh;
    border-left: solid 0.5px #4e4e4e;
    border-right: solid 0.5px #4e4e4e;
    //background-color: yellow;
    margin-top: 125px;
`
const H1 = styled.div`
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //margin-top: 22vh;
    width: 64.60vw;
    height: 20vh;
    background-color: #333333;
    color: white;
    margin-top: 20px;
    h1 {
        font-size: 35px;
    }

    h2 {
        font-size: 15px;
        margin-top: 8px;
    }
`
const Boxtypes = styled.div`
    display: flex;
    justify-content: space-around;
    width: 65vw;
    height: 100%;
    margin-top: 5px;
`
const BoxType = styled.div`
    background-color: #55a381;
    margin-top: 40px;
    border-radius: 10px;
    width: 20.5vw;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    h1 {
        color:  #333333;
        font-size: 30px;
    }
`

export default ClientHomePage