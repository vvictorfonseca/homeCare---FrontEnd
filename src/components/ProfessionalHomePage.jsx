import styled from 'styled-components';
import axios from "axios"
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from './context/userContext';

import ProfessionalHeader from "./ProfessionalHeader"
import ProfessionalRequestBox from './ProfessionalRequestJob';

function ProfessionalHomePage() {

    const navigate = useNavigate()

    const { professionalToken, professionalName, professionalCity, professionalPhoto, refresh, setRefresh, professionalDescription } = useContext(UserContext)
    
    const [professionalJobsData, setProfessionalJobsData] = useState([])
    
    const config = {
        headers: {
            Authorization: `Bearer ${professionalToken}`
        }
    }

    useEffect(() => {
        getProfessionalJobs()
    }, [refresh]);

    function getProfessionalJobs() {
        const URL = "http://localhost:5000/jobs/professional"

        const promise = axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            console.log("professionalJobs", data)
            setProfessionalJobsData(data)
        })
        promise.catch(err => {
            alert("Não foi possível pegar seus pedidos")
        })
    }

    return (
        <Container>
            <ProfessionalHeader />

            <ProfileSidebar>
                <ContainerInfos>
                    <img src={professionalPhoto} ></img>
                    <p>{professionalName}</p>
                    <p>{professionalCity}</p>
                    <p>{professionalDescription}</p>

                    <button onClick={() => {
                        navigate("/professional/description")
                    }}> Update Description </button>
                </ContainerInfos>
            </ProfileSidebar>

            <Body>
                <H1>
                    <h1>Aqui estão as reservas feitas por clientes</h1>
                    <h2>Aceite a requisição para confirmar o serviço</h2>
                </H1>

                <>
                    {
                        professionalJobsData.length === 0 ? (
                            <p>Você não possui reservas</p>
                        ) : (
                            professionalJobsData.map((info, index) => {
                                return (<ProfessionalRequestBox key={index} {...info}  ></ProfessionalRequestBox>)
                            })
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
    //background-color: #d41e1e;
    width: 14vw;

    img {
        margin: 25px auto 0px auto;
        width: 191px;
        height: 191px;
        border-radius: 50%;
        border: solid 2px #413f3f;
    }

    p {
        font-size: 18px;
        color: white;
        margin-top: 10px;
        font-weight: 700;
    }

    p:nth-child(3) {
        font-size: 14px;
        color: #d8d8d8;
        margin-top: 5px;
        font-weight: 300;
    }

    p:last-of-type {
        font-size: 14px;
        color:white;
        margin-top: 25px;
        font-weight: 300;
    }

    textarea {
        margin: 15px auto;
        width: 14vw;
        height: 15vh;
        
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
    //height: 100%;
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

export default ProfessionalHomePage