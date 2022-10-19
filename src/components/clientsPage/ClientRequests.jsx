import { useContext, useEffect, useState } from "react";

import axios from "axios"
import styled from 'styled-components';

import Header from "./Header";
import ClientRequestBox from "./ClientRequestBox";

import UserContext from "../../context/userContext";

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
        const URL = "https://home-care-app.herokuapp.com/jobs/client"

        const promise =  axios.get(URL, config)

        promise.then(response => {
            const { data } = response
            setClientJobsData(data)
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
                            
                            <NoData>
                                    <h1>Você não possui pedidos cadastrados</h1>
                            </NoData>
                        
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
    //width: 100vw;
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
        width: 185px;
        height: 185px;
        border-radius: 50%;
        border: solid 2px #1b1b1b;
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
    margin: 0px auto;
    width: 65vw;
    //height: 100%;;
    border-left: solid 0.5px #4e4e4e;
    border-right: solid 0.5px #4e4e4e;
    //background-color: green;
`
const H1 = styled.div`
    margin-left: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64.60vw;
    height: 20vh;
    background-color: #333333;
    color: white;

    h1 {
        font-size: 35px;
    }
`

const NoData = styled.div`
    margin: 90px  auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40vw;
    height: 20vh;
    background-color: #55a381;
    color: white;
    border-radius: 8px;
    
    h1 {
        margin: auto auto;
        font-size: 20px;
    }
`

export default ClientRequests