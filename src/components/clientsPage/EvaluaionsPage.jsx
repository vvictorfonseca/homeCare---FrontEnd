import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

import UserContext from "../../context/userContext"

import Header from "./Header"
import EvaluationBox from "./EvaluationBox"

function EvaluatePage() {
  const { clientToken, clientName, clientPhoto, clientCity } = useContext(UserContext)
  const { professionalId } = useParams()

  const [evaluations, setEvaluations] = useState([])
  const [professionalName, setProfessionalName] = useState("")

  useEffect(() => {
    getEvaluations()
    getProfessional()
  }, [])

  const config = {
    headers: {
      Authorization: `Bearer ${clientToken}`
    }
  }

  function getProfessional() {
    console.log("entrou")
    const URL = `https://home-care-app.herokuapp.com/professional/${professionalId}`

    const promise = axios.get(URL, config)
    promise.then(response => {
      const { data } = response
      setProfessionalName(data.fullName)
    })
    promise.catch(err => {
      console.log(err)
    })

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
    <Container >
      <Header />

      <ProfileSidebar>
        <ContainerInfos>
          <img src={clientPhoto} ></img>
          <p>{clientName}</p>
          <p>{clientCity}</p>
        </ContainerInfos>
      </ProfileSidebar>

      <Body>

        {
          evaluations.length === 0 ? (
            <NoData>
              <h1>{professionalName} não possui avaliações</h1>
            </NoData>
          ) : (

            <>
              <H1>
                <h1>Avaliações de {professionalName}</h1>
              </H1>
              {
                evaluations.map((info, index) => {
                  return (<EvaluationBox key={index} {...info} />)
                })
              }
            </>
          )
        }

      </Body>

    </Container>
  )
}

const Container = styled.main`
    //width: 100vw;
    height: 100%;
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
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    width: 14vw;

    img {
        margin-top: 25px;
        width: 185px;
        height: 185px;
        border-radius: 100%;
        border: solid 2px #1a1a1a;
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
    margin: 10px auto;
    width: 65vw;
    height: 100%;
    //border-right: solid 0.5px #4e4e4e;
    display: flex;
    flex-direction: column;
`
const H1 = styled.div`
    margin-top: 10px;
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

export default EvaluatePage