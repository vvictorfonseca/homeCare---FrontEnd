import { useEffect, useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../context/userContext";
import EvaluationBox from "../clientsPage/EvaluationBox";
import ProfessionalHeader from "./ProfessionalHeader";

function EvaluationsPage() {

  const { professionalToken, professionalName, professionalCity, professionalPhoto, professionalId, professionalDescription, update, setUpdate } = useContext(UserContext)
  const [evaluations, setEvaluations] = useState([])
  console.log("evaluation", evaluations)

  useEffect(() => {
    getEvaluations()
  }, [])

  const config = {
    headers: {
        Authorization: `Bearer ${professionalToken}`
    }
}

  function getEvaluations() {
    const URL = `https://home-care-app.herokuapp.com/evaluations/${professionalId}`

    const promise = axios.get(URL, config)
    promise.then(response => {
      const { data } = response
      setEvaluations(data)
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Container>
      <ProfessionalHeader />

      <ProfileSidebar>
        <ContainerInfos>
          <img src={professionalPhoto} ></img>
          <p>{professionalName}</p>
          <span>{professionalCity}</span>
          <h2>{professionalDescription}</h2>  
        </ContainerInfos>
      </ProfileSidebar>

      <Body>
        <H1>
          <h1>Aqui estão suas avaliações</h1>
          <h2>Avaliações feitas por clientes que você prestou serviço</h2>
        </H1>

        <>
          {
            evaluations.length === 0 ? (
              <NoData>
                <h1>Você não possui reservas</h1>
              </NoData>
            ) :  (
              evaluations.map((info, index) => {
                return (<EvaluationBox key={index} {...info} />)
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
    border-right: solid 0.5px #4e4e4e;
    background-color: #333333;
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    //background-color: #d41e1e;
    width: 14vw;
    height: 100%;

    img {
        margin: 25px auto 0px auto;
        width: 191px;
        height: 191px;
        border-radius: 50%;
        border: solid 2px #161616;
    }

    p {
        font-size: 18px;
        color: white;
        margin-top: 10px;
        font-weight: 700;
    }

    span {
        font-size: 14px;
        color: #d8d8d8;
        margin-top: 5px;
        font-weight: 300;
    }

    h2 {
        font-size: 14px;
        color: #ffffff;
        margin-top: 20px;
        font-weight: 300;
    }

    textarea {
        margin: 15px auto;
        width: 14vw;
        height: 15vh;
        margin-bottom: -10px;
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
    //margin-bottom: 75px;
    h1 {
        font-size: 35px;
    }

    h2 {
        font-size: 15px;
        margin-top: 8px;
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
        font-size: 35px;
    }
`

export default EvaluationsPage