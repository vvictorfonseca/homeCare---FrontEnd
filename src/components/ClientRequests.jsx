import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import styled from 'styled-components';

import Header from "./Header";
import ClientRequestBox from "./ClientRequestBox";

import UserContext from "./context/userContext";

function ClientRequests() {

    const { clientName, clientPhoto, clientCity, type, setType, reload } = useContext(UserContext)
    const { clientToken } = useContext(UserContext)

    const [clientJobsData, setClientJobsData] = useState([])

    const config = {
        headers: {
            Authorization: `Bearer ${clientToken}`
        }
    }

    useEffect(() => {
        getClientJobs()
    }, [reload]);

    function getClientJobs() {
        const URL = "http://localhost:5000/jobs/client"

        const promise =  axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            setClientJobsData(data)
            console.log("clientJobs", data)
        })
        promise.catch(err => {
            alert("Não foi possível pegar seus pedidos")
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
                </ContainerInfos>
            </ProfileSidebar>

            <Body>
                <H1>
                    <h1>Seus pedidos</h1>
                </H1>

                <>
                    {
                        clientJobsData.length === 0 ? (
                            <p>Você não possui pedidos cadastrados</p>
                        ) : (

                        clientJobsData.map((jobInfo, index) => {
                            return (<ClientRequestBox key={index} {...jobInfo}></ClientRequestBox>)
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
    height: 100%;
    position:fixed;
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    //background-color: white;
    width: 14vw;
    height: 100%;

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
`
const Body = styled.div`
    margin: auto auto;
    width: 65vw;
    height: 100%;
    border-left: solid 0.5px #4e4e4e;
    border-right: solid 0.5px #4e4e4e;
`
const H1 = styled.div`
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 22vh;
    width: 64.60vw;
    height: 20vh;
    background-color: #333333;
    color: white;

    h1 {
        font-size: 35px;
    }
`

export default ClientRequests